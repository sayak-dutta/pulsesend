import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await dbConnect();

		const recipients = await Recipient.find();
		if (!recipients) {
			return NextResponse.json({ message: "No recipients found, please add one" });
		} else {
			return NextResponse.json({ recipients });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error", error: error.message });
	}
}
