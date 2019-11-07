import { connect } from "react-redux";
import { getAthleteInjuries } from "../actions/InjuriesAction";
import InjuriesPage from "../components/InjuriesPage";
import { AppState } from "..";

const mapStateToProps = (state: AppState) => ({
    athleteInjuries: state.injuriesReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    getAthleteInjuries: (startDate: string, endDate: string, team: string) =>
        dispatch(getAthleteInjuries(startDate, endDate, team))
});

const InjuriesPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InjuriesPage);

export default InjuriesPageContainer;
