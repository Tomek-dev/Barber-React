export const API_BASE_URL = 'http://localhost:8080/api';
export const ACCESS_TOKEN = 'accesstoken';

export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 24;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 36;
export const PASSWORD_PATTERN = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$)/;

export const EMAIL_PATTERN = /[^@ ]+@[^@ ]+\\.[^@ ]+/; // change

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;