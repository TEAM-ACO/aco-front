import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import backendURL from '../config/url';
import { IAdminState, IAdminVisitant } from '@features/adminSlice';
import { IAdminDelete, IPageNumber } from '@typings/db';

axios.defaults.baseURL = backendURL;
axios.defaults.withCredentials = true;

// Admin 페이지는 시연용입니다.

export const adminVisitant = createAsyncThunk<IAdminState, IAdminVisitant>(
  'admin/visitant',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/admin/main/${data.week}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const visitor = createAsyncThunk<IAdminState, IAdminVisitant>(
  'admin/visitor',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/admin/main/${data.week}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const adminMember = createAsyncThunk<IAdminState, IPageNumber | undefined>(
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

export const adminMemberReport = createAsyncThunk<IAdminState, IPageNumber | undefined>(
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

export const adminArticle = createAsyncThunk<IAdminState, IPageNumber | undefined>(
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

export const adminArticleReport = createAsyncThunk<IAdminState, IPageNumber | undefined>(
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

export const adminDelete = createAsyncThunk<IAdminState, IAdminDelete>(
  'admin/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/admin/delete/${data.which}/${data.number}`);
      return response.data;
      // axios.post(`/api/admin/member`, { requestedPageNumber: 0, requestedPageSize: 10 });
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
