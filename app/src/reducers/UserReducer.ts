import {
    setCurrentUserTypes,
    IsAuthenticatingTypes,
    SET_CURRENT_USER,
    SET_IS_AUTHENTICATING,
    User
} from "../util/types";

export function currentUserReducer(currentUser: User = null, action: setCurrentUserTypes) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.currentUser;
        default:
            return currentUser;
    }
}

export function isAuthenticatingReducer(state = true, action: IsAuthenticatingTypes) {
    switch (action.type) {
        case SET_IS_AUTHENTICATING:
            return action.isAuthenticating;
        default:
            return state;
    }
}
