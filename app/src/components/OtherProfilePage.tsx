import React from "react";
import ProfilePageContainer from "../containers/ProfilePageContainer";
import { AthleteProfile } from "../util/types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAthlete } from "../actions/AthleteAction";
import { otherProfilePageStyles } from "../styles/react/OtherProfilePage.Styles";

interface OtherProfilePageProps {
    selectedAthleteId: string;
}

export default function OtherProfilePage(props: OtherProfilePageProps) {
    const classes = otherProfilePageStyles({});
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [currentAthlete, setCurrentAthlete] = React.useState<AthleteProfile | null>(null);

    React.useEffect(() => {
        if (props.selectedAthleteId != "") {
            getAthlete(props.selectedAthleteId).then((response: AthleteProfile | null) => {
                if (!!response) {
                    setCurrentAthlete(response);
                    setIsFetching(false);
                }
            });
        }
    }, [props.selectedAthleteId]);

    return (
        <div className={classes.root}>
            {isFetching && !!!currentAthlete ? (
                <div className={classes.progressContainer}>
                    <CircularProgress size={60} />
                </div>
            ) : (
                <ProfilePageContainer currentAthlete={currentAthlete} canEdit={false} />
            )}
        </div>
    );
}
