import React from "react";
import "./Recipe.css"
import {useLocation} from "react-router";
import {useHistory, useParams} from "react-router-dom";
import {MDBCol, MDBIcon, MDBNavLink, MDBRow} from "mdbreact";
import star_filled from "../../../assets/images/common/star_filled.svg"
import star_empty from "../../../assets/images/common/star_empty.svg"

const ingredients: Ingredient[] = [
    {name: "máslo", unit: "180g"},
    {name: "voda", unit: "100g"},
    {name: "hnědý rum", unit: "4 lžíce"},
    {name: "cukr krystal", unit: "400g"},
    {name: "čokoláda na vaření nebo tuková čokoládová poleva", unit: "180g"},
    {name: "kokos strouhaný", unit: "200g"},
    {name: "cukrářské piškoty", unit: "300g"},
]
const process: string[] = new Array(8).fill('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');


export default function Recipe() {
    const location = useLocation();
    const {id} = useParams<{ id: string }>();
    let history = useHistory();
    const nutrients = [
        {
            name: "Carbohydrate",
            val: "100"
        },
        {
            name: "Protein",
            val: "50",
        },
        {
            name: "Fat",
            val: "20",
        },
        {
            name: "Fiber",
            val: "0",
        }
    ];
    return (
        <div className='d-flex flex-column mt-4 m-4'>
            <div className='d-flex flex-row justify-content-between'>
                <div className='align-self-center'>
                    <div
                        className={'nav-button-active hover-pointer-cursor'}
                        onClick={(e) => {
                            history.goBack()
                        }}><MDBIcon icon="arrow-left"/></div>
                </div>

                <div className='d-flex'>
                    <MDBNavLink className='action-button ' to="/recipes/create">Create new</MDBNavLink>
                </div>
            </div>
            <div className='divider mt-3 mb-5'/>
            <div>
                <MDBRow>
                    <MDBCol md={"12"} lg={"12"} xl={"5"} className="mt-3">
                        <MDBRow>
                            <MDBCol sm={"12"} lg={"8"} xl={"7"} > <img width="100%"
                                                             src={require(`../../../assets/images/recipes/recipe${Math.floor(Math.random() * 50)}.jpg`)}/>
                            </MDBCol>
                            <MDBCol className="mt-4">
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <div><img src={star_filled} width={30}/></div>
                                        <div className="ml-1"><img src={star_filled} width={30}/></div>
                                        <div className="ml-1"><img src={star_filled} width={30}/></div>
                                        <div className="ml-1"><img src={star_empty} width={30}/></div>
                                        <div className="ml-1"><img src={star_empty} width={30}/></div>
                                        <div className="ml-5 align-self-center">Review(9)</div>
                                    </div>
                                    <div className="h2-responsive">Nejlepší pochutina světa</div>
                                    <div className="mt-3">
                                        <div className="neutral-button color-secondary background-color-success">Vegan
                                        </div>
                                    </div>

                                    <div className='d-flex flex-row mt-3'>
                                        <div><img
                                            src={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`}
                                            className='recipe-author-image' alt="aligment"/></div>
                                        <div className='ml-2 d-flex flex-column '>
                                            <div><small className='hr-bold'>Pepa</small></div>
                                            <div><small>2m</small></div>
                                        </div>
                                    </div>


                                </div>

                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md={"12"} lg={"3"} className="mt-3">
                        <div className="d-flex flex-column">
                            <div className="h4-responsive mb-3">Ingredience</div>
                            <MDBRow>
                                {ingredients.map((ingredient) => {

                                    return (
                                        <>
                                            <MDBCol size={"4"}>{ingredient.unit}</MDBCol>
                                            <MDBCol size={"8"}>{ingredient.name}</MDBCol>
                                        </>

                                    )

                                })}

                            </MDBRow>
                        </div>

                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={"4"}>

                        <div className="d-flex flex-column mt-3">
                            <MDBRow className="d-flex flex-row">
                                <MDBCol size="6">30 min</MDBCol>
                                <MDBCol size="6">2000 Kcal</MDBCol>
                            </MDBRow>
                            <div>Dinner</div>
                            {nutrients.map((nutrient) => {

                                return (
                                    <MDBRow className="d-flex flex-rwo">
                                        <MDBCol size="6">{nutrient.name}</MDBCol>
                                        <MDBCol size="6">{nutrient.val}</MDBCol>
                                    </MDBRow>
                                )


                            })}
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3">
                    <MDBCol>

                        <div className="h4-responsive mb-3">Process</div>
                        {process.map((step, index) => {
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

interface Ingredient {
    name: string,
    unit
        :
        string
}
