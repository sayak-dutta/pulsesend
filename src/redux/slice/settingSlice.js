const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const settings = createSlice({
	name: "settings",
	initialState: {
		siderCollapsed: false,
		darkTheme: false,
	},
	extraReducers: (builder) => {
		builder.addCase(setSiderCollapse.fulfilled, (state, action) => {
			state.siderCollapsed = action.payload;
		});
		builder.addCase(setSiderCollapse.rejected, (state, action) => {
			state.siderCollapsed = false;
		});
		builder.addCase(changeTheme.fulfilled, (state, action) => {
			state.darkTheme = action.payload;
		});
		builder.addCase(changeTheme.rejected, (state, action) => {
			state.darkTheme = false;
		});
	},
});

export const setSiderCollapse = createAsyncThunk("datt/setSiderCollapse", (res) => res);
export const changeTheme = createAsyncThunk("datt/changeTheme", (res) => res);

export default settings.reducer;
