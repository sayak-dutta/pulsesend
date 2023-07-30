import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { Analytics } from "@vercel/analytics/react";

import dbConnect from "@/src/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "PulseSend",
	description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
	let a = await dbConnect();
	
	return (
		<html lang="en">
			<head>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</head>
			<body className={inter.className}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
