import React, {useEffect} from 'react';
import './Home.css';
import {useMediaQuery} from "react-responsive";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loadFeed} from "../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../redux/store/Store";
import {RecipeOverview} from "../../redux/reducer/GeneralReducer";
import RecipesGrid from "../recipes/RecipesGrid";


interface HomeProps {
    loadFeed: () => void;
    feed: Array<RecipeOverview>;
    loading: boolean
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadFeed: () => dispatch(loadFeed())
    };
};

function mapStateToProps(state: AppState, props: HomeProps) {
    return {
        feed: state.generalState.feed,
        loading: state.generalState.loading
    }
}

function Home(props: HomeProps) {
    const rows = new Array(6).fill(null);
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    const starWidth = 25;

    useEffect(() => {
        props.loadFeed();
    }, [])
    return (
        <div>
            <div className="d-flex flex-center mt-5 p-2"><h1>Recommendations</h1></div>
            <div
                className={'d-flex flex-column pt-4 pl-2'}>
                <RecipesGrid recipes={props.feed} loading={props.loading} loadingMessage={"loading"}/>
            </div>
        </div>


    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
