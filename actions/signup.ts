import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import backendURL from '../config/url';

axios.defaults.baseURL = backendURL;
axios.defaults.withCredentials = true;

export type signupRequestData = { email: string; name: string; nickname: string; password: string };
export type signupErrorData = unknown | null;

export type emailauthRequestData = { email: string; authNum?: number };
export type emailauthErrorData = unknown | null;

export const signup = createAsyncThunk<signupRequestData, signupRequestData>(
  'member/signup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/member/signup', data);
      return response.data;
    } catch (error: signupErrorData) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const emailAuthRequest = createAsyncThunk<emailauthRequestData, emailauthRequestData>(
  'member/emailauth',
  async (data, { rejectWithValue }) => {
    if (await (await axios.post('/api/member/signup/emailcheck', data)).data) {
      return;
    } else {
      try {
        const response = await axios.post('/api/member/emailauth', data);
        return response.data;
      } catch (error: emailauthErrorData) {
        console.error(error);
        return rejectWithValue((error as AxiosError).response?.data);
      }
    }
  },
);

export const authnumVerifyRequest = createAsyncThunk<emailauthRequestData, emailauthRequestData>(
  'member/emailauth',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/member/emailverify', data);
      return response.data;
    } catch (error: emailauthErrorData) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
