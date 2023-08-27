import campaignSlice, { fetchCampaigns } from "./slice/campaignSlice";
import settingSlice, { changeTheme, setSiderCollapse } from "./slice/settingSlice";

const { configureStore } = require("@reduxjs/toolkit");
const { default: recipientSlice, fetchRecipients } = require("./slice/recipientSlice");

const store = configureStore({
	reducer: {
		recipient: recipientSlice,
		settings: settingSlice,
		campaign: campaignSlice,
	},
});

store.dispatch(fetchRecipients());
store.dispatch(setSiderCollapse());
store.dispatch(changeTheme());
store.dispatch(fetchCampaigns());
export default store;
