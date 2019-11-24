import { GET_TEAMS, Athlete } from "../util/types";
export function getTeams(id: string) {
    return {
        type: GET_TEAMS,
        teams: createMockTeams()
    };
}

function createMockTeams() {
    return [
        {
            name: "Team 1",
            athletes: [
                { id: "1", name: "Athlete 1" },
                { id: "2", name: "Athlete 2" }
            ] as Athlete[]
        },
        { name: "Team 2", athletes: [] as Athlete[] }
    ];
}
