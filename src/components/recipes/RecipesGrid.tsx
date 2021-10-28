import {Recipe} from "../../redux/reducer/GeneralReducer";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {Routes} from "../../util/Constants";
import star_filled from "../../assets/images/common/star_filled.svg";
import star_empty from "../../assets/images/common/star_empty.svg";
import heart_empty from "../../assets/images/common/heart_empty.svg";
import heart_filled from "../../assets/images/common/heart_filled.svg";
import React from "react";
import {CircleLoader} from "react-spinners";

export interface RecipesGridProps {
    recipes: Array<Recipe>
    loading: boolean,
    loadingMessage: string
}

export default function RecipesGrid(props: RecipesGridProps) {
    const starWidth = 25;
    if (props.loading) {
        return (<div>
            <CircleLoader
                css={`margin:auto;`}
                size={75}
                color={"#123abc"}
                loading={props.loading}
            />
            <h2 className="text-center">{props.loadingMessage}</h2>
        </div>)
    } else {
        return (
            <div
                className={'d-flex flex-column pt-4 pl-2'}>
                <div className='flex-column mx-2'>
                    {
                        <MDBContainer className='mt-3'>
                            <MDBRow>
                                {props.recipes.map((recipe: Recipe, index) => {
                                    return (
                                        <MDBCol md='6' xl='3' sm="12" className='mt-5 px-4'>
                                            <Link to={`${Routes.RECIPE}/adasdad54536s4fg65ds4fa5s4f`}>
                                                <div className='d-flex flex-column recipe-wrapper z-depth-1'>

                                                    <div><img className='recipe-image'
                                                              src={`data:${recipe.layoutImage.type};base64,${recipe.layoutImage.data}`}/>
                                                    </div>
                                                    <div className='recipe-footer d-flex flex-column position-relative'>
                                                        <div className="mb-3 h5-responsive">
                                                            <strong>{recipe.title}</strong></div>
                                                        {/*   <div className="tags">
                                                        {recipe.tags.map(value => {
                                                            return (<MDBBadge color="info" className='recipe-tag'>{value}</MDBBadge>)
                                                        })}
                                                    </div>*/}
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

        )
    }
}
