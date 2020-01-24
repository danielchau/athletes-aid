import { GET_TEAMS, Athlete, Team } from "../util/types";
import download from "downloadjs";

export function getTeams(athleteId: string, data: any) {
    return {
        type: GET_TEAMS,
        teams: data.data.teams.map((d: any) => {
            return {
                id: d.id,
                name: d.name,
                season: d.season,
                athletes: d.athletes
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
    await fetchCreateTeam(name, season);
}

async function fetchCreateTeam(name: string, season: string) {
    fetch("./team", {
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
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
            } else {
                console.log(response);
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
        });
}

export async function updateTeamInfo(id: string, name: string, season: string) {
    await fetchUpdateTeamInfo(id, name, season);
}

async function fetchUpdateTeamInfo(id: string, name: string, season: string) {
    fetch("./team", {
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
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
            } else {
                console.log(response);
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
        });
}

export async function updateTeamAthletes(id: string, athletes: string[]) {
    await fetchUpdateTeamAthletes(id, athletes);
}

async function fetchUpdateTeamAthletes(id: string, athletes: string[]) {
    fetch("./team", {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            teamId: id,
            athletes: athletes
        })
    })
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
            } else {
                console.log(response);
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
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

function createMockTeams() {
    return [
        {
            id: "1",
            name: "Mixed Bocce Ball",
            season: "2018/2019",
            athletes: [
                { id: "1", name: "Hannah Montana", injuries: [] },
                { id: "2", name: "Hilary Duff", injuries: [] },
                { id: "3", name: "Taylor Swift", injuries: [] },
                { id: "4", name: "Kanye West", injuries: [] },
                { id: "5", name: "Kim Kardashian", injuries: [] },
                {
                    id: "6",
                    name: "Arjan Sandhu",
                    injuries: [
                        {
                            id: "09935a9b-a170-4157-8158-067a581d8274",
                            createdOn: new Date("2019-11-27T21:42:08.000Z"),
                            createdBy: "Daniel Chau",
                            active: true,
                            teamName: "Mixed Bocce Ball",
                            athleteName: "Arjan Sandhu",
                            injuryDate: new Date("2019-11-25T21:40:00.000Z"),
                            isSportsRelated: true,
                            eventType: "Game",
                            position: "Position 1",
                            sideOfBody: "Left",
                            locationOnBody: "Knee",
                            injuryType: "Contusion",
                            severity: 10,
                            status: "Out",
                            mechanism: "Direct contact with playing surface",
                            injuryDescription: "It hurts a lot Arjan says. Career might be over. ",
                            otherNotes: []
                        }
                    ]
                },
                { id: "7", name: "Skip Bayless", injuries: [] },
                {
                    id: "8",
                    name: "Lil Nas X",
                    injuries: [
                        {
                            id: "4abb7216-cd08-4bf0-b126-59e7215851a9",
                            createdOn: new Date("2019-11-25T21:44:53.000Z"),
                            createdBy: "Daniel Chau",
                            active: true,
                            teamName: "Mixed Bocce Ball",
                            athleteName: "Lil Nas X",
                            injuryDate: new Date("2019-11-23T21:44:00.000Z"),
                            isSportsRelated: true,
                            eventType: "Game",
                            position: "Position 1",
                            sideOfBody: "Bilateral",
                            locationOnBody: "Hand",
                            injuryType: "Dislocation",
                            severity: 4,
                            status: "Mod",
                            mechanism: "Direct contact with playing surface",
                            injuryDescription:
                                "Pain.\nSwelling.\nBruising.\nInstability of the joint.\nLoss of ability to move the joint.\nVisibly deformed joint (bone looks out of place).",
                            otherNotes: []
                        }
                    ]
                },
                { id: "9", name: "Kobe Bryant", injuries: [] }
            ] as Athlete[]
        },
        {
            id: "2",
            name: "Tether Ball",
            season: "2019/2020",
            athletes: [
                { id: "1", name: "Bob Phil", injuries: [] },
                { id: "2", name: "Phil Bob", injuries: [] },
                { id: "3", name: "Bobby Philly", injuries: [] },
                { id: "4", name: "Philly Bobby", injuries: [] },
                { id: "5", name: "Joe James", injuries: [] },
                { id: "6", name: "James Joe", injuries: [] },
                { id: "7", name: "Freddy Two", injuries: [] },
                { id: "8", name: "Two Freddy", injuries: [] }
            ] as Athlete[]
        }
    ];
}
