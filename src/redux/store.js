import settingSlice, { setSiderCollapse } from "./slice/settingSlice";

const { configureStore } = require("@reduxjs/toolkit");
const { default: recipientSlice, fetchRecipients } = require("./slice/recipientSlice");

const store = configureStore({
	reducer: {
		recipient: recipientSlice,
		settings: settingSlice,
	},
});

store.dispatch(fetchRecipients());
store.dispatch(setSiderCollapse());
export default store;
