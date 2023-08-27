import dbConnect from "@/src/db";
import Campaign from "@/src/models/campaignModel";

import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		await Campaign.create(body);

		return NextResponse.json({ message: "Campaign created" }, { status: 200 });
	} catch (e) {
		console.error("Error creating campaign:", e);
		return NextResponse.json(
			{ message: "Internal Server Error", error: e.message },
			{ status: 500 }
		);
	}
}
