import React from "react";
import { CircularProgress } from "@material-ui/core";

/**
 * Fetching Screen is a full container render of a circular progress spinner.
 */
export default function FetchingScreen() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center"
            }}
        >
            <CircularProgress size={60} />
        </div>
    );
}
