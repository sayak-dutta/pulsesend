import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { Analytics } from "@vercel/analytics/react";

import dbConnect from "@/src/db";
import RootStyleProvider from "./components/rootStyleProvider";
import Wrapper from "@/src/redux/wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "PulseSend - Send unlimited emails in bulk for free",
	description: "Unleash Your Email Marketing Potential Absolutely Free!",
	keywords: "mail blasting system, bulk email service, mailing system",
	robots: "index, nofollow",
};

export default async function RootLayout({ children }) {
	// await dbConnect();

	return (
		<html lang="en">
			<body className={inter.className}>
				<Wrapper>
					<RootStyleProvider> {children}</RootStyleProvider>
				</Wrapper>
				<Analytics />
			</body>
		</html>
	);
}
