import React, {useEffect, useState} from "react";
import "./RecipeDetail.css"
import {useLocation} from "react-router";
import {useHistory, useParams} from "react-router-dom";
import {
    MDBBtn,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCol,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBView
} from "mdbreact";
import {MDBBadge, MDBInput, MDBPopover, MDBTextArea, MDBTooltip} from 'mdb-react-ui-kit';
import {useMediaQuery} from "react-responsive";
import {Routes} from "../../../util/Constants";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {
    addReview,
    addToFavourite, dismissFailure, failureActionCreator, infoActionCreator,
    loadRecipe,
    NewRecipeReview,
    removeFromFavourite
} from "../../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../../redux/store/Store";
import {Recipe, RecipeOverview, RecipeReview} from "../../../redux/reducer/GeneralReducer";
import {Image, User} from "../../App";
import {LazyLoadImage} from "react-lazy-load-image-component";
import star_empty from "../../../assets/images/common/star_empty.svg";
import star_filled from "../../../assets/images/common/star_filled.svg";
import {store} from "../../../index";
import i18next from "i18next";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadRecipe: (id: string) => dispatch(loadRecipe(id)),
        addToFavourite: (recipeOverview: RecipeOverview) => dispatch(addToFavourite(recipeOverview)),
        removeFromFavourite: (recipeOverview: RecipeOverview) => dispatch(removeFromFavourite(recipeOverview)),
        review: (newRecipeReview: NewRecipeReview) => dispatch(addReview(newRecipeReview))
    };
};

interface RecipeProps {
    loadRecipe: (id: string) => void;
    recipe: Recipe;
    loading: boolean;
    addToFavourite: (recipeOverview: RecipeOverview) => void
    removeFromFavourite: (recipeOverview: RecipeOverview) => void
    review: (newRecipeReview: NewRecipeReview) => void,
    currentUser: User,
    loggedIn:boolean
}

function mapStateToProps(state: AppState, props: RecipeProps) {
    return {
        recipe: state.generalState.recipe,
        loading: state.generalState.loading,
        currentUser: state.userState.currentUser,
        loggedIn: state.userState.loggedIn
    }
}

function RecipeDetail(props: RecipeProps) {
    const location = useLocation();
    const {id} = useParams<{ id: string }>();
    let history = useHistory();
    const [recipesImages, setRecipeImages] = useState<Array<Image>>([])
    const [ratingStars, setRatingStart] = useState(new Array(5).fill({filled: false}));
    const [rating, setRating] = useState<number | null>(null);
    const [reviewText, setReviewText] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [currentUserReview,setCurrentUserReview] = useState<RecipeReview>()
    const [editComment, setEditComment] = useState(false);
    useEffect(() => {
        props.loadRecipe(id);
    }, []);

    useEffect(()=>{
        setCurrentUserReview(props?.recipe?.recipeReviews?.find((review) => review.authorName == props.currentUser.name));
    },[props.recipe]);

    useEffect(()=>{
        setRating(currentUserReview?.rating??null);
        setReviewText(currentUserReview?.text??"");
        setRatingStart(new Array(5).fill({filled: false},currentUserReview?.rating?? 0,5).fill({filled: true},0,currentUserReview?.rating??0))
    },[currentUserReview])

    function submitReview() {
        setSubmitted(true);
        if (!props.loggedIn){
            store.dispatch(infoActionCreator("You need to be logged in order to review a recipe."))
            history.push(Routes.LOGIN);
            return;
        }
        if (reviewText === currentUserReview?.text && rating === currentUserReview?.rating){
            setEditComment(false);
            setSubmitted(true);
            return;
        }
        if (reviewText !== "" && rating !== null) {
            setEditComment(false);

            props.review({
                authorId: props.currentUser.id,
                rating: rating ?? 1,
                text: reviewText,
                recipeId: Number(props.recipe.id),
                authorName:props.currentUser.name,
                timestamp:new Date()
            })
        }
    }

    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    if (props.loading) {
        return <div>Loading</div>
    } else {
        return (
            <div className={isSmallScreen ? "mx-2 px-0 pt-2 mt-5 mb-3" : "mx-3 px-0 mt-2 mb-3"}>
                <div className='d-flex flex-row'>
                    <div className='align-self-center flex-shrink-0'>
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
                    <div className="h1-responsive align-self-center text-center flex-grow-1">
                        <b>{props?.recipe?.title}</b></div>
                </div>
                <div className='divider mt-3 mb-5'/>
                <div>
                    <MDBCol md={"12"} lg={"12"} xl={"8"}>
                        <MDBRow>
                            <MDBCol className="mt-3">
                                <MDBRow>
                                    <MDBCol md={"12"} lg={"6"}>
                                        {props?.recipe?.recipeImages?.length === 1 ?
                                            <MDBView>
                                                <LazyLoadImage
                                                    placeholderSrc={'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'}
                                                    effect="blur"
                                                    alt={"Profile image"}
                                                    src={`${process.env.REACT_APP_REST_API_URL}/recipes/recipe-image?id=${props?.recipe?.recipeImages[0].id}`}
                                                    width='100%'
                                                    height='100%'
                                                >
                                                </LazyLoadImage>
                                                <div className='favourite hover-pointer-cursor z-depth-1'
                                                     onClick={() => {
                                                         if (!props.recipe.isInFavourites) {
                                                             props.addToFavourite(props.recipe);
                                                         } else {
                                                             props.removeFromFavourite(props.recipe);
                                                         }
                                                     }}>
                                                    {props.recipe?.isInFavourites ?
                                                        <MDBIcon icon="heart" size="2x" className='mt-3'/> :
                                                        <MDBIcon far icon="heart" size="2x" className='mt-3'/>
                                                    }
                                                </div>
                                            </MDBView>
                                            :
                                            <MDBCarousel
                                                activeItem={0}
                                                length={props?.recipe?.recipeImages?.length - 1}
                                                showControls={props?.recipe?.recipeImages?.length - 1 > 0}
                                                showIndicators={true}
                                            >
                                                <MDBCarouselInner>
                                                    {props?.recipe?.recipeImages?.map((image, index) => {
                                                        return (
                                                            <>
                                                                <MDBCarouselItem itemId={index++}>
                                                                    <MDBView>
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
                                                                <div className='favourite hover-pointer-cursor'
                                                                     onClick={() => {
                                                                         if (!props.recipe.isInFavourites) {
                                                                             props.addToFavourite(props.recipe);
                                                                         } else {
                                                                             props.removeFromFavourite(props.recipe);
                                                                         }
                                                                     }}>
                                                                    {props.recipe?.isInFavourites ?
                                                                        <MDBIcon icon="heart" size="2x"
                                                                                 className='mt-3'/> :
                                                                        <MDBIcon far icon="heart" size="2x"
                                                                                 className='mt-3'/>
                                                                    }
                                                                </div>
                                                            </>
                                                        )

                                                    })}
                                                </MDBCarouselInner>
                                            </MDBCarousel>
                                        }

                                    </MDBCol>
                                    <MDBCol md={"12"} lg={"6"} xl={"4"} className="mt-4">
                                        <div className="d-flex flex-column">
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
                        </MDBRow>

                        <MDBRow>
                            <MDBCol className="mt-3">
                                <div className="d-flex flex-column">
                                    <div className="h4-responsive mb-3 text-bold"><b>Ingredients
                                        for {props?.recipe?.portions} {props?.recipe?.portions == 1 ? 'portion' : "portions"}</b>
                                    </div>
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
                        <div className='divider'/>
                        <MDBRow className="mt-3">
                            <MDBCol className="mt-3">
                                <div className="h4-responsive mb-3"><b>Cooking process</b></div>
                                {props?.recipe?.cookingProcedureSteps?.map((step, index) => {
                                    return (
                                        <MDBRow className="d-flex flex-row ">
                                            <MDBCol size="1" className="text-center">{++index}</MDBCol>
                                            <MDBCol size="10"
                                                    className="border-very-light-grey rounded text-center p-3 long-text">{step}</MDBCol>
                                        </MDBRow>
                                    )
                                })}

                            </MDBCol>
                        </MDBRow>
                        <div className='divider'/>
                        <MDBRow className="mt-5">
                            <MDBCol>
                                <div className="h4-responsive mb-3"><b>Reviews</b></div>
                                {currentUserReview === undefined ?
                                    <>

                                         <div className="d-flex flex-column">
                                            <MDBTextArea label='review text...'
                                                         className={submitted && reviewText === "" ? 'reviews-text-area is-invalid' : 'reviews-text-area'}
                                                         rows={4}
                                                         onChange={(event) => setReviewText(event.target.value)}/>
                                            {submitted && reviewText === "" ?
                                                <small className="error-color">Please fill review text</small> : null}
                                            <div className="d-flex flex-row mt-2">
                                                {ratingStars.map((value, index) => {
                                                    return (
                                                        <img width={30} className="hover-pointer-cursor"
                                                             src={value.filled ? star_filled : star_empty}
                                                             onMouseEnter={() => {
                                                                 setRatingStart((prevState) => {
                                                                     return prevState.map((value, index2, array) => index2 <= index ? {filled: true} : {filled: false})
                                                                 })
                                                             }}
                                                             onMouseLeave={() => {
                                                                 if (rating === null) {
                                                                     setRatingStart((prevState) => {
                                                                         return prevState.map((value, index2, array) => {
                                                                             return {filled: false}
                                                                         })
                                                                     })
                                                                 } else {
                                                                     setRatingStart((prevState) => {
                                                                         return prevState.map((value, index2, array) => index2 < rating ? {filled: true} : {filled: false})
                                                                     })
                                                                 }
                                                             }}
                                                             onClick={async () => {
                                                                 await setRatingStart((prevState) => {
                                                                     return prevState.map((value, index2, array) => index2 <= index ? {filled: true} : {filled: false})
                                                                 })
                                                                 setRating(ratingStars.filter(value => value.filled).length)
                                                             }}
                                                             alt="rating"/>
                                                    )
                                                })}
                                                <div className="ml-3 d-flex align-self-center">
                                                    <b>{rating !== null ? `${rating}/5` : ''}</b></div>
                                            </div>
                                            {submitted && rating === null ?
                                                <small className="error-color">Please set rating</small> : null}
                                            <MDBBtn
                                                className="mt-2 background-color-primary color-background rounded bold align-self-end"
                                                onClick={() => {
                                                    submitReview();
                                                }}
                                                type='submit'>Submit</MDBBtn>
                                        </div>
                                    </> : null}
                                {props?.recipe?.recipeReviews?.sort((review)=>{
                                    if (review.authorName === currentUserReview?.authorName){
                                        return -1;
                                    }
                                    return 0;
                                }).map((review, index) => {
                                    return (
                                        <div className="d-flex flex-column border-very-light-grey p-3 position-relative">
                                            {review.authorName === currentUserReview?.authorName?<div className="edit-review-wrapper hover-pointer-cursor">
                                                {editComment? <MDBIcon fas icon="times" onClick={()=>setEditComment(false)} />:
                                                    <MDBIcon fas icon="pen" onClick={()=>setEditComment(true)} />}
                                               </div>:null}
                                            {review.authorName === currentUserReview?.authorName?  <span className="your-review-badge" color="dark">your review</span>:null}
                                            <div className="d-flex flex-row">
                                                <div className="profile-avatar mr-2">
                                                    <LazyLoadImage
                                                        placeholderSrc={'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'}
                                                        effect="blur"
                                                        alt={"Author image"}
                                                        src={`${process.env.REACT_APP_REST_API_URL}/recipes/user-image?id=${review.authorId}`}
                                                        width='45'
                                                        height='45'
                                                    >
                                                    </LazyLoadImage>
                                                </div>
                                                <div className="d-flex align-self-center bold">
                                                    <b>{review.authorName}</b></div>
                                            </div>
                                            {review.authorName !== currentUserReview?.authorName || (review.authorName === currentUserReview?.authorName && !editComment)?
                                                <>
                                            <div className="d-flex flex-row mt-2">
                                                {new Array(5).fill("").map((value, index, array) => {
                                                    return (
                                                        <img width={20}
                                                             src={index < review.rating ? star_filled : star_empty}
                                                             alt="rating"/>
                                                    )
                                                })}
                                                <small
                                                    className="ml-2">{new Date(review?.timestamp).toLocaleDateString()}</small>
                                            </div>
                                            <div className="d-flex flex-row mt-3">
                                                {review.text}
                                            </div>
                                                </>
                                                :null}
                                            {review.authorName === currentUserReview?.authorName && editComment?
                                                <div className="d-flex flex-column mt-2">
                                                    <MDBTextArea label='review text...'
                                                                 className={submitted && reviewText === "" ? 'reviews-text-area is-invalid' : 'reviews-text-area'}
                                                                 value={reviewText}
                                                                 rows={4}
                                                                 onChange={(event) => setReviewText(event.target.value)}/>
                                                    {submitted && reviewText === "" ?
                                                        <small className="error-color">Please fill review text</small> : null}
                                                    <div className="d-flex flex-row mt-2">
                                                        {ratingStars.map((value, index) => {
                                                            return (
                                                                <img width={30} className="hover-pointer-cursor"
                                                                     src={value.filled ? star_filled : star_empty}
                                                                     onMouseEnter={() => {
                                                                         setRatingStart((prevState) => {
                                                                             return prevState.map((value, index2, array) => index2 <= index ? {filled: true} : {filled: false})
                                                                         })
                                                                     }}
                                                                     onMouseLeave={() => {
                                                                         if (rating === null) {
                                                                             setRatingStart((prevState) => {
                                                                                 return prevState.map((value, index2, array) => {
                                                                                     return {filled: false}
                                                                                 })
                                                                             })
                                                                         } else {
                                                                             setRatingStart((prevState) => {
                                                                                 return prevState.map((value, index2, array) => index2 < rating ? {filled: true} : {filled: false})
                                                                             })
                                                                         }
                                                                     }}
                                                                     onClick={async () => {
                                                                         await setRatingStart((prevState) => {
                                                                             return prevState.map((value, index2, array) => index2 <= index ? {filled: true} : {filled: false})
                                                                         })
                                                                         setRating(ratingStars.filter(value => value.filled).length)
                                                                     }}
                                                                     alt="rating"/>
                                                            )
                                                        })}
                                                        <div className="ml-3 d-flex align-self-center">
                                                            <b>{rating !== null ? `${rating}/5` : ''}</b></div>
                                                    </div>
                                                    {submitted && rating === null ?
                                                        <small className="error-color">Please set rating</small> : null}
                                                    <MDBBtn
                                                        className="mt-2 background-color-primary color-background rounded bold align-self-end"
                                                        onClick={() => {
                                                            submitReview();
                                                        }}
                                                        type='submit'>Edit review</MDBBtn>
                                                </div>:null}
                                        </div>
                                    )
                                })}

                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
