import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const campaign = createSlice({
	name: "campaign",
	initialState: {
		error: false,
		loading: true,
		data: [],
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCampaigns.fulfilled, (state, action) => {
			state.error = false;
			state.loading = false;
			state.data = action.payload?.campaigns;
		});
		builder.addCase(fetchCampaigns.rejected, (state, action) => {
			state = {
				error: true,
				loading: false,
				data: [],
			};
		});
	},
});

export const fetchCampaigns = createAsyncThunk("data/fetchCampaigns", (author) =>
	axios.post("/api/v1/campaign/list/all", { author }).then((res) => res.data)
);

export default campaign.reducer;
