import User from "@/src/models/userModel";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/src/db";

dbConnect();
const handler = NextAuth({
	secret: "rajubhai",
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const { email, password } = req.body;
				let user = await User.findOne({ email, password });

				if (user) {
					return { email: user?.email, name: user?._id };
				} else {
					let userExists = await User.findOne({ email });
					if (userExists) {
						return false;
					} else {
						let newUser = await User.create({ email, password });

						return newUser;
					}
				}
			},
		}),
		// ...add more providers here
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		session: async ({ session }) => {
			console.log(session);
			session.user.email = session.user.email; /* added */
			session.user.id = session.user.name; /* added */

			return Promise.resolve(session);
		},
	},
});

export { handler as GET, handler as POST };
