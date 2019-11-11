import {
    GET_ATHLETE_INJURIES,
    SET_STARTING_DATE,
    Injury,
    SET_ENDING_DATE
} from "../util/types";
export function getAthleteInjuries(
    startDate: Date,
    endDate: Date,
    team: string
) {
    return {
        type: GET_ATHLETE_INJURIES,
        athleteInjuries: {
            injuries: createMockAthleteInjuries(),
            startDate: startDate,
            endDate: endDate
        }
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

function createMockAthleteInjuries(): Injury[] {
    return [
        {
            id: "1",
            createdAt: new Date("2019-05-24"),
            athleteName: "Athlete 1",
            locationOnBody: "head",
            injuryType: "concussion",
            severity: 4,
            active: true
        },
        {
            id: "2",
            createdAt: new Date("2019-06-15"),
            athleteName: "Athlete 2",
            locationOnBody: "ankle",
            injuryType: "sprain",
            severity: 3,
            active: true
        },
        {
            id: "3",
            createdAt: new Date("2019-05-24"),
            athleteName: "Athlete 1",
            locationOnBody: "shoulder",
            injuryType: "discolation",
            severity: 8,
            active: false
        }
    ];
}
