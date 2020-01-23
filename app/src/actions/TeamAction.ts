import { Team } from "../util/types";

export async function createTeam(name: string, season: string) {
    return await fetchCreateTeam(name, season);
}

async function fetchCreateTeam(
    name: string,
    season: string
): Promise<Team | null> {
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
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " +
                        response.status
                );
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
