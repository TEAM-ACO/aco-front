import { adminArticle, adminArticleReport, adminMember, adminMemberReport, adminVisitant } from '@actions/admin';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Members } from '@typings/db';
import _concat from 'lodash/concat';

export interface IAdmin {
  email: string;
  nickname: string;
  name: string;
}

export interface IAdminVisitant {
  week: number;
}

export interface IAdminMemberReport {
  userReportId: number;
  userReportContext: string;
  targetUserId: number;
  reporterUserId: number;
}

export interface IAdminArticle {
  articleId: number;
  articleContext: string;
  menu: string;
  reported: number;
  member: Members;
}

export interface IAdminArticleReport {
  articleReportId: number;
  articleReportContext: string;
  articleId: number;
  articlereporterId: number;
}

export interface IAdminState {
  adminContent: any;
  adminVisitantLoading: boolean;
  adminVisitantDone: boolean;
  adminVisitantError: unknown | null;
  adminMemberLoading: boolean;
  adminMemberDone: boolean;
  adminMemberError: unknown | null;
  adminMemberReportLoading: boolean;
  adminMemberReportDone: boolean;
  adminMemberReportError: unknown | null;
  adminArticleLoading: boolean;
  adminArticleDone: boolean;
  adminArticleError: unknown | null;
  adminArticleReportLoading: boolean;
  adminArticleReportDone: boolean;
  adminArticleReportError: unknown | null;
}

const initialState: IAdminState = {
  adminContent: [],
  adminVisitantLoading: false,
  adminVisitantDone: false,
  adminVisitantError: null,
  adminMemberLoading: false,
  adminMemberDone: false,
  adminMemberError: null,
  adminMemberReportLoading: false,
  adminMemberReportDone: false,
  adminMemberReportError: null,
  adminArticleLoading: false,
  adminArticleDone: false,
  adminArticleError: null,
  adminArticleReportLoading: false,
  adminArticleReportDone: false,
  adminArticleReportError: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(adminVisitant.pending, (state: IAdminState) => {
        state.adminVisitantLoading = true;
        state.adminVisitantDone = false;
        state.adminVisitantError = null;
      })
      .addCase(adminVisitant.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminVisitantLoading = false;
        state.adminVisitantDone = true;
        state.adminContent = _concat(state.adminContent, action.payload);
      })
      .addCase(adminVisitant.rejected, (state: IAdminState, action) => {
        state.adminVisitantLoading = false;
        state.adminVisitantError = action.payload;
      })
      .addCase(adminMember.pending, (state: IAdminState) => {
        state.adminMemberLoading = true;
        state.adminMemberDone = false;
        state.adminMemberError = null;
      })
      .addCase(adminMember.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminMemberLoading = false;
        state.adminMemberDone = true;
        state.adminContent = _concat(state.adminContent, action.payload);
      })
      .addCase(adminMember.rejected, (state: IAdminState, action) => {
        state.adminMemberLoading = false;
        state.adminMemberError = action.payload;
      })
      .addCase(adminMemberReport.pending, (state: IAdminState) => {
        state.adminMemberReportLoading = true;
        state.adminMemberReportDone = false;
        state.adminMemberReportError = null;
      })
      .addCase(adminMemberReport.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminMemberReportLoading = false;
        state.adminMemberReportDone = true;
        state.adminContent = _concat(state.adminContent, action.payload);
      })
      .addCase(adminMemberReport.rejected, (state: IAdminState, action) => {
        state.adminMemberReportLoading = false;
        state.adminMemberReportError = action.payload;
      })
      .addCase(adminArticle.pending, (state: IAdminState) => {
        state.adminArticleLoading = true;
        state.adminArticleDone = false;
        state.adminArticleError = null;
      })
      .addCase(adminArticle.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminArticleLoading = false;
        state.adminArticleDone = true;
        state.adminContent = _concat(state.adminContent, action.payload);
      })
      .addCase(adminArticle.rejected, (state: IAdminState, action) => {
        state.adminArticleLoading = false;
        state.adminArticleError = action.payload;
      })
      .addCase(adminArticleReport.pending, (state: IAdminState) => {
        state.adminArticleReportLoading = true;
        state.adminArticleReportDone = false;
        state.adminArticleReportError = null;
      })
      .addCase(adminArticleReport.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminArticleReportLoading = false;
        state.adminArticleReportDone = true;
        state.adminContent = _concat(state.adminContent, action.payload);
      })
      .addCase(adminArticleReport.rejected, (state: IAdminState, action) => {
        state.adminArticleReportLoading = false;
        state.adminArticleReportError = action.payload;
      }),
});

export default adminSlice;
