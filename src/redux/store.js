const { configureStore } = require("@reduxjs/toolkit");
const { default: recipientSlice, fetchRecipients } = require("./slice/recipientSlice");

const store = configureStore({
	reducer: {
		recipient: recipientSlice,
	},
});

store.dispatch(fetchRecipients());
export default store;
