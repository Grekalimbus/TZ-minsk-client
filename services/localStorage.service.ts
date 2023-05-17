const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refreshToken";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

export interface Payload {
    refreshToken: string
    accessToken: string
    userId: string
    expiresIn: string
}

class LocalStorageService {
    constructor(){}
  setTokens({ refreshToken, accessToken, userId, expiresIn = "3600" }:Payload) {
    const expiresDate = new Date().getTime() + Number(expiresIn) * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
  }

  deleteTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USERID_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(EXPIRES_KEY);
    }    
  }
  

  getAccessToken() {    
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  getRefreshToken() {   
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_KEY);
    }
    return null;
  }

  getTokenExpiresDate() {    
    if (typeof window !== 'undefined') {
      return localStorage.getItem(EXPIRES_KEY)
    }
    return null;
  }

  getUserId() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(USERID_KEY);
    }
    return null;
  }
}

export default new LocalStorageService();

