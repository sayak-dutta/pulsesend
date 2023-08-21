export const revalidate = 0;
import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		const recipients = await Recipient.find({ sender: body.sender });
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
