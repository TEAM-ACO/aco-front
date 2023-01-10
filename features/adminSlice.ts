import {
  adminArticle,
  adminArticleReport,
  adminDelete,
  adminMember,
  adminMemberReport,
  adminVisitant,
} from '@actions/admin';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Members } from '@typings/db';
import _concat from 'lodash/concat';
import _remove from 'lodash/concat';

export interface IAdmin {
  email: string;
  nickname: string;
  memberId: number;
  totalCount: number;
}

export interface IAdminAction {
  adminMemberLoading: boolean;
  adminMemberDone: boolean;
  adminMemberError: unknown | null;
  adminMemberContent: IAdmin[];
}

export interface IAdminVisitant {
  week: number;
}

export interface IAdminMemberReport {
  userReportId: number;
  userReportContext: string;
  targetUserId: number;
  reporterUserId: number;
  totalCount: number;
}

export interface IAdminArticle {
  articleId: number;
  articleContext: string;
  menu: string;
  reported: number;
  member: Members;
  totalCount: number;
}

export interface IAdminArticleReport {
  articleReportId: number;
  articleReportContext: string;
  articleId: number;
  articlereporterId: number;
  totalCount: number;
}

export interface IAdminState {
  adminContent: any;
  adminMemberContent: IAdmin[];
  adminMemberReportContent: IAdminMemberReport[];
  adminArticleContent: IAdminArticle[];
  adminArticleReportContent: IAdminArticleReport[];
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
  adminDeleteLoading: boolean;
  adminDeleteDone: boolean;
  adminDeleteError: unknown | null;
}

const initialState: IAdminState = {
  adminContent: [], // 페이징 할 때 이전 페이지 찌거기 남는 현상 때문에 각각 Content분리
  adminMemberContent: [],
  adminMemberReportContent: [],
  adminArticleContent: [],
  adminArticleReportContent: [],
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
  adminDeleteLoading: false,
  adminDeleteDone: false,
  adminDeleteError: null,
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
      .addCase(adminMember.fulfilled, (state: IAdminState, action: PayloadAction<any>) => {
        state.adminMemberLoading = false;
        state.adminMemberDone = true;
        state.adminMemberContent = _concat(state.adminMemberContent, action.payload);
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
      .addCase(adminMemberReport.fulfilled, (state: IAdminState, action: PayloadAction<any>) => {
        state.adminMemberReportLoading = false;
        state.adminMemberReportDone = true;
        state.adminMemberReportContent = _concat(state.adminMemberReportContent, action.payload);
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
      .addCase(adminArticle.fulfilled, (state: IAdminState, action: PayloadAction<any>) => {
        state.adminArticleLoading = false;
        state.adminArticleDone = true;
        state.adminArticleContent = _concat(state.adminArticleContent, action.payload);
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
      .addCase(adminArticleReport.fulfilled, (state: IAdminState, action: PayloadAction<any>) => {
        state.adminArticleReportLoading = false;
        state.adminArticleReportDone = true;
        state.adminArticleReportContent = _concat(state.adminArticleReportContent, action.payload);
      })
      .addCase(adminArticleReport.rejected, (state: IAdminState, action) => {
        state.adminArticleReportLoading = false;
        state.adminArticleReportError = action.payload;
      })
      .addCase(adminDelete.pending, (state: IAdminState) => {
        state.adminDeleteLoading = true;
        state.adminDeleteDone = false;
        state.adminDeleteError = null;
      })
      .addCase(adminDelete.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminDeleteLoading = false;
        state.adminDeleteDone = true;
        // _remove(state.adminContent, action.payload);
        // state.adminContent = _concat(state.adminContent, action.payload);
      })
      .addCase(adminDelete.rejected, (state: IAdminState, action) => {
        state.adminDeleteLoading = false;
        state.adminDeleteError = action.payload;
      }),
});

export default adminSlice;
