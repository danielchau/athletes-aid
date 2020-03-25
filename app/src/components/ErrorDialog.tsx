import React from "React";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography
} from "@material-ui/core";

interface ErrorDialogProps {
    open: boolean;
    setOpen: any;
}

export default function ErrorDialog(props: ErrorDialogProps) {
    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} scroll="paper">
            <DialogTitle id="scroll-dialog-title">Sorry -- Server Error</DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                    <Typography>Please try again later.</Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
