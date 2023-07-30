import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: false,
	},
});

const User = models.User || model("User", userSchema);

export default User;
