import React from "react";
import {MDBCol, MDBNavLink, MDBRow} from "mdbreact";


export default function MineRecipes() {
    const recipesForRow = new Array(4).fill('Recipe');
    const rows = new Array(6).fill('Recipe');

    return (
        <div className='d-flex flex-column mt-4 m-4'>
            <div className='d-flex flex-row justify-content-between'>
                <div className='align-self-center h1-responsive'>Mine recipes</div>

                <div className='d-flex'>
                    <MDBNavLink className='action-button' to="/recipes/create">Create new</MDBNavLink>
                </div>
            </div>
            <div className='mt-5 flex-column mx-5'>
                {rows.map(value => {
                    return (
                        <div className='mt-3'>
                            <MDBRow>
                                {recipesForRow.map(value => {
                                    return (
                                        <MDBCol md='6' xl='3' className='mt-5'>
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
