import { GET_TEAMS, Athlete, Team, GET_CURRENT_ROSTER } from "../util/types";
import download from "downloadjs";
import { transformJSONToInjury } from "./InjuriesAction";
import { UserPermissions, AdminPermissions } from "../util/permissions";

/**
 * REDUX ACTIONS
 */

export function getTeams(permissions: UserPermissions, data: any) {
    return {
        type: GET_TEAMS,
        teams: data
    };
}

export function getCurrentRoster(athletes: Athlete[]) {
    return {
        type: GET_CURRENT_ROSTER,
        currentRoster: athletes.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
    };
}

/**
 * FETCH ACTIONS TO SERVER
 */

export function fetchTeams(permissions: UserPermissions) {
    return async (dispatch: any) => {
        const data = await fetchTeamsEndpoint(permissions);
        return dispatch(getTeams(permissions, data));
    };
}

export async function fetchTeamsEndpoint(permissions: UserPermissions): Promise<Team[]> {
    let endpoint = permissions == AdminPermissions ? "./teams" : "./user/teams";
    let response = await fetch(endpoint);
    let data = await response.json();
    return data.data.teamOutput
        .map((d: any) => {
            return {
                id: d.id,
                name: d.name,
                season: d.season,
                athleteIds: d.athletes
            };
        })
        .sort((a: Team, b: Team) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                if (a.season < b.season) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
}

export async function createTeam(name: string, season: string) {
    return await fetchCreateTeam(name, season);
}

async function fetchCreateTeam(name: string, season: string) {
    return fetch("./team", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            teamName: name,
            season: season,
            athletes: []
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error || response.status == 500) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return response;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function updateTeamInfo(id: string, name: string, season: string) {
    return await fetchUpdateTeamInfo(id, name, season);
}

async function fetchUpdateTeamInfo(id: string, name: string, season: string) {
    return fetch("./team", {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            teamId: id,
            teamName: name,
            season: season
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error || response.status == 500) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return response;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function updateTeamAthletes(id: string, athletes: string[]) {
    return await fetchUpdateTeamAthletes(id, athletes);
}

async function fetchUpdateTeamAthletes(id: string, athletes: string[]) {
    return fetch("./team", {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            teamId: id,
            athletes: athletes
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error || response.status == 500) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return response;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export function fetchCurrentRoster(athleteIds: string[]) {
    return async (dispatch: any) => {
        const athletes = await fetchCurrentRosterEndpoint(athleteIds);
        return dispatch(getCurrentRoster(athletes));
    };
}

export async function fetchCurrentRosterEndpoint(athleteIds: string[]): Promise<Athlete[]> {
    let athletes = [];
    for (let id of athleteIds) {
        let params: any = {
            athleteId: id
        };
        let query = Object.keys(params)
            .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
            .join("&");

        let response = await fetch("./athlete?" + query);
        let data = await response.json();
        let a = data.data.athlete;
        athletes.push({
            id: a.id,
            name: a.firstName + " " + a.lastName,
            injuries: transformJSONToInjury(a.injuries)
        });
    }

    console.log(athletes);
    return athletes;
}

export function getAthleteTemplate() {
    fetch("./athleteTemplate", {
        method: "get"
    })
        .then(async function(response: any) {
            if (response.error || response.status == 500) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
            } else {
                const blob = await response.blob();
                download(blob, "addAthleteTemplate.csv");
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
        });
}
