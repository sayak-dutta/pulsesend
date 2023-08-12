import dbConnect from "@/src/db";
import Recipient from "@/src/models/recipientsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	try {
		await dbConnect();
		const id = params.id;

		if (!id) {
			throw new Error("ID is required");
		}

		const user = await Recipient.findById(id);

		return NextResponse.json({ user });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error", error: error.message });
	}
}
