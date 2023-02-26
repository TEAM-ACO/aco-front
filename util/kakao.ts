export const REST_API_KEY = process.env.KAKAO_CLIENT_ID!;

export const redirect_url = 'http://localhost:3075/api/oauth/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_url}&response_type=code`;
