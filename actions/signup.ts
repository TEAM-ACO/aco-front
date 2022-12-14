import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import backendURL from '../config/url';

axios.defaults.baseURL = backendURL;
axios.defaults.withCredentials = true;

export type signupRequestData = { email: string; name: string; nickname: string; password: string };
export type signupErrorData = any;

export type emailauthRequestData = { email: string; authNum?: number };
export type emailauthErrorData = any;

export const signup = createAsyncThunk<signupRequestData, signupRequestData>(
  'member/signup',
  async (data, { rejectWithValue }) => {
    console.log('=============>', data);
    try {
      const response = await axios.post('/api/member/signup', data);
      return response.data;
    } catch (error: signupErrorData) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const emailAuthRequest = createAsyncThunk<emailauthRequestData, emailauthRequestData>(
  'member/emailauth',
  async (data, { rejectWithValue }) => {
    console.log('=============>', data);

    if (await (await axios.post('/api/member/signup/emailcheck', data)).data) {
      return;
    } else {
      try {
        const response = await axios.post('/api/member/emailauth', data);
        return response.data;
      } catch (error: emailauthErrorData) {
        console.error(error);
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const authnumVerifyRequest = createAsyncThunk<emailauthRequestData, emailauthRequestData>(
  'member/emailauth',
  async (data, { rejectWithValue }) => {
    console.log('=============>', data);
    try {
      const response = await axios.post('/api/member/emailverify', data);
      return response.data;
    } catch (error: emailauthErrorData) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);
