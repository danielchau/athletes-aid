import * as React from "react";
import { injuryLoggingPageStyles } from "../styles/react/InjuryLoggingPageStyles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InjuryLoggingStepContent from "./InjuryLoggingStepContent";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import DoneIcon from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Team, Injury, User, Athlete } from "../util/types";
import { postInjury, postInjuryNote } from "../actions/InjuriesAction";
import FetchingScreen from "./FetchingScreen";
import { bodyLocations, injuryTypes } from "../constants/constants";

function getSteps() {
    return ["Injury Details", "Further Details", "Review"];
}

interface InjuryLoggingPageProps {
    selectedTeam: Team;
    existingInjury: Injury | null;
    callbackUponFinishing: any;
    currentUser: User;
    getTeams: (id: string) => void;
    currentRoster: Athlete[];
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

/**
 * Injury Logging Page displays fields needed to log an injury.
 * @param props
 */
export default function InjuryLoggingPage(props: InjuryLoggingPageProps) {
    const classes = injuryLoggingPageStyles({});
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [isLogging, setIsLogging] = React.useState(false);

    const isLocationOther = () => {
        return bodyLocations.some(l => l == props.existingInjury.locationOnBody);
    };

    const isTypeOther = () => {
        return injuryTypes.some(t => t == props.existingInjury.injuryType);
    };

    const [selectedAthlete, setSelectedAthlete] = React.useState(
        !!props.existingInjury ? props.existingInjury.athleteName : ""
    );
    const [selectedDate, setSelectedDate] = React.useState<Date>(
        !!props.existingInjury ? props.existingInjury.injuryDate : new Date()
    );
    const [isSportsRelated, setIsSportsRelated] = React.useState(
        !!props.existingInjury ? props.existingInjury.isSportsRelated : false
    );
    const [selectedEventType, setSelectedEventType] = React.useState(
        !!props.existingInjury ? props.existingInjury.eventType : ""
    );
    const [selectedSideOfBody, setSelectedSideOfBody] = React.useState(
        !!props.existingInjury ? props.existingInjury.sideOfBody : ""
    );
    const [selectedLocationOnBody, setSelectedLocationOnBody] = React.useState(
        !!props.existingInjury
            ? isLocationOther()
                ? "Other"
                : props.existingInjury.locationOnBody
            : ""
    );
    const [selectedLocationOnBodyOther, setSelectedLocationOnBodyOther] = React.useState(
        !!props.existingInjury && isLocationOther() ? props.existingInjury.locationOnBody : ""
    );
    const [selectedInjuryType, setSelectedInjuryType] = React.useState(
        !!props.existingInjury ? (isTypeOther() ? "Other" : props.existingInjury.injuryType) : ""
    );
    const [selectedInjuryTypeOther, setSelectedInjuryTypeOther] = React.useState(
        !!props.existingInjury && isTypeOther() ? props.existingInjury.injuryType : ""
    );
    const [selectedSeverity, setSelectedSeverity] = React.useState(
        !!props.existingInjury ? props.existingInjury.severity : 0
    );
    const [selectedStatus, setSelectedStatus] = React.useState(
        !!props.existingInjury ? props.existingInjury.status : ""
    );
    const [selectedMechanismOfInjury, setSelectedMechanismOfInjury] = React.useState(
        !!props.existingInjury ? props.existingInjury.mechanism : ""
    );
    const [injuryDescription, setInjuryDescription] = React.useState(
        !!props.existingInjury ? props.existingInjury.injuryDescription : ""
    );
    const [otherNotes, setOtherNotes] = React.useState(
        !!props.existingInjury
            ? "Notes can't be altered. See all injury notes on overview page."
            : ""
    );
    const [hasError, setHasError] = React.useState<boolean>(false);

    const [isFetching, setIsFetching] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (!!props.currentRoster) {
            setIsFetching(false);
        } else {
            props.getCurrentRoster(props.selectedTeam.athleteIds).then(_ => {
                setIsFetching(false);
            });
        }
    }, []);

    React.useEffect(() => {
        if (
            !!props.currentRoster &&
            JSON.stringify(props.currentRoster.map(a => a.id)) !=
                JSON.stringify(props.selectedTeam.athleteIds)
        ) {
            props.getCurrentRoster(props.selectedTeam.athleteIds).then(_ => {
                setIsFetching(false);
            });
        }
    }, [props.selectedTeam]);

    const handleNext = () => {
        if (activeStep == steps.length - 1) {
            if (!!props.callbackUponFinishing) {
                props.callbackUponFinishing();
            } else {
                setIsLogging(true);
                postInjury(
                    JSON.stringify({
                        athleteId: props.currentRoster.filter(a => a.name == selectedAthlete)[0].id,
                        createdBy: props.currentUser.athleteProfile.name,
                        active: true,
                        teamName: props.selectedTeam.name,
                        teamId: props.selectedTeam.id,
                        athleteName: selectedAthlete,
                        injuryDate: selectedDate.toString(),
                        isSportsRelated: isSportsRelated,
                        eventType: selectedEventType,
                        sideOfBody: selectedSideOfBody,
                        locationOnBody:
                            selectedLocationOnBody == "Other"
                                ? selectedLocationOnBodyOther
                                : selectedLocationOnBody,
                        injuryType:
                            selectedInjuryType == "Other"
                                ? selectedInjuryTypeOther
                                : selectedInjuryType,
                        severity: selectedSeverity.toString(),
                        status: selectedStatus,
                        mechanism: selectedMechanismOfInjury,
                        injuryDescription: injuryDescription
                    })
                ).then((id: string | null) => {
                    if (!!id) {
                        postInjuryNote(id, otherNotes, props.currentUser.athleteProfile.name).then(
                            _ => {
                                props.getTeams("");
                            }
                        );
                    }

                    setIsLogging(false);
                    setActiveStep(prevActiveStep => prevActiveStep + 1);
                    setSelectedAthlete("");
                    setSelectedDate(new Date());
                    setIsSportsRelated(false);
                    setSelectedEventType("");
                    setSelectedSideOfBody("");
                    setSelectedLocationOnBody("");
                    setSelectedLocationOnBodyOther("");
                    setSelectedInjuryType("");
                    setSelectedInjuryTypeOther("");
                    setSelectedSeverity(0);
                    setSelectedStatus("");
                    setSelectedMechanismOfInjury("");
                    setInjuryDescription("");
                    setOtherNotes("");
                });
            }
        } else {
            if (
                activeStep == 0 &&
                (selectedAthlete == "" ||
                    selectedEventType == "" ||
                    selectedLocationOnBody == "" ||
                    selectedInjuryType == "" ||
                    (selectedLocationOnBody == "Other" && selectedLocationOnBodyOther == "") ||
                    (selectedInjuryType == "Other" && selectedInjuryTypeOther == ""))
            ) {
                setHasError(true);
            } else if (
                activeStep == 1 &&
                (selectedStatus == "" || selectedMechanismOfInjury == "")
            ) {
                setHasError(true);
            } else {
                setHasError(false);
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            {isFetching || !!!props.currentRoster ? (
                <FetchingScreen />
            ) : (
                <>
                    <Paper className={classes.paper}>
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                            className={classes.stepper}
                        >
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>
                    {activeStep === steps.length ? (
                        <div className={classes.completedContainer}>
                            <Typography variant="h4" className={classes.instructions}>
                                All steps completed. Injury is Logged.
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleReset}>
                                Log Another Injury
                            </Button>
                        </div>
                    ) : (
                        <div className={classes.loggingContent}>
                            <Paper className={classes.paperContent}>
                                <InjuryLoggingStepContent
                                    stepIndex={activeStep}
                                    selectedTeam={props.selectedTeam}
                                    currentRoster={props.currentRoster}
                                    existingInjury={props.existingInjury}
                                    selectedAthlete={selectedAthlete}
                                    setSelectedAthlete={setSelectedAthlete}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    isSportsRelated={isSportsRelated}
                                    setIsSportsRelated={setIsSportsRelated}
                                    selectedEventType={selectedEventType}
                                    setSelectedEventType={setSelectedEventType}
                                    selectedSideOfBody={selectedSideOfBody}
                                    setSelectedSideOfBody={setSelectedSideOfBody}
                                    selectedLocationOnBody={selectedLocationOnBody}
                                    setSelectedLocationOnBody={setSelectedLocationOnBody}
                                    selectedLocationOnBodyOther={selectedLocationOnBodyOther}
                                    setSelectedLocationOnBodyOther={setSelectedLocationOnBodyOther}
                                    selectedInjuryType={selectedInjuryType}
                                    setSelectedInjuryType={setSelectedInjuryType}
                                    selectedInjuryTypeOther={selectedInjuryTypeOther}
                                    setSelectedInjuryTypeOther={setSelectedInjuryTypeOther}
                                    selectedSeverity={selectedSeverity}
                                    setSelectedSeverity={setSelectedSeverity}
                                    selectedStatus={selectedStatus}
                                    setSelectedStatus={setSelectedStatus}
                                    selectedMechanismOfInjury={selectedMechanismOfInjury}
                                    setSelectedMechanismOfInjury={setSelectedMechanismOfInjury}
                                    injuryDescription={injuryDescription}
                                    setInjuryDescription={setInjuryDescription}
                                    otherNotes={otherNotes}
                                    setOtherNotes={setOtherNotes}
                                ></InjuryLoggingStepContent>
                            </Paper>
                            <div className={classes.loggingBottomButtons}>
                                {hasError && (
                                    <Typography className={classes.errorPrompt}>
                                        Please fill out all required fields.
                                    </Typography>
                                )}
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    <NavigateBeforeIcon></NavigateBeforeIcon>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? (
                                        <>
                                            Finish
                                            {isLogging ? (
                                                <CircularProgress
                                                    size={24}
                                                    color={"inherit"}
                                                    className={classes.progress}
                                                />
                                            ) : (
                                                <DoneIcon />
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            Next<NavigateNextIcon></NavigateNextIcon>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
