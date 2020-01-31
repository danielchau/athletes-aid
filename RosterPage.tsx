import * as React from "react";
import { rosterManagementPageStyles } from "../styles/react/RosterManagementPageStyles";
import Paper from "@material-ui/core/Paper";
import { Athlete, Team, Injury } from "../util/types";
import Grid from "@material-ui/core/Grid";
import RosterDataTable from "./RosterDataTable";

interface RosterPageProps {
  teams: Team[];
  injury: Injury[];
  athlete: Athlete[];
}

export default function RosterPage(props: RosterPageProps) {
  const classes = rosterManagementPageStyles({});

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <RosterDataTable />
        </Paper>
      </Grid>
    </div>
  );
}
