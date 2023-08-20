import User from "@/src/models/userModel";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/src/db";

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
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
	pages: {
		signIn: "/dashboard",
		// signIn: "/auth/dashbaord", // on successfully signin
		signOut: "/auth/login", // on signout redirects users to a custom login page.
		error: "/auth/error", // displays authentication errors
		newUser: "/auth/new-user", // New users will be directed here on fi
	},

	callbacks: {
		async signIn({ user, account, session }) {
			await dbConnect();
			// console.log(user);
			let userExists = await User.findOne({ email: user.email });
			if (userExists) {
				return userExists;
			} else {
				let newUser = await User.create({ email: user?.email });
				// session.user.id = newUser?._id;

				return newUser;
			}
		},

		session: async ({ session }) => {
			await dbConnect();

			let user = await User.findOne({ email: session.user.email });
			session.user.id = user._id; /* added */

			return Promise.resolve(session);
		},
	},
});

export { handler as GET, handler as POST };
