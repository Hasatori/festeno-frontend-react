import React, {useEffect, useState} from 'react';
import './Home.css';
import {useMediaQuery} from "react-responsive";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loadFeed} from "../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../redux/store/Store";
import {RecipeOverview, RecommendedRecipe} from "../../redux/reducer/GeneralReducer";
import RecipesGrid from "../recipes/RecipesGrid";
import {MDBNavLink, MDBPageItem, MDBPageNav, MDBPagination} from "mdbreact";
import {Link, useParams} from "react-router-dom";
import {Routes} from "../../util/Constants";
import home_active from "../../assets/images/common/home-active.svg";
import home from "../../assets/images/common/home.svg";
import LoadingIndicator from "../loading/LoadingIndicator";
import {CircleLoader} from "react-spinners";
import {User} from "../App";


interface HomeProps {
    loadFeed: (page: number) => void;
    feed: Array<RecommendedRecipe>;
    loading: boolean
    user:User
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadFeed: (page: number) => dispatch(loadFeed(page))
    };
};

function mapStateToProps(state: AppState, props: HomeProps) {
    return {
        feed: state.generalState.feed,
        loading: state.generalState.loading,
        user: state.userState.currentUser,
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

    const [recipesByGroup,setRecipesByGroup] = useState(new Map<string,Array<RecipeOverview>>());

    useEffect(() => {
        props.loadFeed(Number(page) - 1);

    }, [page])

    useEffect(() => {
        let map = new Map<string, Array<RecipeOverview>>();

        for (let recommendedRecipe of props.feed) {
            let array = map.get(recommendedRecipe.groupName);
            if (typeof array === 'undefined') {
                array = [];
                map = map.set(recommendedRecipe.groupName, array);

            }
            array.push(recommendedRecipe.recipe);
        }
        setRecipesByGroup(map);
    }, [props.feed])


    return (
        <div>
            <div className="d-flex flex-center mt-5 p-2"><h1>{props?.user?.recipesPreferences?.mainDietType.toLowerCase()} recipes for you</h1></div>
            <div
                className={'d-flex flex-column pt-4 pl-2'}>
                {recipesByGroup.size===0?
                    <div>
                        <CircleLoader
                            css={`margin:auto;`}
                            size={75}
                            color={"#123abc"}
                            loading={props.loading}
                        />
                        <h2 className="text-center">Loading recipes</h2>
                    </div>
                    :null}
                {Array.from(recipesByGroup.entries()).map(([groupName,recipes])=>{
                    return (
                        <RecipesGrid recipes={recipes} heading={groupName}/>
                    )
                })}
                {/*<MDBPagination className="mb-5">

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

                </MDBPagination>*/}
            </div>
        </div>


    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
