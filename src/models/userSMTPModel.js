const { Schema, SchemaTypes, models, model } = require("mongoose");

const userSMTPSchema = new Schema({
	service_provider: SchemaTypes.String,
	user_id: {
		type: SchemaTypes.ObjectId,
		required: true,
		ref: "User",
	},
});

const UserSMTP = models.UserSMTP || model("UserSMTPdetails", userSMTPSchema);

export default UserSMTP;
