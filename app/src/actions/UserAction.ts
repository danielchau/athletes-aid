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
    return fetch("./login", {
        method: "get"
    })
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
    return fetch("./logout", {
        method: "get"
    });
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

export async function getAllUsers() {
    return await fetchAllUsers();
}

async function fetchAllUsers(): Promise<User[] | null> {
    return fetch("./users", {
        method: "get"
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response.user);
                return response.data.users.map((u: any) => ({
                    cwl: u.cwl,
                    firstName: !!u.firstName ? u.firstName : "",
                    lastName: !!u.lastName ? u.lastName : "",
                    teams: u.teams,
                    permissions: getPermission(u.role)
                }));
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function changeRoleForUser(userCwl: string, role: string) {
    return await fetchRoleChange(userCwl, role);
}

async function fetchRoleChange(userCwl: string, role: string): Promise<string | null> {
    return fetch("./user/role", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cwl: userCwl,
            role: getStringRole(role)
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return response.data.role;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function changeTeamsForUser(userCwl: string, teams: string[]) {
    return await fetchTeamsChange(userCwl, teams);
}

async function fetchTeamsChange(userCwl: string, teams: string[]): Promise<string[] | null> {
    return fetch("./user/teams", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cwl: userCwl,
            teams: teams
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return response.data.teams;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function addUser(userCwl: string, teams: string[], role: string) {
    return await postUser(userCwl, teams, role);
}

async function postUser(userCwl: string, teams: string[], role: string): Promise<string | null> {
    return fetch("./user", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cwl: userCwl,
            teams: teams,
            role: getStringRole(role)
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return response.data.cwl;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function deleteUser(userCwl: string): Promise<string | null> {
    let params: any = {
        cwl: userCwl
    };
    let query = Object.keys(params)
        .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    return fetch("./user?" + query, { method: "delete" })
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return "Success";
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

const getStringRole = (role: string) => {
    switch (role) {
        case "Administrator":
            return "admin";
        case "Coach":
            return "coach";
        case "Trainer":
            return "trainer";
        default:
            return "coach";
    }
};
