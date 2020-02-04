import { User, SET_CURRENT_USER } from "../util/types";

/**
 * REDUX ACTIONS
 */

export function setCurrentUser(currentUser: User) {
    return { type: SET_CURRENT_USER, currentUser };
}
