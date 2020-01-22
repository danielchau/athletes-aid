import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ExcelToJSON } from "../util/excelUpload";

interface MyDropzoneProps {
    setNewAthletes: any;
}

export default function MyDropzone(props: MyDropzoneProps) {
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                let jsonObject = ExcelToJSON(binaryStr);
                let athletes = jsonObject.map((entry: any, i: number) => {
                    return {
                        id: i,
                        profilePicture: "",
                        name:
                            entry["Athlete First Name*"] +
                            " " +
                            entry["Athlete Last Name*"],
                        birthdate: entry["Day Of Birthday yyyy-mm-dd"],
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
                            cellPhone: entry["Emergency Contact Cell Phone"],
                            homePhone: entry["Emergency Contact Home Phone"],
                            email: entry["Emergency Contact Email"]
                        },
                        files: [],
                        injuries: []
                    };
                });
                props.setNewAthletes(athletes);
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
            <CloudUploadIcon
                style={{ width: "4em", height: "4em" }}
            ></CloudUploadIcon>
            <Typography>
                Drag 'n' drop some files here, or click to select files
            </Typography>
        </div>
    );
}
