import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ExcelToJSON } from "../util/excelUpload";

interface MyDropzoneProps {
    setNewAthletes: any;
}

/**
 * Dropzone is an area that files can be uploaded to.
 * File has to be of the format of the one that is available for download in the previous component.
 * @param props
 */
export default function MyDropzone(props: MyDropzoneProps) {
    /**
     * Transforms a file from the drag and drop to an array of athletesProfiles.
     */
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                const binaryStr = reader.result;
                let jsonObject = ExcelToJSON(binaryStr);
                let hasError = false;
                let athletes = jsonObject.map((entry: any, i: number) => {
                    if (
                        !!!entry["Athlete First Name*"] ||
                        !!!entry["Athlete Last Name*"] ||
                        !!!entry["Gender*"] ||
                        !!!entry["E-mail*"]
                    ) {
                        hasError = true;
                    }
                    return {
                        id: i,
                        profilePicture: "",
                        name: entry["Athlete First Name*"] + " " + entry["Athlete Last Name*"],
                        birthdate: new Date(entry["Day Of Birthday yyyy-mm-dd"]).toDateString(),
                        schoolYear: entry["School Year"],
                        gender: entry["Gender*"],
                        weight: entry["Weight in Lbs"],
                        height: entry["Height in Inches"],
                        email: entry["E-mail*"],
                        cellPhone: entry["Cell Phone"],
                        homePhone: entry["Home Phone"],
                        healthCardNumber: "",
                        emergencyContact: {
                            id: "e" + i,
                            name: entry["Emergency Contact Name"],
                            phone: entry["Emergency Contact Phone"],
                            email: entry["Emergency Contact Email"]
                        },
                        files: [],
                        injuries: []
                    };
                });
                if (hasError) {
                    alert("Please fill out all the required columns in the spreadsheet.");
                } else {
                    props.setNewAthletes(athletes);
                }
            };
            reader.readAsBinaryString(file);
        });
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div
            style={{
                height: "calc(100% - 16px)",
                display: "flex",
                flexGrow: 1,
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                border: "1px dashed #F2A71E",
                margin: "8px",
                flexDirection: "column"
            }}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <CloudUploadIcon style={{ width: "2em", height: "2em" }}></CloudUploadIcon>
            <Typography>Drag 'n' drop some files here, or click to select files</Typography>
        </div>
    );
}
