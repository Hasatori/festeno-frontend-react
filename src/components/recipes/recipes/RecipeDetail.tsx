import React, {useEffect} from "react";
import "./RecipeDetail.css"
import {useLocation} from "react-router";
import {useHistory, useParams} from "react-router-dom";
import {MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem, MDBNavLink, MDBRow} from "mdbreact";
import star_filled from "../../../assets/images/common/star_filled.svg"
import star_empty from "../../../assets/images/common/star_empty.svg"
import {useMediaQuery} from "react-responsive";
import {Routes} from "../../../util/Constants";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loadFeed, loadRecipe} from "../../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../../redux/store/Store";
import {Recipe, RecipeOverview} from "../../../redux/reducer/GeneralReducer";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadRecipe: (id: string) => dispatch(loadRecipe(id))
    };
};

interface RecipeProps {
    loadRecipe: (id: string) => void;
    recipe: Recipe;
    loading: boolean
}

function mapStateToProps(state: AppState, props: RecipeProps) {
    return {
        recipe: state.generalState.recipe,
        loading: state.generalState.loading
    }
}


function RecipeDetail(props: RecipeProps) {
    const location = useLocation();
    const {id} = useParams<{ id: string }>();
    let history = useHistory();

    useEffect(() => {
        props.loadRecipe(id);
    }, []);

    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    if (props.loading) {
        return <div>Loading</div>
    } else {

        console.log(props.recipe);
        return (
            <div className={isSmallScreen ? "mx-2 px-0 pt-2 mt-5" : "mx-3 px-0 mt-2"}>
                <div className='d-flex flex-row justify-content-between'>
                    <div className='align-self-center'>
                        <div
                            className={'nav-button-active hover-pointer-cursor'}
                            onClick={(e) => {
                                history.goBack()
                            }}><MDBIcon icon="arrow-left"/></div>
                    </div>

                    <div className='d-flex'>
                        <MDBNavLink className='action-button ' to={Routes.CREATE_RECIPE}>Create new</MDBNavLink>
                    </div>
                </div>
                <div className='divider mt-3 mb-5'/>
                <div>
                    <MDBRow>
                        <MDBCol md={"12"} lg={"12"} xl={"8"} className="mt-3">
                            <MDBRow>
                                <MDBCol sm={"12"} lg={"8"} xl={"7"}> <img width="100%"
                                                                          src={`data:${props?.recipe?.layoutImage.type};base64,${props?.recipe?.layoutImage.data}`}/>
                                </MDBCol>
                                <MDBCol className="mt-4">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex flex-row">
                                            {new Array(5).fill("").map((value, index, array) => {
                                                return (<div className="ml-1"><img
                                                    src={index < props?.recipe?.rating ? star_filled : star_empty}
                                                    width={30}/></div>)
                                            })}
                                            <div className="ml-5 align-self-center">Review(9)</div>
                                        </div>
                                        <div className="h2-responsive">{props?.recipe?.title}</div>

                                        <div className="mt-3">

                                            {props?.recipe?.tags.map((tag) => {
                                                return (
                                                    <div
                                                        className="neutral-button color-secondary background-color-success">{tag}</div>
                                                )
                                            })}
                                        </div>

                                        <div className='d-flex flex-row mt-3'>
                                            <div><img
                                                src={`data:${props?.recipe?.author.profileImage.type};base64,${props?.recipe?.author.profileImage.data}`}
                                                className='recipe-author-image' alt="aligment"/></div>
                                            <div className='ml-2 d-flex flex-column '>
                                                <div><small className='hr-bold'>{props?.recipe?.author?.name}</small>
                                                </div>
                                                <div><small>2m</small></div>
                                            </div>
                                        </div>


                                    </div>

                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md={"12"} lg={"3"} className="mt-3">
                            <div className="d-flex flex-column">
                                <div className="h4-responsive mb-3">Ingredients</div>
                                <MDBRow>
                                    {props?.recipe?.ingredients?.map((ingredient) => {

                                        return (
                                            <>
                                                <MDBCol size={"12"}>{ingredient}</MDBCol>
                                            </>

                                        )

                                    })}

                                </MDBRow>
                            </div>

                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={"5"}>
                                <MDBListGroup>
                                    <MDBListGroupItem>
                                        <MDBRow className="d-flex flex-row">
                                            <MDBCol size="6">Portions</MDBCol>
                                            <MDBCol
                                                size="6">{props?.recipe?.portions}</MDBCol>
                                        </MDBRow>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        <MDBRow className="d-flex flex-row">
                                            <MDBCol size="12">Nutrients per portion</MDBCol>
                                        </MDBRow>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        <MDBRow className="d-flex flex-row">
                                            <MDBCol size="6">Energy</MDBCol>
                                            <MDBCol
                                                size="6">{props?.recipe?.energy.energyValue} {props?.recipe?.energy.energyUnit}</MDBCol>
                                        </MDBRow>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        <MDBRow className="d-flex flex-rwo">
                                            <MDBCol size="6">Carbohydrate</MDBCol>
                                            <MDBCol
                                                size="6">{props?.recipe?.carbohydrate.carbohydrateAmount} {props?.recipe?.carbohydrate.carbohydrateAmountUnit.toLowerCase()}</MDBCol>
                                        </MDBRow>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        <MDBRow className="d-flex flex-rwo">
                                            <MDBCol size="6">Protein</MDBCol>
                                            <MDBCol
                                                size="6">{props?.recipe?.protein.proteinAmount} {props?.recipe?.protein.proteinWeightUnit.toLowerCase()}</MDBCol>
                                        </MDBRow>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        <MDBRow className="d-flex flex-rwo">
                                            <MDBCol size="6">Fat</MDBCol>
                                            <MDBCol
                                                size="6">{props?.recipe?.fat.fatAmount} {props?.recipe?.fat.fatWeightUnit.toLowerCase()}</MDBCol>
                                        </MDBRow>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        <MDBRow className="d-flex flex-rwo">
                                            <MDBCol size="6">Fiber</MDBCol>
                                            <MDBCol
                                                size="6">{props?.recipe?.fiber.fiberValue} {props?.recipe?.fiber.fiberWeightUnit.toLowerCase()}</MDBCol>
                                        </MDBRow>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-3">
                        <MDBCol>

                            <div className="h4-responsive mb-3">Process</div>
                            {props?.recipe?.cookingProcedureSteps?.map((step, index) => {
                                return (
                                    <MDBRow className="d-flex flex-row ">
                                        <MDBCol size="1" className="text-center">{++index}</MDBCol>
                                        <MDBCol size="10"
                                                className="border-grey rounded text-center p-3 long-text">{step}</MDBCol>
                                    </MDBRow>
                                )
                            })}

                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)