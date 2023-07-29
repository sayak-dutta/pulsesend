// pages/api/saveEmail.js

import { NextRequest, NextResponse as res } from "next/server";
import dbConnect from "../../../../../src/db";
import Waitlist from "../../../../../src/models/waitlistModel";

export async function POST(request) {
	if (request.method !== "POST") {
		return res.json({ message: "Method Not Allowed" });
	}

	try {
		// Connect to the MongoDB database

		const body = await request.json();

		// // Save the email to the database
		await Waitlist.create({ email: body.email });

		return res.json({
			message: "Thank You for Subscribing!",
		});
	} catch (error) {
		// console.error("Error saving email:", error);
		return res.json({ message: "Internal Server Error", error: error.message });
	}
}
