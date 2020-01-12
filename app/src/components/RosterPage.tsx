import * as React from "react";
import { rosterManagementPageStyles } from "../styles/react/RosterManagementPageStyles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
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
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null);
  const [setTeamName] = React.useState<string | null>(null);

  const handleTeamSelected = (event: React.ChangeEvent<{ value: string }>) => {
    let team = props.teams.filter(team => team.id === event.target.value);
    setSelectedTeam(team.length > 0 ? team[0] : null);
    setTeamName(null);
  };

  //  var  tableAnyways = RosterDataTable(selectedTeam);

  return (
    <div className={classes.root}>
      <Paper className={classes.introPaper}>
        <Typography className={classes.introText}>Select your team:</Typography>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelWidth={40}
            id="team-select"
            value={!!selectedTeam ? selectedTeam.id : ""}
            onChange={handleTeamSelected}
          >
            =99
            <MenuItem value="" disabled>
              Select the team to edit...
            </MenuItem>
            {props.teams.map((team: Team, i: number) => (
              <MenuItem key={i} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <RosterDataTable />
        </Paper>
      </Grid>
    </div>
  );
}
