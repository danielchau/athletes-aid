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
                            injuryDescription:
                                "It hurts a lot Arjan says. Career might be over. ",
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
