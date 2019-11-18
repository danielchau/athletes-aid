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
import { Team } from "../util/types";

function getSteps() {
    return ["Injury Details", "Further Details", "Review"];
}

interface InjuryLoggingPageProps {
    selectedTeam: Team;
}

export default function InjuryLoggingPage(props: InjuryLoggingPageProps) {
    const classes = injuryLoggingPageStyles({});
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        if (activeStep == steps.length - 1) {
            // Send API event to log injury here
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
                                "Finish"
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
