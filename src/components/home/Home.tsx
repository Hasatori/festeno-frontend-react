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
import {MDBNavLink, MDBPageItem, MDBPageNav, MDBPagination} from "mdbreact";
import {Link, useParams} from "react-router-dom";
import {Routes} from "../../util/Constants";
import home_active from "../../assets/images/common/home-active.svg";
import home from "../../assets/images/common/home.svg";


interface HomeProps {
    loadFeed: (page: number) => void;
    feed: Array<RecipeOverview>;
    loading: boolean
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadFeed: (page: number) => dispatch(loadFeed(page))
    };
};

function mapStateToProps(state: AppState, props: HomeProps) {
    return {
        feed: state.generalState.feed,
        loading: state.generalState.loading
    }
}

function Home(props: HomeProps) {
    const numberOfPages = 5;
    let {page} = useParams<{ page: string }>();
    if (typeof page === 'undefined') {
        page = '1';
    }
    const rows = new Array(6).fill(null);
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    const starWidth = 25;

    useEffect(() => {
        props.loadFeed(Number(page));
    }, [page])
    return (
        <div>
            <div className="d-flex flex-center mt-5 p-2"><h1>Recommendations</h1></div>
            <div
                className={'d-flex flex-column pt-4 pl-2'}>
                <RecipesGrid recipes={props.feed} loading={props.loading} loadingMessage={"loading"}/>
                <MDBPagination className="mb-5">

                    <MDBPageItem disabled={page === '1'}>
                        <Link to={`${Routes.HOME}/${Number(page) - 1}`}>

                            <MDBPageNav aria-label="Previous">Previous
                            </MDBPageNav>
                        </Link>
                    </MDBPageItem>

                    {new Array(5).fill("").map(((value, index) => {
                        index = ++index;

                        return (

                            <Link to={`${Routes.HOME}/${index}`}>
                                <MDBPageItem active={index.toString() == page}>
                                    <MDBPageNav>{index}
                                    </MDBPageNav>
                                </MDBPageItem>
                            </Link>
                        )
                    }))}
                    <MDBPageItem disabled={page === numberOfPages.toString()}>
                        <Link to={`${Routes.HOME}/${Number(page) + 1}`}>

                            <MDBPageNav aria-label="Previous">Next
                            </MDBPageNav>
                        </Link>
                    </MDBPageItem>

                </MDBPagination>
            </div>
        </div>


    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
