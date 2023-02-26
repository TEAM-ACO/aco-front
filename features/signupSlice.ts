import { createSlice } from '@reduxjs/toolkit';
import { signup } from '@actions/signup';


export interface ISignupState {
  signupLoading: boolean;
  signupDone: boolean;
  signupError: unknown | null;
}

const initialState = {
  signupLoading: false,
  signupDone: false,
  signupError: null,
} as ISignupState

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(signup.pending, (state: ISignupState) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state: ISignupState) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state: ISignupState, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
});

export default signupSlice;
