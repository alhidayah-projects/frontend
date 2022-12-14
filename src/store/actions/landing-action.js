import { createAsyncThunk } from "@reduxjs/toolkit";
const URL_API = process.env.REACT_APP_URL_API;

export const getHomeData = createAsyncThunk(
  "landing/getHomeData",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetch(URL_API + "landing");
      if (!response.ok) throw new Error("Gagal Fetching data");
      const { articles, galleries } = await response.json();
      return { articles, galleries };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTelpNumber = createAsyncThunk(
  "landing/getTelpNumber",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetch(URL_API + "landing/telepon");
      if (!response.ok) throw new Error("Gagal Fetching data");
      const { no_telp } = await response.json();
      return no_telp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getInstitutionProfile = createAsyncThunk(
  "landing/getInstitutionProfile",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetch(URL_API + "landing/profile");
      if (!response.ok) throw new Error("Gagal Fetching data");
      const { about } = await response.json();
      return about;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVisiMisiData = createAsyncThunk(
  "landing/getVisiMisiData",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetch(URL_API + "landing/visi-misi");
      if (!response.ok) throw new Error("Gagal Fetching data");
      const { visi_misi } = await response.json();
      return visi_misi;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchDonationHistory = createAsyncThunk(
  "landing/searchDonationHistory",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await fetch(URL_API + "landing/donate/" + keyword);
      if (!response.ok)
        throw new Error(
          "Data donasi tidak ditemukan, pastikan yang anda masukan sudah benar."
        );
      const { donate } = await response.json();
      return donate;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getContactPageData = createAsyncThunk(
  "landing/getContactPage",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetch(URL_API + "landing/contact");
      if (!response.ok) throw new Error("Gagal fetching data");
      const { contact } = await response.json();
      return contact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
