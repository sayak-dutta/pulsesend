export const revalidate = 0;
import dbConnect from "@/src/db";
import Campaign from "@/src/models/campaignModel";

import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		const campaigns = await Campaign.find({ author: body.author });
		if (!campaigns) {
			return NextResponse.json({ message: "No campaigns found, please create one" });
		} else {
			return NextResponse.json({ campaigns });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal Server Error", error: error.message });
	}
}
