import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const recipient = createSlice({
	name: "recipient",
	initialState: {
		error: false,
		loading: true,
		data: [],
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRecipients.fulfilled, (state, action) => {
			state.error = false;
			state.loading = false;
			state.data = action.payload?.recipients;
		});
		builder.addCase(fetchRecipients.rejected, (state, action) => {
			state = {
				error: true,
				loading: false,
				data: [],
			};
		});
	},
});

export const fetchRecipients = createAsyncThunk("datt/fetchHomeData", (sender) =>
	axios.post("/api/v1/recipient/list/all", { sender }).then((r) => r.data)
);

export default recipient.reducer;
