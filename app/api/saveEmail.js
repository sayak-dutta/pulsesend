// pages/api/saveEmail.js

import dbConnect from "../../src/db";
import Email from "../../src/models/emailModel";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		// Connect to the MongoDB database
		await dbConnect();

		const { email } = req.body;

		// Save the email to the database
		const savedEmail = await Email.create({ email });

		return res.status(201).json({ message: "Email saved successfully", data: savedEmail });
	} catch (error) {
		console.error("Error saving email:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}
