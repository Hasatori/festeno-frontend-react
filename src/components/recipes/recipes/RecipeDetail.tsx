import React, {useEffect, useState} from "react";
import "./RecipeDetail.css"
import {useLocation} from "react-router";
import {useHistory, useParams} from "react-router-dom";
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCol,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBNavLink,
    MDBRow, MDBTooltip,
    MDBView
} from "mdbreact";
import {useMediaQuery} from "react-responsive";
import {Routes} from "../../../util/Constants";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addToFavourite, loadRecipe, removeFromFavourite} from "../../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../../redux/store/Store";
import {Recipe, RecipeOverview} from "../../../redux/reducer/GeneralReducer";
import {Image} from "../../App";
import {LazyLoadImage} from "react-lazy-load-image-component";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadRecipe: (id: string) => dispatch(loadRecipe(id)),
        addToFavourite: (recipeOverview: RecipeOverview) => dispatch(addToFavourite(recipeOverview)),
        removeFromFavourite: (recipeOverview: RecipeOverview) => dispatch(removeFromFavourite(recipeOverview))
    };
};

interface RecipeProps {
    loadRecipe: (id: string) => void;
    recipe: Recipe;
    loading: boolean;
    addToFavourite: (recipeOverview: RecipeOverview) => void
    removeFromFavourite: (recipeOverview: RecipeOverview) => void
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
    const [recipesImages,setRecipeImages] = useState<Array<Image>>([])

    useEffect(() => {
        props.loadRecipe(id);
    }, []);

    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    if (props.loading) {
        return <div>Loading</div>
    } else {
        return (
            <div className={isSmallScreen ? "mx-2 px-0 pt-2 mt-5" : "mx-3 px-0 mt-2"}>
                <div className='d-flex flex-row justify-content-between'>
                    <div className='align-self-center'>
                        <div
                            className={'nav-button-active hover-pointer-cursor'}
                            onClick={(e) => {
                                if (history.length <= 2) {
                                    history.push(Routes.EXPLORE)
                                } else {
                                    history.goBack();
                                }
                            }}><MDBIcon icon="arrow-left"/></div>
                    </div>
                </div>
                <div className='divider mt-3 mb-5'/>
                <div>
                    <MDBRow>
                        <MDBCol md={"12"} lg={"12"} xl={"8"} className="mt-3">
                            <MDBRow>

                                <MDBCol sm={"12"} lg={"8"} xl={"7"}>
                                    {props?.recipe?.recipeImages?.length===1?
                                    <MDBView >
                                        <LazyLoadImage
                                            placeholderSrc={'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'}
                                            effect="blur"
                                            alt={"Profile image"}
                                            src={`${process.env.REACT_APP_REST_API_URL}/recipes/recipe-image?id=${props?.recipe?.recipeImages[0].id}`}
                                            width='100%'
                                            height='100%'
                                        >
                                        </LazyLoadImage>
                                        <div className='favourite hover-pointer-cursor z-depth-1' onClick={() => {
                                            if (!props.recipe.isInFavourites) {
                                                props.addToFavourite(props.recipe);
                                            } else {props.removeFromFavourite(props.recipe);}
                                        }}>
                                                {props.recipe?.isInFavourites ?
                                                    <MDBIcon icon="heart" size="2x" className='mt-3'/> :
                                                    <MDBIcon far icon="heart"  size="2x" className='mt-3'/>
                                                }
                                        </div>
                                    </MDBView>
                                    :
                                    <MDBCarousel
                                        activeItem={0}
                                        length={props?.recipe?.recipeImages?.length-1}
                                        showControls={props?.recipe?.recipeImages?.length-1 > 0}
                                        showIndicators={true}
                                        className="z-depth-1"
                                    >
                                        <MDBCarouselInner>
                                            {props?.recipe?.recipeImages?.map((image, index) => {
                                                return (
                                                    <MDBCarouselItem itemId={index++}>
                                                        <MDBView >
                                                            <LazyLoadImage
                                                                placeholderSrc={'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'}
                                                                effect="blur"
                                                                alt={"Profile image"}
                                                                src={`${process.env.REACT_APP_REST_API_URL}/recipes/recipe-image?id=${image.id}`}
                                                                width='100%'
                                                                height='100%'
                                                            />
                                                        </MDBView>
                                                    </MDBCarouselItem>
                                                )

                                            })}
                                        </MDBCarouselInner>
                                    </MDBCarousel>
                                }

                                </MDBCol>

                                <MDBCol className="mt-4">
                                    <div className="d-flex flex-column">
                                        <div className="h2-responsive">{props?.recipe?.title}</div>


                                        <div>
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
                                                            size="6">{props?.recipe?.energy?.energyValue} {props?.recipe?.energy?.energyUnit}</MDBCol>
                                                    </MDBRow>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem>
                                                    <MDBRow className="d-flex flex-rwo">
                                                        <MDBCol size="6">Carbohydrate</MDBCol>
                                                        <MDBCol
                                                            size="6">{props?.recipe?.carbohydrate?.carbohydrateAmount} {props?.recipe?.carbohydrate?.carbohydrateAmountUnit.toLowerCase()}</MDBCol>
                                                    </MDBRow>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem>
                                                    <MDBRow className="d-flex flex-rwo">
                                                        <MDBCol size="6">Protein</MDBCol>
                                                        <MDBCol
                                                            size="6">{props?.recipe?.protein?.proteinAmount} {props?.recipe?.protein?.proteinWeightUnit.toLowerCase()}</MDBCol>
                                                    </MDBRow>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem>
                                                    <MDBRow className="d-flex flex-rwo">
                                                        <MDBCol size="6">Fat</MDBCol>
                                                        <MDBCol
                                                            size="6">{props?.recipe?.fat?.fatAmount} {props?.recipe?.fat?.fatWeightUnit.toLowerCase()}</MDBCol>
                                                    </MDBRow>
                                                </MDBListGroupItem>
                                                <MDBListGroupItem>
                                                    <MDBRow className="d-flex flex-rwo">
                                                        <MDBCol size="6">Fiber</MDBCol>
                                                        <MDBCol
                                                            size="6">{props?.recipe?.fiber?.fiberValue} {props?.recipe?.fiber?.fiberWeightUnit.toLowerCase()}</MDBCol>
                                                    </MDBRow>
                                                </MDBListGroupItem>
                                            </MDBListGroup>
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md={"12"} lg={"3"} className="mt-3">
                            <div className="d-flex flex-column">
                                <div className="h4-responsive mb-3">Ingredients for {props?.recipe?.portions} {props?.recipe?.portions==1?'portion':"portions"}</div>
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

                    <MDBRow className="mt-3">
                        <MDBCol>

                            <div className="h4-responsive mb-3">Cooking process</div>
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
