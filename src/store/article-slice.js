import { createSlice } from '@reduxjs/toolkit';
import { addArticle, getArticles } from './article-action';

const initialState = {
	items: null,
	item: null,
	loading: false,
	success: null,
	error: null,
	pages: null,
};

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {},
	extraReducers: {
		[getArticles.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[getArticles.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.items = payload.data;
			state.pages = payload.links;
		},
		[getArticles.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[addArticle.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[addArticle.fulfilled]: (state) => {
			state.loading = false;
			state.success = true;
		},
		[addArticle.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

// export const {} = articleSlice.actions;
export default articleSlice.reducer;
