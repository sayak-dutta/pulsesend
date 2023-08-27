import dbConnect from "@/src/db";
import Campaign from "@/src/models/campaignModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await dbConnect();
		const body = await req.json();

		await Campaign.findByIdAndDelete(body._id);
		return NextResponse.json({ message: "Campaign Deleted" }, { status: 200 });
	} catch (e) {
		console.error("Error Deleting recipient:", e);
		return NextResponse.json(
			{ message: "Error removing campaigns", error: e.message },
			{ status: 500 }
		);
	}
}
