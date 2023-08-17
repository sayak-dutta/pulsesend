import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		let recipients;

		const recipientIds = Array.isArray(body.recipient_id)
			? body.recipient_id
			: [body.recipient_id];

		await Recipient.deleteMany({ _id: { $in: recipientIds } });
		recipients = await Recipient.find();

		return NextResponse.json({ message: "Recipient Deleted", recipients });
	} catch (e) {
		console.error("Error saving recipient:", e);
		return NextResponse.json({ message: "Internal Server Error", error: e.message });
	}
}
