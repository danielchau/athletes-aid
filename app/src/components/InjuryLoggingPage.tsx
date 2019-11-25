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
import { Team, Injury } from "../util/types";

function getSteps() {
    return ["Injury Details", "Further Details", "Review"];
}

interface InjuryLoggingPageProps {
    selectedTeam: Team;
    existingInjury: Injury | null;
    callbackUponFinishing: any;
}

export default function InjuryLoggingPage(props: InjuryLoggingPageProps) {
    const classes = injuryLoggingPageStyles({});
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

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
    const [selectedPosition, setSelectedPosition] = React.useState(
        !!props.existingInjury ? props.existingInjury.position : ""
    );
    const [selectedSideOfBody, setSelectedSideOfBody] = React.useState(
        !!props.existingInjury ? props.existingInjury.sideOfBody : ""
    );
    const [selectedLocationOnBody, setSelectedLocationOnBody] = React.useState(
        !!props.existingInjury ? props.existingInjury.locationOnBody : ""
    );
    const [selectedInjuryType, setSelectedInjuryType] = React.useState(
        !!props.existingInjury ? props.existingInjury.injuryType : ""
    );
    const [selectedSeverity, setSelectedSeverity] = React.useState(
        !!props.existingInjury ? props.existingInjury.severity : 0
    );
    const [selectedStatus, setSelectedStatus] = React.useState(
        !!props.existingInjury ? props.existingInjury.status : ""
    );
    const [
        selectedMechanismOfInjury,
        setSelectedMechanismOfInjury
    ] = React.useState(
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

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        if (activeStep == steps.length - 1) {
            if (!!props.callbackUponFinishing) {
                props.callbackUponFinishing();
            }

            fetch("./singleInjury", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    createdBy: "Daniel Chau",
                    active: true,
                    teamName: props.selectedTeam.name,
                    athleteName: selectedAthlete,
                    injuryDate: selectedDate.toString(),
                    isSportsRelated: isSportsRelated,
                    eventType: selectedEventType,
                    position: selectedPosition,
                    sideOfBody: selectedSideOfBody,
                    locationOnBody: selectedLocationOnBody,
                    injuryType: selectedInjuryType,
                    severity: selectedSeverity.toString(),
                    status: selectedStatus,
                    mechanism: selectedMechanismOfInjury,
                    injuryDescription: injuryDescription
                })
            })
                .then(function(response: any) {
                    if (response.status !== 200) {
                        console.log(
                            "Looks like there was a problem. Status Code: " +
                                response.status
                        );
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function(data: any) {
                        console.log(data);
                    });
                })
                .catch(function(err: Error) {
                    console.log("Fetch Error", err);
                });
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
                        All steps completed.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReset}
                    >
                        Log Another Injury
                    </Button>
                </div>
            ) : (
                <div className={classes.loggingContent}>
                    <Paper className={classes.paperContent}>
                        <InjuryLoggingStepContent
                            stepIndex={activeStep}
                            selectedTeam={props.selectedTeam}
                            existingInjury={props.existingInjury}
                            selectedAthlete={selectedAthlete}
                            setSelectedAthlete={setSelectedAthlete}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            isSportsRelated={isSportsRelated}
                            setIsSportsRelated={setIsSportsRelated}
                            selectedEventType={selectedEventType}
                            setSelectedEventType={setSelectedEventType}
                            selectedPosition={selectedPosition}
                            setSelectedPosition={setSelectedPosition}
                            selectedSideOfBody={selectedSideOfBody}
                            setSelectedSideOfBody={setSelectedSideOfBody}
                            selectedLocationOnBody={selectedLocationOnBody}
                            setSelectedLocationOnBody={
                                setSelectedLocationOnBody
                            }
                            selectedInjuryType={selectedInjuryType}
                            setSelectedInjuryType={setSelectedInjuryType}
                            selectedSeverity={selectedSeverity}
                            setSelectedSeverity={setSelectedSeverity}
                            selectedStatus={selectedStatus}
                            setSelectedStatus={setSelectedStatus}
                            selectedMechanismOfInjury={
                                selectedMechanismOfInjury
                            }
                            setSelectedMechanismOfInjury={
                                setSelectedMechanismOfInjury
                            }
                            injuryDescription={injuryDescription}
                            setInjuryDescription={setInjuryDescription}
                            otherNotes={otherNotes}
                            setOtherNotes={setOtherNotes}
                        ></InjuryLoggingStepContent>
                    </Paper>
                    <div className={classes.loggingBottomButtons}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            <NavigateBeforeIcon></NavigateBeforeIcon>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            {activeStep === steps.length - 1 ? (
                                <>
                                    Finish<DoneIcon></DoneIcon>
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
        </div>
    );
}
