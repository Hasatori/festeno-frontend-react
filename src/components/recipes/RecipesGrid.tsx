import {RecipeOverview} from "../../redux/reducer/GeneralReducer";
import {MDBCol, MDBContainer, MDBPageItem, MDBPageNav, MDBPagination, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {Routes} from "../../util/Constants";
import star_filled from "../../assets/images/common/star_filled.svg";
import star_empty from "../../assets/images/common/star_empty.svg";
import heart_empty from "../../assets/images/common/heart_empty.svg";
import heart_filled from "../../assets/images/common/heart_filled.svg";
import React from "react";
import {CircleLoader} from "react-spinners";

export interface RecipesGridProps {
    recipes: Array<RecipeOverview>
    heading:string
}

export default function RecipesGrid(props: RecipesGridProps) {
    const starWidth = 25;
        return (
            <div
                className={'d-flex flex-column pt-4 pl-2'}>
                <div className='flex-column mx-2'>
                    {
                        <MDBContainer className='mt-3'>
                            <MDBRow><div className="d-flex flex-left mt-5 p-2"><h2>{props.heading}</h2></div></MDBRow>
                            <MDBRow>
                                {props.recipes.map((recipe: RecipeOverview, index) => {
                                    console.log(recipe)
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
                                                        {/*   <div className="tags">
                                                        {recipe.tags.map(value => {
                                                            return (<MDBBadge color="info" className='recipe-tag'>{value}</MDBBadge>)
                                                        })}
                                                    </div>*/}
                                                  {/*      <div
                                                            className="d-flex flex-column justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div className="mr-1">
                                                                    <img
                                                                        src={`data:${recipe?.author?.profileImage.type};base64,${recipe?.author?.profileImage.data}`}
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
*/}
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
        )
}
