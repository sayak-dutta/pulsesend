import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		console.log(body);
		let recipientData = {
			first_name: body.first_name,
			last_name: body.last_name,
			email: body.email,
			sender: body.sender,
		};

		const recipient = await Recipient.create(recipientData);
		return NextResponse.json(recipient);
	} catch (e) {
		console.error("Error saving recipient:", e);
		return NextResponse.json({ message: "Internal Server Error", error: e.message });
	}
}
