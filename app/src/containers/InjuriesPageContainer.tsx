import { connect } from "react-redux";
import {
    getAthleteInjuries,
    setInjuriesStartingDate,
    setInjuriesEndingDate
} from "../actions/InjuriesAction";
import InjuriesPage from "../components/InjuriesPage";
import { AppState } from "..";

const mapStateToProps = (state: AppState) => ({
    athleteInjuries: state.injuriesReducer,
    startingDate: state.startingDateReducer,
    endingDate: state.endingDateReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) =>
        dispatch(getAthleteInjuries(startDate, endDate, team)),
    setStartingDate: (startingDate: Date) =>
        dispatch(setInjuriesStartingDate(startingDate)),
    setEndingDate: (endingDate: Date) =>
        dispatch(setInjuriesEndingDate(endingDate))
});

const InjuriesPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InjuriesPage);

export default InjuriesPageContainer;
