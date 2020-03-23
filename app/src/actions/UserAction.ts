import { User, SET_CURRENT_USER, SET_IS_AUTHENTICATING } from "../util/types";
import { AdminPermissions, TrainerPermissions, CoachPermissions } from "../util/permissions";

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

async function fetchLogin(): Promise<User | null> {
    return fetch("./login")
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response.user);
                return {
                    cwl: response.user.cwl,
                    firstName: response.user.firstName,
                    lastName: response.user.lastName,
                    teams: response.user.teams,
                    permissions: getPermission(response.user.role)
                };
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function logout() {
    return await fetchLogout();
}

async function fetchLogout() {
    return fetch("./logout");
}

function getPermission(role: string) {
    switch (role) {
        case "admin":
            return AdminPermissions;
        case "trainer":
            return TrainerPermissions;
        case "coach":
            return CoachPermissions;
        default:
            return AdminPermissions;
    }
}
