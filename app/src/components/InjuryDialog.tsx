import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { injuryDialogStyles } from "../styles/react/InjuryDialogStyles";
import { Injury } from "../util/types";

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="left" ref={ref} {...props} />;
    }
);

interface InjuryDialogProps {
    injury: Injury;
    injuryOpen: boolean;
    handleInjuryClose: any;
}

export default function InjuryDialog(props: InjuryDialogProps) {
    const classes = injuryDialogStyles({});

    return (
        <div>
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                BackdropProps={{
                    style: {
                        backgroundColor: "transparent"
                    }
                }}
                fullWidth
                open={props.injuryOpen}
                onClose={props.handleInjuryClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleInjuryClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.injury.athleteName}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </div>
    );
}
