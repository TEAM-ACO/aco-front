import {
  adminArticle,
  adminArticleReport,
  adminDelete,
  adminMember,
  adminMemberReport,
} from '@actions/admin';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAdminDelete, IWeek, Members } from '@typings/db';
import _concat from 'lodash/concat';
import _remove from 'lodash/concat';
import { IArticle } from './postSlice';

export interface IAdmin {
  email?: string;
  nickname?: string;
  memberId?: number;
  totalCount?: number;
  articleId?: number;
}

export interface IAdminAction {
  adminMemberLoading: boolean;
  adminMemberDone: boolean;
  adminMemberError: unknown | null;
  adminMemberContent: IAdmin[];
}

export interface IAdminMemberReport {
  userReportId?: number;
  userReportContext?: string;
  targetUserId?: number;
  reporterUserId?: number;
  totalCount?: number;
  articleId?: number;
}

export interface IAdminArticle {
  articleId?: number;
  articleContext?: string;
  menu?: string;
  reported?: number;
  member?: Members;
  totalCount?: number;
}

export interface IAdminArticleReport {
  articleReportId?: number;
  articleReportContext?: string;
  articleId?: number;
  articlereporterId?: number;
  totalCount?: number;
}

export interface IAdminState {
  adminContent: IArticle[];
  adminVisitor: IWeek[];
  adminMemberContent: IAdmin[];
  adminMemberReportContent: IAdminMemberReport[];
  adminArticleContent: IAdminArticle[];
  adminArticleReportContent: IAdminArticleReport[];
  adminVisitantLoading: boolean;
  adminVisitantDone: boolean;
  visitorLoading: boolean;
  visitorDone: boolean;
  adminMemberLoading: boolean;
  adminMemberDone: boolean;
  adminMemberReportLoading: boolean;
  adminMemberReportDone: boolean;
  adminArticleLoading: boolean;
  adminArticleDone: boolean;
  adminArticleReportLoading: boolean;
  adminArticleReportDone: boolean;
  adminDeleteLoading: boolean;
  adminDeleteDone: boolean;
  articleId?: number;
}

const initialState: IAdminState = {
  adminContent: [], // 페이징 할 때 이전 페이지 찌거기 남는 현상 때문에 각각 Content분리
  adminVisitor: [],
  adminMemberContent: [],
  adminMemberReportContent: [],
  adminArticleContent: [],
  adminArticleReportContent: [],
  adminVisitantLoading: false,
  adminVisitantDone: false,
  visitorLoading: false,
  visitorDone: false,
  adminMemberLoading: false,
  adminMemberDone: false,
  adminMemberReportLoading: false,
  adminMemberReportDone: false,
  adminArticleLoading: false,
  adminArticleDone: false,
  adminArticleReportLoading: false,
  adminArticleReportDone: false,
  adminDeleteLoading: false,
  adminDeleteDone: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(adminMember.pending, (state: IAdminState) => {
        state.adminMemberLoading = true;
        state.adminMemberDone = false;
      })
      .addCase(adminMember.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminMemberLoading = false;
        state.adminMemberDone = true;
        state.adminMemberContent = _concat(state.adminMemberContent, action.payload);
      })
      .addCase(adminMember.rejected, (state: IAdminState) => {
        state.adminMemberLoading = false;
      })
      .addCase(adminMemberReport.pending, (state: IAdminState) => {
        state.adminMemberReportLoading = true;
        state.adminMemberReportDone = false;
      })
      .addCase(adminMemberReport.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminMemberReportLoading = false;
        state.adminMemberReportDone = true;
        state.adminMemberReportContent = _concat(state.adminMemberReportContent, action.payload);
      })
      .addCase(adminMemberReport.rejected, (state: IAdminState) => {
        state.adminMemberReportLoading = false;
      })
      .addCase(adminArticle.pending, (state: IAdminState) => {
        state.adminArticleLoading = true;
        state.adminArticleDone = false;
      })
      .addCase(adminArticle.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminArticleLoading = false;
        state.adminArticleDone = true;
        state.adminArticleContent = _concat(state.adminArticleContent, action.payload);
      })
      .addCase(adminArticle.rejected, (state: IAdminState) => {
        state.adminArticleLoading = false;
      })
      .addCase(adminArticleReport.pending, (state: IAdminState) => {
        state.adminArticleReportLoading = true;
        state.adminArticleReportDone = false;
      })
      .addCase(adminArticleReport.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminArticleReportLoading = false;
        state.adminArticleReportDone = true;
        state.adminArticleReportContent = _concat(state.adminArticleReportContent, action.payload);
      })
      .addCase(adminArticleReport.rejected, (state: IAdminState) => {
        state.adminArticleReportLoading = false;
      })
      .addCase(adminDelete.pending, (state: IAdminState) => {
        state.adminDeleteLoading = true;
        state.adminDeleteDone = false;
      })
      .addCase(adminDelete.fulfilled, (state: IAdminState, action: PayloadAction<IAdminState>) => {
        state.adminDeleteLoading = false;
        state.adminDeleteDone = true;
        state.adminArticleContent = state.adminArticleContent.filter(
          (v) => v.articleId !== action.payload.articleId,
        );
      })
      .addCase(adminDelete.rejected, (state: IAdminState) => {
        state.adminDeleteLoading = false;
      }),
});

export const {} = adminSlice.actions;
export default adminSlice;
