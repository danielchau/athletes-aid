import {
    GET_ATHLETE_INJURIES,
    SET_STARTING_DATE,
    Injury,
    SET_ENDING_DATE
} from "../util/types";
export function getAthleteInjuries(
    startDate: Date,
    endDate: Date,
    team: string,
    data: any
) {
    return {
        type: GET_ATHLETE_INJURIES,
        athleteInjuries: {
            injuries: transformJSONToInjury(data.data.injuries),
            startDate: startDate,
            endDate: endDate
        }
    };
}

export function fetchAthleteInjuries(
    startDate: Date,
    endDate: Date,
    team: string
) {
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

function transformJSONToInjury(json: any[]): Injury[] {
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
            otherNotes: []
        };
    });
}

async function fetchInjuries(
    startDate: Date,
    endDate: Date,
    teamName: string
): Promise<Injury[]> {
    let params: any = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        teamName: teamName
    };
    let query = Object.keys(params)
        .map(
            (k: any) =>
                encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
        )
        .join("&");

    let response = await fetch("./injuriesInDateRange?" + query);
    let data = await response.json();
    return data;
}
