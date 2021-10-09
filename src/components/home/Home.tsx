import React, {useEffect} from 'react';
import './Home.css';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import heart_empty from "../../assets/images/common/heart_empty.svg";
import heart_filled from "../../assets/images/common/heart_filled.svg";
import star_empty from "../../assets/images/common/star_empty.svg";
import star_filled from "../../assets/images/common/star_filled.svg";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loadFeed} from "../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../redux/store/Store";
import {Recipe} from "../../redux/reducer/GeneralReducer";
import {Routes} from "../../util/Constants";

interface HomeProps {
    loadFeed: () => void;
    feed: Array<Recipe>;
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
            <div className="d-flex flex-center mt-5"><h1>Recommendations</h1></div>
            <div
                className={'d-flex flex-column pt-4 pl-2'}>
                <div className='flex-column mx-2'>
                    {
                        <MDBContainer className='mt-3'>
                            <MDBRow>
                                {props.feed.map((recipe: Recipe, index) => {
                                    return (
                                        <MDBCol md='6' xl='3' sm="12" className='mt-5 px-4'>
                                            <Link to={`${Routes.RECIPE}/adasdad54536s4fg65ds4fa5s4f`}>
                                                <div className='d-flex flex-column recipe-wrapper z-depth-1'>

                                                    <div><img className='recipe-image'
                                                              src={`data:${recipe.layoutImage.type};base64,${recipe.layoutImage.data}`}/>
                                                    </div>
                                                    <div className='recipe-footer d-flex flex-column'>
                                                        <div className="mb-3 h5-responsive"><strong>{recipe.title}</strong></div>
                                                        <div
                                                            className="d-flex flex-column justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div className="mr-1">
                                                                    <img
                                                                        src={`data:${recipe.author.profileImage.type};base64,${recipe.author.profileImage.data}`}
                                                                        className='recipe-author-image'
                                                                        alt="aligment"/>
                                                                </div>
                                                                <div className="d-flex flex-column">
                                                                    <small>{recipe.author.name}</small>
                                                                    <small>
                                                                        2m
                                                                    </small>
                                                                </div>
                                                            </div>

                                                            <div className="mt-3 d-flex flex-row align-self-end">
                                                                <div className="mr-1">
                                                                    {new Array(recipe.rating).fill(0).map(() => {
                                                                        return <img
                                                                            src={star_filled}
                                                                            width={starWidth}/>
                                                                    })}
                                                                    {new Array(5 - recipe.rating).fill(0).map(() => {
                                                                        return <img
                                                                            src={star_empty}
                                                                            width={starWidth}/>
                                                                    })}
                                                                </div>
                                                                <div className="ml-1"><img
                                                                    src={index % 2 == 0 ? heart_empty : heart_filled}
                                                                    width={25}/></div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </Link>
                                        </MDBCol>
                                    )
                                })}
                            </MDBRow>
                        </MDBContainer>

                    }

                </div>
            </div>
        </div>


    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
