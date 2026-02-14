const HOST=import.meta.env.VITE_BACKEND_URL
export const API=`${HOST}/api`

export const SIGNUP_API=`${API}/signup`
export const LOGIN_API = `${API}/login`;
export const LOGOUT_API = `${API}/logout`;



export const MAKE_POST=`${HOST}/post/public/vent`
export const VERIFY_API=`${API}/verify-token`;
export const PREFERENCE_API = `${HOST}/user/take-preference`;

export const MAKE_POST_CALL= `${HOST}/post/public/page`
export const MAKE_COMMENT=`${HOST}/post/public/comment`

export const HUG_API = `${HOST}/ai/hug`;
export const ADVICE_API = `${HOST}/ai/advice`;
export const MAKE_CONNECT_REQUEST= `${HOST}/user/connect/request`
export const CHECK_CONNECTION_REQUEST=`${HOST}/user/check-connections`

export const ACCEPT_CONNECTION_REQUEST=`${HOST}/user/accept-request`
