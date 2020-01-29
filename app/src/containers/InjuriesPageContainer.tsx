import { connect } from "react-redux";
import {
    fetchAthleteInjuries,
    setInjuriesStartingDate,
    setInjuriesEndingDate
} from "../actions/InjuriesAction";
import InjuriesPage from "../components/InjuriesPage";
import { AppState } from "..";

const mapStateToProps = (state: AppState) => ({
    athleteInjuries: state.injuriesReducer,
    startingDate: state.startingDateReducer,
    endingDate: state.endingDateReducer,
    selectedTeam: state.selectedTeamReducer,
    state: state.navigationPanelReducer,
    currentUser: state.currentUserReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) =>
        dispatch(fetchAthleteInjuries(startDate, endDate, team)),
    setStartingDate: (startingDate: Date) => dispatch(setInjuriesStartingDate(startingDate)),
    setEndingDate: (endingDate: Date) => dispatch(setInjuriesEndingDate(endingDate))
});

const InjuriesPageContainer = connect(mapStateToProps, mapDispatchToProps)(InjuriesPage);

export default InjuriesPageContainer;
