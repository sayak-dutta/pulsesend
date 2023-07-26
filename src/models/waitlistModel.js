// models/Email.js

import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

const Waitlist = mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);

export default Waitlist;
