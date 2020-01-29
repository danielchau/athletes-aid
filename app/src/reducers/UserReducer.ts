import { setCurrentUserTypes, SET_CURRENT_USER, User } from "../util/types";

export function currentUserReducer(currentUser: User = null, action: setCurrentUserTypes) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.currentUser;
        default:
            return currentUser;
    }
}
