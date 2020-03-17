import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography
} from "@material-ui/core";
import {
    injuriesPageName,
    rosterManagementPageName,
    userManagementPageName,
    rosterPageName,
    profilePageName
} from "../constants/constants";

interface HelpDialogProps {
    open: boolean;
    setOpen: any;
    page: string;
}

export default function HelpDialog(props: HelpDialogProps) {
    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} scroll="paper">
            <DialogTitle id="scroll-dialog-title">{props.page + " Page Help"}</DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                    <Typography>
                        {props.page == injuriesPageName && (
                            <>
                                <b>Welcome to Athlete’s Aid!</b>
                                <br />
                                <br />
                                The Home Page is where you’ll find all the necessary information
                                regarding your information or the information of the teams you
                                manage.
                                <br />
                                <br />
                                This screen contains information related to your currently selected
                                team’s (team selection on the bottom of the left navigation panel)
                                athletes.
                                <br />
                                <br />
                                The first section is for <b>date range selection</b>. Here you will
                                have the opportunity to select a starting and ending date to find
                                athlete injuries for a team. Once you have specified your date
                                range, click on the ‘Get Injuries’ button to get your results. To
                                the right of the ‘Get Injuries’ button is a filter that either shows
                                inactive injuries or hides them.
                                <br />
                                <br />
                                Below the date range section are 4 boxes that display information
                                about the injuries. The statistics are as follows:
                                <ul>
                                    <li>
                                        <u>Total Filed Reports:</u> The total number of injuries
                                        within the date range (including inactive injuries)
                                    </li>
                                    <li>
                                        <u>Total Active Reports:</u> The total number of injuries
                                        within the date range (excluding inactive injuries)
                                    </li>
                                    <li>
                                        <u>Average Severity:</u> Average severity of the injuries
                                        displayed in the data table (changes in regard to the
                                        active/inactive filter)
                                    </li>
                                    <li>
                                        <u>Players Out:</u> The amount of players that are ‘Out’ due
                                        to an injury (changes in regard to the active/inactive
                                        filter)
                                    </li>
                                </ul>
                                There is an Injury Breakdown visualization that displays the{" "}
                                <b>locations</b> of all the filtered injuries.
                                <br />
                                <br />
                                At the bottom of the page is a <b>data table</b> that contains
                                information on the injuries. By default, it is sorted by ‘Status’
                                but can be changed to sort by any column. Clicking on the checkboxes
                                beside the injuries will allow you to export those injuries to a
                                spreadsheet (in .csv format). Clicking on the row will bring up a
                                dialog from the right hand side that displays for detailed
                                information about the injury.
                                <br />
                                <br />
                                The injury dialog (only available to trainers and administrators) is
                                where trainers or administrators can <b>view information</b> for an
                                injury and <b>submit notes</b> related to them. To close the dialog,
                                either press on the icon on the top left or click anywhere outside
                                of the dialog. To <b>edit an injury</b>, click on the edit icon on
                                the top right and follow the instructions until prompted that the
                                injury has been updated.
                            </>
                        )}
                        {props.page == rosterManagementPageName && (
                            <>
                                The Roster Management Page is where users can create new teams or
                                edit existing ones.
                                <br />
                                <br />
                                At the top of the page is a prompt to either select an existing team
                                to <b>edit</b> (from a dropdown) or <b>create a new team</b>.
                                <br />
                                <br />
                                To create a new team, provide a ‘Team Name’ and ‘Season’ and click
                                the ‘Create Button’.
                                <br />
                                <br />
                                When editing an existing team, the{" "}
                                <b>existing roster will be shown on the left</b>. This list is{" "}
                                <b>searchable</b> through a search bar. Clicking on the checkbox
                                next to any existing roster member will make them available to
                                delete off of the team.{" "}
                                <i>
                                    Note that deleting an athlete off a team will not get rid of
                                    their injuries logged while they were on the team.
                                </i>
                                <br />
                                <br />
                                On the right side, is the athlete addition section where you can
                                either choose ‘Bulk Addition’ or ‘Individual Addition’.
                                <br />
                                <br />
                                Through ‘Individual Addition’, you can search from all the athletes
                                in the database and select any number of athletes to add to the
                                team.
                                <br />
                                <br />
                                To use ‘Bulk Addition’, first <b>download</b> the spreadsheet
                                provided by the link and fill out all of the required fields.
                                Failure to fill out required fields will result in an unsuccessful
                                upload. Once you <b>upload</b> a filled-out spreadsheet, it will add
                                all of the athletes to a table below displaying the information in
                                the spreadsheet. Each athlete will have one of three ‘Status’ which
                                are explained by hovering over the help icon beside the column name.
                                Once all of the athletes are present in the database, you can click
                                on the ‘Add Athletes’ button to <b>add</b> them to the team.
                            </>
                        )}
                        {props.page == userManagementPageName && (
                            <>
                                The user management page is where users can edit the roles of all of
                                the users in the application. Only administrators have access to
                                this page.
                                <br />
                                <br />
                                To change a role of a user, search for them using the search box and
                                then press on the dropdown menu on the right to set their new role
                                type.
                            </>
                        )}
                        {props.page == rosterPageName && (
                            <>
                                The roster page is where users can access the profiles of athletes
                                on the selected team.
                                <br />
                                <br />
                                The list has recent information on the athletes (if applicable) and
                                shows the details of the last injury they incurred. It also shows it
                                that injury is still active or not.
                                <br />
                                <br />
                                To go to an athlete’s profile, simply click on their name in the
                                roster list.
                            </>
                        )}
                        {props.page == profilePageName && (
                            <>
                                The profile page is where you can see information on yourself or
                                information on another user.
                                <br />
                                <br />
                                The page is split up into two sections: user information and other
                                information.
                                <br />
                                <br />
                                The <b>user information</b> contains all relevant information about
                                a user. To edit the information (only administrators have access to
                                this), click on the yellow edit button on the top left and fill in
                                the new information before clicking on the blue checkmark on the top
                                left.
                                <br />
                                <br />
                                The <b>other information</b> section includes a files and forms area
                                where administrators and trainers can upload and download files
                                related to the player. These can be any format as long as they are
                                under 5mb in size. There is also a section that displays all of the
                                injuries related to an athlete. Clicking on an injury will bring up
                                the injury dialog (only viewable to trainers and administrators).
                            </>
                        )}
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
