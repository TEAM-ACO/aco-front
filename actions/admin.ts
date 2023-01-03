import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import backendURL from '../config/url';
import { IAdminState, IAdminVisitant } from '@features/adminSlice';
import { IPageNumber } from '@typings/db';

axios.defaults.baseURL = backendURL;
axios.defaults.withCredentials = true;

export const adminVisitant = createAsyncThunk<IAdminState, IAdminVisitant>(
  'admin/visitant',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.get(`/api/admin/main/${data.week}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const adminMember = createAsyncThunk<IAdminState, IPageNumber>(
  'admin/member',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/admin/member`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const adminMemberReport = createAsyncThunk<IAdminState, IPageNumber>(
  'admin/memberreport',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/admin/memberreport`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const adminArticle = createAsyncThunk<IAdminState, IPageNumber>(
  'admin/article',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/admin/article`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const adminArticleReport = createAsyncThunk<IAdminState, IPageNumber>(
  'admin/articlereport',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/admin/articlereport`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
