import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		// for(body)
		// let checkDuplicateEmail = await Recipient.find({
		// 	sender: data.sender,
		// 	email: body.email,
		// });

		// if (checkDuplicateEmail.length > 0) {
		// 	return NextResponse.json(
		// 		{ message: "Recipient Email already exists" },
		// 		{ status: 500 }
		// 	);
		// }

		await Recipient.insertMany(body);
		let recipients = await Recipient.find();

		return NextResponse.json({ message: "Recipients Added", recipients }, { status: 200 });
	} catch (e) {
		console.error("Error saving recipient:", e);
		return NextResponse.json(
			{ message: "Internal Server Error", error: e.message },
			{ status: 500 }
		);
	}
}
