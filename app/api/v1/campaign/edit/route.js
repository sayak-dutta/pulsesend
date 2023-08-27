import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		await Recipient.findByIdAndUpdate({ _id: body._id }, body);

		let recipients = await Recipient.find();
		return NextResponse.json({ message: "Recipient Updated", recipients });
	} catch (e) {
		console.error("Error saving recipient:", e);
		return NextResponse.json({ message: "Error saving recipient", error: e.message });
	}
}
