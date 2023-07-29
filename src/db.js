// lib/useDatabase.js

// lib/dbConnect.js

import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	try {
		// const uri = process.env.MONGODB_URI;
		const uri =
			"mongodb+srv://pulsesend:zA9tgZ3aVtQ7fY5f@pulsesend-db.zyijgja.mongodb.net/pulsesend";
		const options = {
			dbName: `pulsesend`,
			useNewUrlParser: true,
		};

		// Connect to MongoDB
		await mongoose.connect(uri, options);

		connection.isConnected = true;
		console.log("Connected to MongoDB!");
		return;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		return;
	}
}

export default dbConnect;
