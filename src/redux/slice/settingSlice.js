const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const settings = createSlice({
	name: "settings",
	initialState: {
		siderCollapsed: false,
	},
	extraReducers: (builder) => {
		builder.addCase(setSiderCollapse.fulfilled, (state, action) => {
			state.siderCollapsed = action.payload;
		});
		builder.addCase(setSiderCollapse.rejected, (state, action) => {
			state.siderCollapsed = false;
		});
	},
});

export const setSiderCollapse = createAsyncThunk("datt/setSiderCollapse", (res) => res);

export default settings.reducer;
