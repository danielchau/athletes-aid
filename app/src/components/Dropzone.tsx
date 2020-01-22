import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { ExcelToJSON } from "../util/excelUpload";

export default function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                console.log(ExcelToJSON(binaryStr));
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
