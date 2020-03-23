import { User, SET_CURRENT_USER, SET_IS_AUTHENTICATING } from "../util/types";

/**
 * REDUX ACTIONS
 */

export function setCurrentUser(currentUser: User) {
    return { type: SET_CURRENT_USER, currentUser };
}

export function setIsAuthenticating(state: boolean) {
  return { type: SET_IS_AUTHENTICATING, state };
}

export async function login() {
  return await fetchLogin();
}

async function fetchLogin() {
  return fetch("./login");
}

export async function logout() {
  return await fetchLogout();
}

async function fetchLogout() {
  return fetch("./logout");
}