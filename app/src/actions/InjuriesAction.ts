import { GET_ATHLETE_INJURIES, SET_STARTING_DATE, Injury, SET_ENDING_DATE } from "../util/types";
export function getAthleteInjuries(startDate: Date, endDate: Date, team: string, data: any) {
    return {
        type: GET_ATHLETE_INJURIES,
        athleteInjuries: {
            injuries: transformJSONToInjury(data.data.injuries),
            startDate: startDate,
            endDate: endDate
        }
    };
}

export function fetchAthleteInjuries(startDate: Date, endDate: Date, team: string) {
    return async (dispatch: any) => {
        const data = await fetchInjuries(startDate, endDate, team);
        return dispatch(getAthleteInjuries(startDate, endDate, team, data));
    };
}

export function setInjuriesStartingDate(startingDate: Date) {
    return {
        type: SET_STARTING_DATE,
        startingDate: startingDate
    };
}

export function setInjuriesEndingDate(endingDate: Date) {
    return {
        type: SET_ENDING_DATE,
        endingDate: endingDate
    };
}

export function transformJSONToInjury(json: any[]): Injury[] {
    return json.map((injury: any) => {
        return {
            id: injury.id,
            active: injury.active,
            createdOn: new Date(injury.createdAt),
            createdBy: injury.createdBy,
            teamName: injury.teamName,
            athleteName: injury.athleteName,
            injuryDate: new Date(injury.injuryDate),
            isSportsRelated: injury.isSportsRelated,
            eventType: injury.eventType,
            position: injury.position,
            sideOfBody: injury.sideOfBody,
            locationOnBody: injury.locationOnBody,
            injuryType: injury.injuryType,
            severity: injury.severity,
            status: injury.status,
            mechanism: injury.mechanism,
            injuryDescription: injury.injuryDescription,
            otherNotes: !!injury.otherNotes
                ? injury.otherNotes.map((n: any) => ({
                      createdBy: !!n.createdBy ? n.createdBy : "",
                      createdOn: new Date(n.createdOn),
                      content: n.content
                  }))
                : []
        };
    });
}

async function fetchInjuries(startDate: Date, endDate: Date, teamId: string): Promise<Injury[]> {
    let params: any = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        teamId: teamId
    };
    let query = Object.keys(params)
        .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    let response = await fetch("./injuriesInDateRange?" + query);
    let data = await response.json();
    return data;
}

export async function postInjury(athleteInfo: any) {
    return await fetchPostInjury(athleteInfo);
}

async function fetchPostInjury(athleteInfo: any): Promise<string | null> {
    return fetch("./singleInjury", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: athleteInfo
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return response.data.injuryId;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function postInjuryNote(injuryId: string, content: string, createdBy: string) {
    return await fetchPostInjuryNote(injuryId, content, createdBy);
}

async function fetchPostInjuryNote(
    injuryId: string,
    content: string,
    createdBy: string
): Promise<Injury | null> {
    return fetch("./injuryNote", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            createdBy: createdBy,
            injuryId: injuryId,
            content: content
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return transformJSONToInjury([response.data.injury])[0];
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function setInjuryStatus(injuryId: string, status: boolean) {
    return await fetchInjuryStatus(injuryId, status);
}

async function fetchInjuryStatus(injuryId: string, status: boolean): Promise<Injury | null> {
    return fetch("./injuryActive", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            injuryId: injuryId,
            active: status
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return transformJSONToInjury([response.data.injury])[0];
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}
