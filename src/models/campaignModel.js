import { Schema, SchemaTypes, model, models } from "mongoose";

const campaignSchema = new Schema({
	campaign_id: {
		type: String,
		default: "PS" + 1692981254613,
	},
	campaign_name: {
		type: String,
	},
	content: {
		type: String,
	},
	variables: {
		type: Array,
	},
	author: {
		type: SchemaTypes.ObjectId,
		ref: "user",
	},
});
const Campaign = models.Campaigns || model("Campaigns", campaignSchema);

export default Campaign;
