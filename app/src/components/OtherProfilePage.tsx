import React from "react";
import ProfilePageContainer from "../containers/ProfilePageContainer";
import { AthleteProfile, User } from "../util/types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAthlete } from "../actions/AthleteAction";
import { otherProfilePageStyles } from "../styles/react/OtherProfilePageStyles";
import FetchingScreen from "./FetchingScreen";
import ErrorDialog from "./ErrorDialog";

interface OtherProfilePageProps {
    selectedAthleteId: string;
    currentUser: User;
}

/**
 * Other Profile Page is a container that displays an athlete page for athletes other than the
 * user.
 * @param props
 */
export default function OtherProfilePage(props: OtherProfilePageProps) {
    const classes = otherProfilePageStyles({});
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [currentAthlete, setCurrentAthlete] = React.useState<AthleteProfile | null>(null);
    const [openError, setOpenError] = React.useState(false);

    /**
     * Fetch the athlete profile if the id is valid.
     */
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
            <ErrorDialog open={openError} setOpen={setOpenError} />
            {isFetching && !!!currentAthlete ? (
                <FetchingScreen />
            ) : (
                <ProfilePageContainer
                    currentAthlete={currentAthlete}
                    canEdit={props.currentUser.permissions.canEditOtherProfiles}
                />
            )}
        </div>
    );
}
