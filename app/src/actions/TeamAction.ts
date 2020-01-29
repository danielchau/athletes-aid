import { GET_TEAMS, Athlete, Team } from "../util/types";
import download from "downloadjs";

export function getTeams(athleteId: string, data: any) {
    return {
        type: GET_TEAMS,
        teams: data.data.teamOutput.map((d: any) => {
            return {
                id: d.id,
                name: d.name,
                season: d.season,
                athletes: d.athletes.map((a: any) => ({
                    id: a.id,
                    name: a.firstName + " " + a.lastName,
                    injuries: a.injuries
                }))
            };
        })
    };
}

export function fetchTeams(athleteId: string) {
    return async (dispatch: any) => {
        const data = await fetchTeamsEndpoint(athleteId);
        return dispatch(getTeams(athleteId, data));
    };
}

async function fetchTeamsEndpoint(athleteId: string): Promise<Team[]> {
    let params: any = {};
    let query = Object.keys(params)
        .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    let response = await fetch("./teams");
    let data = await response.json();
    console.log(data);
    return data;
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
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return null;
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
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return null;
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
            if (response.error) {
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

export function getAthleteTemplate() {
    fetch("./athleteTemplate", {
        method: "get"
    })
        .then(async function(response: any) {
            if (response.status !== 200) {
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
