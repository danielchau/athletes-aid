import React from "react";
import { AthleteProfile, User } from "../util/types";
import { Typography, Divider, TextField } from "@material-ui/core";
import { profilePageStyles } from "../styles/react/ProfilePageStyles";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { updateAthlete } from "../actions/AthleteAction";

interface ProfilePageInfo {
    currentAthlete: AthleteProfile;
    isEditing: boolean;
    setIsUpdating: any;
    currentUser: User;
}

/**
 * Renders all of the basic information for an athlete on their profile.
 * @param props
 */
export default function ProfilePageInfo(props: ProfilePageInfo) {
    const classes = profilePageStyles({});
    const [isInitialRender, setIsInitialRender] = React.useState<boolean>(true);
    const [birthdate, setBirthdate] = React.useState<string>(props.currentAthlete.birthdate);
    const [schoolYear, setSchoolYear] = React.useState<string>(
        props.currentAthlete.schoolYear.toString()
    );
    const [gender, setGender] = React.useState<string>(props.currentAthlete.gender);
    const [weight, setWeight] = React.useState<string>(props.currentAthlete.weight.toString());
    const [height, setHeight] = React.useState<string>(props.currentAthlete.height.toString());

    const [email, setEmail] = React.useState<string>(props.currentAthlete.email);
    const [cellPhone, setCellPhone] = React.useState<string>(props.currentAthlete.cellPhone);
    const [homePhone, setHomePhone] = React.useState<string>(props.currentAthlete.homePhone);
    const [healthCardNo, setHealthCardNo] = React.useState<string>(
        props.currentAthlete.healthCardNumber
    );
    const [studentNo, setStudentNo] = React.useState<string>(props.currentAthlete.studentNumber);

    const [ecName, setEcName] = React.useState<string>(props.currentAthlete.emergencyContact.name);
    const [ecEmail, setEcEmail] = React.useState<string>(
        props.currentAthlete.emergencyContact.email
    );
    const [ecPhone, setEcPhone] = React.useState<string>(
        props.currentAthlete.emergencyContact.phone
    );

    React.useEffect(() => {
        setBirthdate(props.currentAthlete.birthdate);
        setSchoolYear(props.currentAthlete.schoolYear.toString());
        setGender(props.currentAthlete.gender.toString());
        setWeight(props.currentAthlete.weight.toString());
        setEmail(props.currentAthlete.email);
        setCellPhone(props.currentAthlete.cellPhone);
        setHomePhone(props.currentAthlete.homePhone);
        setHealthCardNo(props.currentAthlete.healthCardNumber);
        setStudentNo(props.currentAthlete.studentNumber);
        setEcName(props.currentAthlete.emergencyContact.name);
        setEcEmail(props.currentAthlete.emergencyContact.email);
        setEcPhone(props.currentAthlete.emergencyContact.phone);
    }, [props.currentAthlete]);

    React.useEffect(() => {
        if (!props.isEditing && !isInitialRender) {
            updateAthlete(
                {
                    id: props.currentAthlete.id,
                    profilePicture: props.currentAthlete.profilePicture,
                    name: props.currentAthlete.name,
                    birthdate: birthdate,
                    schoolYear: Number(schoolYear),
                    gender: gender,
                    weight: Number(weight),
                    height: Number(height),
                    email: email,
                    cellPhone: cellPhone,
                    homePhone: homePhone,
                    healthCardNumber: healthCardNo,
                    studentNumber: studentNo,
                    emergencyContact: {
                        id: props.currentAthlete.emergencyContact.id,
                        name: ecName,
                        phone: ecPhone,
                        email: ecEmail
                    },
                    files: props.currentAthlete.files,
                    injuries: props.currentAthlete.injuries
                },
                props.currentUser.athleteProfile.name
            ).then(_ => {
                props.setIsUpdating(false);
            });
        }
        setIsInitialRender(false);
    }, [props.isEditing]);

    return (
        <>
            <Typography className={classes.heading} variant="h6">
                Basic Information
            </Typography>
            {[
                ["Birthdate", birthdate, setBirthdate],
                ["Year In School", schoolYear, setSchoolYear],
                ["Gender", gender, setGender],
                ["Weight", weight, setWeight],
                ["Height", height, setHeight]
            ].map(([category, value, event], i: number) => (
                <ProfileAttribute
                    key={i}
                    category={category.toString()}
                    value={value.toString()}
                    isEditing={props.isEditing}
                    onChange={event}
                />
            ))}
            <Divider light />
            <Typography className={classes.heading} variant="h6">
                Contact Information
            </Typography>
            {[
                ["Email", email, setEmail],
                ["Cell Phone", cellPhone, setCellPhone],
                ["Home Phone", homePhone, setHomePhone],
                ["Student Number", studentNo, setStudentNo],
                ["Health Card Number", healthCardNo, setHealthCardNo]
            ].map(([category, value, event], i: number) => (
                <ProfileAttribute
                    key={i}
                    category={category.toString()}
                    value={value.toString()}
                    isEditing={props.isEditing}
                    onChange={event}
                />
            ))}
            <Divider light />
            <Typography className={classes.heading} variant="h6">
                Emergency Contact Information
            </Typography>
            {[
                ["Name", ecName, setEcName],
                ["Email", ecEmail, setEcEmail],
                ["Phone", ecPhone, setEcPhone]
            ].map(([category, value, event], i: number) => (
                <ProfileAttribute
                    key={i}
                    category={category.toString()}
                    value={value.toString()}
                    isEditing={props.isEditing}
                    onChange={event}
                />
            ))}
        </>
    );
}

interface ProfileAttributeProps {
    category: string;
    value: string;
    isEditing: boolean;
    onChange: any;
}

/**
 * Renders an attribute on an athlete page.
 * Two states: Editing and not editing.
 * @param props
 */
function ProfileAttribute(props: ProfileAttributeProps) {
    const inputStyle = {
        marginTop: "-2px",
        backgroundColor: "rgba(0, 33, 69, 0.05)",
        borderRadius: "5px",
        flexGrow: 1,
        marginBottom: "0px"
    };

    return (
        <div style={{ display: "flex", paddingBottom: "4px" }}>
            <Typography variant="body1" style={{ paddingRight: "4px", fontWeight: 400 }}>
                {props.category}:
            </Typography>
            {props.isEditing ? (
                props.category == "Birthdate" ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={inputStyle}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="birthdate"
                            value={new Date(props.value)}
                            onChange={(date: Date) => props.onChange(date.toDateString())}
                        />
                    </MuiPickersUtilsProvider>
                ) : (
                    <TextField
                        style={inputStyle}
                        value={props.value}
                        onChange={(event: any) => props.onChange(event.target.value)}
                    />
                )
            ) : (
                <Typography style={{ fontWeight: 300 }} variant="body1">
                    {props.value}
                </Typography>
            )}
            {props.category == "Weight" && (
                <Typography style={{ fontWeight: 300, paddingLeft: "4px" }} variant="body1">
                    kg
                </Typography>
            )}
            {props.category == "Height" && (
                <Typography style={{ fontWeight: 300, paddingLeft: "4px" }} variant="body1">
                    cm
                </Typography>
            )}
        </div>
    );
}
