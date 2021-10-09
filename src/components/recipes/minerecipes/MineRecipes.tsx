import React from "react";
import {MDBCol, MDBContainer, MDBNavLink, MDBRow} from "mdbreact";
import { Link } from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import star_empty from "../../../assets/images/common/star_empty.svg";
import star_filled from "../../../assets/images/common/star_filled.svg";
import heart_empty from "../../../assets/images/common/heart_empty.svg";
import heart_filled from "../../../assets/images/common/heart_filled.svg";
import './MineRecipes.css'
import {Routes} from "../../../util/Constants";

export default function MineRecipes() {
    const recipesForRow = new Array(8).fill('Recipe');
    const rows = new Array(6).fill('Recipe');
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <div className={isSmallScreen?"mx-0 pt-2 mt-5 relative":"mx-0 px-0  relative"}>
            <div className="d-flex flex-center mt-5"><h1>My recipes</h1></div>
            <div className="floating-action-button p-3"><Link  to={Routes.CREATE_RECIPE}> <div className='action-button' >+</div></Link></div>
            <div className='mt-5 flex-column mx-2'>
                {rows.map(value => {
                    return (
                        <div className='mt-3'>
                            <MDBContainer fluid={false}>
                            <MDBRow>
                                {recipesForRow.map((value,index) => {
                                    return (
                                        <MDBCol md='6' xl='3' sm="12" className='mt-5 px-4'>
                                            <Link to={`${Routes.RECIPE}/adasdad54536s4fg65ds4fa5s4f`}>
                                                <div className='d-flex flex-column recipe-wrapper z-depth-1'>

                                                    <div > <img className='recipe-image'
                                                                src={require(`../../../assets/images/recipes/recipe${ Math.floor(Math.random() * 50)}.jpg`)}/>
                                                    </div>
                                                    <div className='recipe-footer d-flex flex-column'>
                                                        <div className="mb-3 h6-responsive">Nejlepší pochutina světa</div>
                                                        <div className="d-flex flex-row justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div className="mr-1">
                                                                    <img
                                                                        src={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`}
                                                                        className='recipe-author-image' alt="aligment"/>
                                                                </div>
                                                                <div className="d-flex flex-column">
                                                                    <small>Sexy koloušek</small>
                                                                    <small>
                                                                        2m
                                                                    </small>
                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-row">
                                                                <div className="mr-1"><img src={index%2==0?star_empty:star_filled} width={27}/></div>
                                                                <div className="ml-1"><img src={index%2==0?heart_empty:heart_filled} width={25}/></div>

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
                        </div>
                    )

                })}

            </div>
        </div>
    )
}
