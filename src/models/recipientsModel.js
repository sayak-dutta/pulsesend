const { Schema, SchemaTypes, model, models } = require("mongoose");

const recipientsSchema = new Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		lowercase: true,
	},
	sender: {
		type: SchemaTypes.ObjectId,
		ref: "user",
	},
});

const Recipient = models.Recipients || model("Recipients", recipientsSchema);

export default Recipient;
