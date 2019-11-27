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
            id: "1",
            name: "Mixed Bocce Ball",
            season: "2018/2019",
            athletes: [
                { id: "1", name: "Hannah Montana" },
                { id: "2", name: "Hilary Duff" },
                { id: "3", name: "Taylor Swift" },
                { id: "4", name: "Kanye West" },
                { id: "5", name: "Kim Kardashian" },
                { id: "6", name: "Arjan Sandhu" },
                { id: "7", name: "Skip Bayless" },
                { id: "8", name: "Lil Nas X" },
                { id: "9", name: "Kobe Bryant" }
            ] as Athlete[]
        },
        {
            id: "2",
            name: "Tether Ball",
            season: "2019/2020",
            athletes: [
                { id: "1", name: "Bob Phil" },
                { id: "2", name: "Phil Bob" },
                { id: "3", name: "Bobby Philly" },
                { id: "4", name: "Philly Bobby" },
                { id: "5", name: "Joe James" },
                { id: "6", name: "James Joe" },
                { id: "7", name: "Freddy Two" },
                { id: "8", name: "Two Freddy" }
            ] as Athlete[]
        }
    ];
}
