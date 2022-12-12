import { createAsyncThunk } from '@reduxjs/toolkit';

const URL_API = process.env.REACT_APP_URL_API + 'contact';

export const sendMail = createAsyncThunk(
	'contact/sendMail',
	async ({ name, subject, email, keterangan }, { rejectWithValue }) => {
		try {
			const response = await fetch(URL_API, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, subject, email, keterangan }),
			});

			if (!response.ok) throw new Error('Gagal mengirim pesan');
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getAllContact = createAsyncThunk(
	'contact/getAllContact',
	async (URL = URL_API, { rejectWithValue }) => {
		try {
			const response = await fetch(URL);
			const { data } = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteContactById = createAsyncThunk(
	'contact/deleteContactById',
	async (id, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();
			const { userToken } = user;
			const response = await fetch(URL_API + '/' + id, {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + userToken,
				},
			});
			if (!response.ok) throw new Error('Gagal menghapus data kontak');
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);