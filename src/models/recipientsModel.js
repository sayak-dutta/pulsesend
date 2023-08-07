const { Schema, SchemaTypes, model, models } = require("mongoose");

const recipientsSchema = new Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});

const Recipient = models.Recipients || model("Recipients", recipientsSchema);

export default Recipient;
