import { IUser } from '../dtos/IUser';

const TOKEN_KEY = '@Syber7:token';
const USER_KEY = '@Syber7:user';

function isAuthenticated() {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function login(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function setUser(user: IUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export {
  TOKEN_KEY,
  isAuthenticated,
  getToken,
  login,
  logout,
  setUser,
  getUser,
};
