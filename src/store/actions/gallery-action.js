import { createAsyncThunk } from "@reduxjs/toolkit";
import resolveApiPath from "../../utils/resolveApiPath";
const URL_API = process.env.REACT_APP_URL_API + "gallery";

export const updateGalleryById = createAsyncThunk(
	"gallery/updateGalleryById",
	async ({ id, title, image }, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();
			const { userToken } = user;
			const formData = new FormData();
			formData.append("title", title);
			formData.append("image", image);
			formData.append("_method", "PUT");
			const response = await fetch(URL_API + "/" + id, {
				method: "POST",
				headers: {
					Authorization: "Bearer " + userToken,
				},
				body: formData,
			});

			if (!response.ok) throw new Error("Gagal memperbaharui data gallery.");
			const { message } = await response.json();
			return message;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getAllGallery = createAsyncThunk(
	"gallery/getAllGallery",
	async ({ url, query }, { rejectWithValue }) => {
		try {
			const validUrl = resolveApiPath({ baseUrl: URL_API, url, query });
			const response = await fetch(validUrl);
			if (!response.ok) throw new Error("Gagal Fetching Data Gallery");
			const { data } = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getGalleryById = createAsyncThunk(
	"gallery/getGalleryById",
	async (id, { rejectWithValue }) => {
		try {
			const response = await fetch(URL_API + "/" + id);
			if (!response.ok) throw new Error("Gagal Fetching Data Gallery");
			const { data } = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const createGallery = createAsyncThunk(
	"gallery/createGallery",
	async ({ title, image }, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();
			const { userToken } = user;

			const formData = new FormData();
			formData.append("title", title);
			formData.append("image", image);
			const response = await fetch(URL_API, {
				method: "POST",
				headers: {
					Authorization: "Bearer " + userToken,
				},
				body: formData,
			});
			if (!response.ok) throw new Error("Gagal menambahkan data gallery");
			const { message } = await response.json();
			return message;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteGalleryById = createAsyncThunk(
	"gallery/deleteGalleryById",
	async (id, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();
			const { userToken } = user;

			const response = await fetch(URL_API + "/" + id, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + userToken,
				},
			});
			if (!response.ok) throw new Error("Gagal menghapus data gallery");
			const { message } = await response.json();
			return message;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
