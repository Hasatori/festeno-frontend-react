import React from "react";
import {MDBCol, MDBNavLink, MDBRow} from "mdbreact";
import { Link } from "react-router-dom";
import {useMediaQuery} from "react-responsive";


export default function MineRecipes() {
    const recipesForRow = new Array(4).fill('Recipe');
    const rows = new Array(6).fill('Recipe');
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <div className={isSmallScreen?"mx-0 pt-2 mt-5":"mx-0 px-0"}>
            <MDBRow className='d-flex flex-row justify-content-between mx-3 mt-2'>
                <MDBCol xs={"9"} className='align-self-center h1-responsive'>Mine recipes</MDBCol>

                <MDBCol xs={"3"} >
                    <Link  to="/recipes/create"> <div className='action-button float-right' >Create new</div></Link>
                </MDBCol>
            </MDBRow>
            <div className='mt-5 flex-column mx-2'>
                {rows.map(value => {
                    return (
                        <div className='mt-3'>
                            <MDBRow>
                                {recipesForRow.map(value => {
                                    return (
                                        <MDBCol md='6' lg='3' sm="12" className='mt-5 px-4'>
                                            <Link to="/recipes/recipe/adasdad54536s4fg65ds4fa5s4f">
                                                <div className='recipe-wrapper'>

                                                    <img className='recipe-image'
                                                         src={require(`../../../assets/images/recipes/recipe${Math.floor(Math.random() * 50)}.jpg`)}/>

                                                    <div className='recipe-author'>
                                                        <div className='d-flex flex-row'>
                                                            <div><img
                                                                src={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`}
                                                                className='recipe-author-image' alt="aligment"/></div>
                                                            <div className='ml-2 d-flex flex-column '>
                                                                <div><small className='hr-bold'>Pepa</small></div>
                                                                <div><small>2m</small></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='recipe-header'>

                                                    </div>
                                                    <div className='recipe-body'>

                                                    </div>
                                                    <div className='recipe-name'>Nejlepší pochutina světa</div>
                                                </div>
                                            </Link>
                                        </MDBCol>
                                    )
                                })}
                            </MDBRow>
                        </div>
                    )

                })}

            </div>
        </div>
    )
}
