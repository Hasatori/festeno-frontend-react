import {RecipeOverview} from "../../redux/reducer/GeneralReducer";
import {MDBCol, MDBContainer, MDBPageItem, MDBPageNav, MDBPagination, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {Routes} from "../../util/Constants";
import star_filled from "../../assets/images/common/star_filled.svg";
import star_empty from "../../assets/images/common/star_empty.svg";
import heart_empty from "../../assets/images/common/heart_empty.svg";
import heart_filled from "../../assets/images/common/heart_filled.svg";
import React, {useEffect, useState} from "react";
import {CircleLoader} from "react-spinners";
import {useMediaQuery} from "react-responsive";
import "./RecipesGrid.css"
export interface RecipesGridProps {
    recipes: Array<RecipeOverview>
    heading: string
    pagination?: RecipesPagination

}

export interface RecipesPagination {
    loading: boolean,
    current: number,
    maxPages: number,
    onPrevious: () => void,
    onNext: () => void,
    onSelected: (page: number) => void
}

export default function RecipesGrid(props: RecipesGridProps) {
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
                        {props.pagination ? <MDBRow center={isSmallScreen}
                                                    className={'px-5 mt-5'}><RecipesPaginationEl{...props.pagination}/></MDBRow> : null}
                        <MDBRow>
                            {props.recipes.map((recipe: RecipeOverview, index) => {
                                return (
                                    <MDBCol md='6' xl='3' sm="12" className='mt-5 px-4'>
                                        <Link to={`${Routes.RECIPE}/${recipe.id}`}>
                                            <div className='d-flex flex-column recipe-wrapper z-depth-1'>

                                                <div><img className='recipe-image'
                                                          src={`data:${recipe?.overviewImage?.type};base64,${recipe?.overviewImage?.data}`}/>
                                                </div>
                                                <div className='recipe-footer d-flex flex-column position-relative'>
                                                    <div className="mb-3 h5-responsive flex-center">
                                                        <strong>{recipe.title}</strong></div>
                                                </div>
                                            </div>
                                        </Link>
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                        {props.pagination ? <MDBRow center={isSmallScreen}
                                                    className='px-5 mt-5'><RecipesPaginationEl{...props.pagination}/></MDBRow> : null}
                    </MDBContainer>

                }

            </div>
        </div>
    )
}

function RecipesPaginationEl(pagination: RecipesPagination) {
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    const [paginationItems,setPaginationItems] = useState<Array<number>>([]);
    useEffect(()=>{
        const items = Array.from(Array(pagination.maxPages).keys());
            const newPagItems:Array<number> = [];
            let lastI= pagination.current;
            for (let i = pagination.current; i < items.length; i++) {
                if (newPagItems.length === 5) {
                    lastI = i;
                    break;
                }
                newPagItems.push(items[i]);
            }
            for (let i = pagination.current-1; i >= 0; i--) {
                if (newPagItems.length === 10) {
                    break;
                }
                newPagItems.unshift(items[i]);
            }
            if (newPagItems.length < 10) {
                for (let i = lastI; i < items.length; i++) {
                    if (newPagItems.length === 10) {
                        break;
                    }
                    newPagItems.push(items[i]);
                }
            }
            setPaginationItems(old=>newPagItems);
    },[pagination.current])
    return (
        <MDBPagination>
            <MDBPageItem disabled={pagination.current === 0 || pagination.loading}>
                <MDBPageNav aria-label="Previous">
                    <span aria-hidden="true" onClick={() => pagination.onPrevious()}>Previous</span>
                </MDBPageNav>
            </MDBPageItem>
            {!isSmallScreen ?
                paginationItems.map((value, index) => {
                    return (
                        <MDBPageItem active={value === pagination.current}
                                     disabled={pagination.loading}>
                            <MDBPageNav>
                                <span onClick={() => pagination.onSelected(value)}> {value} </span>
                            </MDBPageNav>
                        </MDBPageItem>
                    )
                })
                : <MDBPageItem active={true}
                               disabled={pagination.loading}>
                    <MDBPageNav>
                        <span> {pagination.current} </span>
                    </MDBPageNav>
                </MDBPageItem>}
            <MDBPageItem disabled={pagination.current === pagination.maxPages - 1 || pagination.loading}>
                <MDBPageNav aria-label="Previous">
                    <span aria-hidden="true" onClick={() => pagination.onNext()}>Next</span>
                </MDBPageNav>
            </MDBPageItem>
        </MDBPagination>
    );
}
