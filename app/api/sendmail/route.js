import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
	host: "smtppro.zoho.in",
	secure: true,
	port: 465,
	auth: {
		user: "support@pulsesend.com",
		pass: "7H2Rjxy3ZYVX",
	},
});

const sendAdminMail = () => {
	const mailOptions = {
		from: "support@pulsesend.com",
		to: "dsayak29@gmail.com",
		subject: "Your OTP",
		html: "content",
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.error(err);
		}
	});
};

export async function POST(req) {
	try {
		await dbConnect();
		sendAdminMail();
		return NextResponse.json("recipient");
	} catch (e) {
		console.error("Error saving recipient:", e);
		return NextResponse.json({ message: "Internal Server Error", error: e.message });
	}
}
