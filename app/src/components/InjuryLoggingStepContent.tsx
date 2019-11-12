import * as React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { injuryLoggingStepContentStyles } from "../styles/react/InjuryLoggingStepContentStyles";

export default function InjuryLoggingStepContent(stepIndex: number) {
    const classes = injuryLoggingStepContentStyles({});
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    );
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    switch (stepIndex) {
        case 0:
            return (
                <>
                    <Typography className={classes.instructions}>
                        Please input the following information regarding the
                        injury.
                    </Typography>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="team-select-label">
                            Team Name
                        </InputLabel>
                        <Select
                            labelWidth={90}
                            id="team-select"
                            value={""}
                            inputProps={{ readOnly: true }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="athlete-select-label">
                            Athlete Name
                        </InputLabel>
                        <Select labelWidth={100} id="athlete-select" value={""}>
                            <MenuItem value="" disabled>
                                Select athlete on team...
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.dateInput}
                            disableToolbar
                            inputVariant="outlined"
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-select"
                            label="Injury Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                        className={classes.checkboxInput}
                        control={<Checkbox color="primary" value="true" />}
                        label="Sports Related"
                    />
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="event-type-select-label">
                            Event Type
                        </InputLabel>
                        <Select
                            labelWidth={80}
                            id="event-type-select"
                            value={""}
                        >
                            <MenuItem value="" disabled>
                                Select where injury took place...
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="position-select-label">
                            Position
                        </InputLabel>
                        <Select labelWidth={60} id="position-select" value={""}>
                            <MenuItem value="" disabled>
                                Select position of athlete...
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="side-of-body-select-label">
                            Side Of Body
                        </InputLabel>
                        <Select
                            labelWidth={100}
                            id="side-of-body-select"
                            value={""}
                        >
                            <MenuItem value="" disabled>
                                Select side of body...
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="body-location-select-label">
                            Location On Body
                        </InputLabel>
                        <Select
                            labelWidth={130}
                            id="body-location-select"
                            value={""}
                        >
                            <MenuItem value="" disabled>
                                Select injury location...
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="injury-type-select-label">
                            Injury Type
                        </InputLabel>
                        <Select
                            labelWidth={80}
                            id="injury-type-select"
                            value={""}
                        >
                            <MenuItem value="" disabled>
                                Select type of injury...
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel id="severity-select-label">
                            Severity
                        </InputLabel>
                        <Select labelWidth={60} id="severity-select" value={""}>
                            <MenuItem value="" disabled>
                                Select severity of injury...
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                </>
            );
        case 1:
            return (
                <>
                    <Typography className={classes.instructions}>
                        Please input further details about the injury.
                    </Typography>
                    <FormControl className={classes.textInput}>
                        <FormControl
                            className={classes.multilineInput}
                            variant="outlined"
                        >
                            <InputLabel id="status-select-label">
                                Status
                            </InputLabel>
                            <Select
                                labelWidth={50}
                                id="status-select"
                                value={""}
                            >
                                <MenuItem value="" disabled>
                                    Select status of athlete...
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            className={classes.multilineInput}
                            variant="outlined"
                        >
                            <InputLabel id="mechanism-select-label">
                                Mechanism of Injury
                            </InputLabel>
                            <Select
                                labelWidth={145}
                                id="mechanism-select"
                                value={""}
                            >
                                <MenuItem value="" disabled>
                                    Select mechanism of injury...
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-multiline-static"
                            className={classes.multilineInput}
                            label="Injury Description"
                            multiline
                            rows="4"
                            placeholder="Optional"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-static"
                            className={classes.multilineInput}
                            label="Other Notes"
                            multiline
                            rows="4"
                            placeholder="Optional"
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                </>
            );
        case 2:
            return <></>;
        default:
            return "Unknown stepIndex";
    }
}
