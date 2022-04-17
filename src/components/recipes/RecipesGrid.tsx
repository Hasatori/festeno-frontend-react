import {RecipeOverview} from "../../redux/reducer/GeneralReducer";
import {MDBCol, MDBContainer, MDBIcon, MDBPageItem, MDBPageNav, MDBPagination, MDBRow, MDBTooltip} from "mdbreact";
import {Link} from "react-router-dom";
import {Routes} from "../../util/Constants";
import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import "./RecipesGrid.css"
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addToFavourite, removeFromFavourite} from "../../redux/actiontype/GeneralActionTypes";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        addToFavourite: (recipeOverview: RecipeOverview) => dispatch(addToFavourite(recipeOverview)),
        removeFromFavourite: (recipeOverview: RecipeOverview) => dispatch(removeFromFavourite(recipeOverview))
    };
};


export interface RecipesGridProps {
    recipes: Array<RecipeOverview>
    heading: string
    pagination?: RecipesPagination
    addToFavourite: (recipeOverview: RecipeOverview) => void
    removeFromFavourite: (recipeOverview: RecipeOverview) => void

}

export interface RecipesPagination {
    loading: boolean,
    current: number,
    maxPages: number,
    onPrevious: () => void,
    onNext: () => void,
    onSelected: (page: number) => void
}

function RecipesGrid(props: RecipesGridProps) {
    const starWidth = 25;
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <div
            className={'d-flex flex-column pt-4 pl-2'}>
            <div className='flex-column mx-2'>
                {
                    <MDBContainer className='mt-3'>
                        <MDBRow>
                            <div className="d-flex flex-left mt-5 p-2"><h2>{props.heading}</h2></div>
                        </MDBRow>
                        {props.pagination && props.pagination.maxPages > 1 ? <MDBRow center={isSmallScreen}
                                                                                     className={'px-5 mt-5'}><RecipesPaginationEl{...props.pagination}/></MDBRow> : null}
                        <MDBRow>
                            {props.recipes.map((recipe: RecipeOverview, index) => {
                                return (
                                    <MDBCol md='6' xl='3' sm="12" className='mt-5 px-4'>

                                        <div className='d-flex flex-column recipe-wrapper z-depth-1'>

                                            <Link to={`${Routes.RECIPE}/${recipe.id}`}>
                                                <div><img className='recipe-image'
                                                          src={`data:${recipe?.overviewImage?.type};base64,${recipe?.overviewImage?.data}`}/>
                                                </div>

                                            </Link>
                                            <div className='recipe-footer d-flex flex-column position-relative'>
                                                <div className="mb-3 h5-responsive flex-center">
                                                    <strong>{recipe.title}</strong></div>
                                            </div>
                                            <div className='favourites pt-5 hover-pointer-cursor' onClick={() => {
                                                if (!recipe.isInFavourites) {
                                                    props.addToFavourite(recipe);
                                                }else{
                                                    props.removeFromFavourite(recipe);
                                                }
                                            }}>
                                                <MDBTooltip placement="top">
                                                    {recipe.isInFavourites ?
                                                        <MDBIcon icon="heart" className='mt-3'/> :
                                                        <MDBIcon far icon="heart" className='mt-3'/>
                                                    }
                                                    {recipe.isInFavourites ?
                                                        <div>Remove from favourites</div> :
                                                        <div>Add to favourites</div>
                                                    }

                                                </MDBTooltip>
                                            </div>
                                        </div>

                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                        {props.pagination && props.pagination.maxPages > 1 ? <MDBRow center={isSmallScreen}
                                                                                     className='px-5 mt-5'><RecipesPaginationEl{...props.pagination}/></MDBRow> : null}
                    </MDBContainer>

                }

            </div>
        </div>
    )
}

function RecipesPaginationEl(pagination: RecipesPagination) {
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    const maxPagItemsToDisplay = isSmallScreen ? 4 : 10;
    const [paginationItems, setPaginationItems] = useState<Array<number>>([]);
    useEffect(() => {
        const items = Array.from(Array(pagination.maxPages).keys());
        if (items.length > maxPagItemsToDisplay) {
            const newPagItems: Array<number> = [];
            let lastI = pagination.current;
            for (let i = pagination.current; i < items.length; i++) {
                if (newPagItems.length === maxPagItemsToDisplay / 2) {
                    lastI = i;
                    break;
                }
                newPagItems.push(items[i]);
            }
            for (let i = pagination.current - 1; i >= 0; i--) {
                if (newPagItems.length === maxPagItemsToDisplay) {
                    break;
                }
                newPagItems.unshift(items[i]);
            }
            if (newPagItems.length < maxPagItemsToDisplay) {
                for (let i = lastI; i < items.length; i++) {
                    if (newPagItems.length === maxPagItemsToDisplay) {
                        break;
                    }
                    newPagItems.push(items[i]);
                }
            }
            setPaginationItems(old => newPagItems);
        } else {

            setPaginationItems(old => items);
        }
    }, [pagination.current])
    return (
        <MDBPagination>
            <MDBPageItem disabled={pagination.current === 0 || pagination.loading}>
                <MDBPageNav aria-label="Previous">
                    <span aria-hidden="true" onClick={() => pagination.onPrevious()}>Previous</span>
                </MDBPageNav>
            </MDBPageItem>
            {paginationItems.map((value, index) => {
                return (
                    <MDBPageItem active={value === pagination.current}
                                 disabled={pagination.loading}>
                        <MDBPageNav>
                            <span onClick={() => pagination.onSelected(value)}> {value} </span>
                        </MDBPageNav>
                    </MDBPageItem>
                )
            })}
            <MDBPageItem disabled={pagination.current === pagination.maxPages - 1 || pagination.loading}>
                <MDBPageNav aria-label="Previous">
                    <span aria-hidden="true" onClick={() => pagination.onNext()}>Next</span>
                </MDBPageNav>
            </MDBPageItem>
        </MDBPagination>
    );
}

export default connect(null, mapDispatchToProps)(RecipesGrid)
