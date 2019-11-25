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

function createMockAthleteInjuries(): Injury[] {
    return [
        {
            id: "1",
            active: true,
            createdOn: new Date(),
            createdBy: "temp",
            teamName: "Team 1",
            athleteName: "Athlete 1",
            injuryDate: new Date("11/18/2019"),
            isSportsRelated: true,
            eventType: "Practice",
            position: "Position 1",
            sideOfBody: "Midline",
            locationOnBody: "Head/Face",
            injuryType: "Contusion",
            severity: 6,
            status: "Mod",
            mechanism: "Indirect contact",
            injuryDescription: "Random description.",
            otherNotes: [
                {
                    createdBy: "Person 1",
                    createdOn: new Date(),
                    content: "random note"
                },
                {
                    createdBy: "Person 2",
                    createdOn: new Date(),
                    content: "random note 2"
                }
            ]
        },
        {
            id: "2",
            active: true,
            createdOn: new Date(),
            createdBy: "temp",
            teamName: "Team 2",
            athleteName: "Athlete 2",
            injuryDate: new Date("09/16/2019"),
            isSportsRelated: true,
            eventType: "Game",
            position: "Position 1",
            sideOfBody: "Midline",
            locationOnBody: "Knee",
            injuryType: "Dislocation",
            severity: 4,
            status: "Out",
            mechanism: "Direct contact with another athlete",
            injuryDescription: "Random description.",
            otherNotes: [
                {
                    createdBy: "Person 1",
                    createdOn: new Date(),
                    content: "random note"
                }
            ]
        }
    ];
}
