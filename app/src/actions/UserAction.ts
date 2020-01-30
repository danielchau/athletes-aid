import { User, SET_CURRENT_USER } from "../util/types";

export function setCurrentUser(currentUser: User) {
    return { type: SET_CURRENT_USER, currentUser };
}
