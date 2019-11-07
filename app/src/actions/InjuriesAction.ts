import { GET_ATHLETE_INJURIES, Injury } from "../util/types";
export function getAthleteInjuries(
    startDate: string,
    endDate: string,
    team: string
) {
    return {
        type: GET_ATHLETE_INJURIES,
        athleteInjuries: {
            injuries: createMockAthleteInjuries(),
            startDate: "2019-05-24",
            endDate: "2019-06-24"
        }
    };
}

function createMockAthleteInjuries(): Injury[] {
    return [
        {
            id: "1",
            createdAt: "2019-05-24",
            athleteName: "Athlete 1",
            locationOnBody: "head",
            injuryType: "concussion",
            severity: 4
        },
        {
            id: "2",
            createdAt: "2019-06-15",
            athleteName: "Athlete 2",
            locationOnBody: "ankle",
            injuryType: "sprain",
            severity: 3
        },
        {
            id: "3",
            createdAt: "2019-05-24",
            athleteName: "Athlete 1",
            locationOnBody: "shoulder",
            injuryType: "discolation",
            severity: 8
        }
    ];
}
