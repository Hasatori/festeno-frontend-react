import React, {useState} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBNavLink, MDBRow} from "mdbreact";
import {useLocation} from "react-router-dom";
import "./Recipes.css";
import NutrientRow from "../common/NutrientRow";


const ingredients: Ingredient[] = [
    {name: "máslo", unit: "180g"},
    {name: "voda", unit: "100g"},
    {name: "hnědý rum", unit: "4 lžíce"},
    {name: "cukr krystal", unit: "400g"},
    {name: "čokoláda na vaření nebo tuková čokoládová poleva", unit: "180g"},
    {name: "kokos strouhaný", unit: "200g"},
    {name: "cukrářské piškoty", unit: "300g"},
]
const process:string[] = new Array(8).fill('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

export function Recipes() {
    const items = ["video", "image"];
    const location = useLocation();
    const [carbohydrate, setCarbohydrate] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [fiber, setFiber] = useState(0);
    const nutrientRows = [
        {
            name: "Carbohydrate",
            val: carbohydrate,
            setVal: (val: number): void => {
                setCarbohydrate(val);
            },
        },
        {
            name: "Protein",
            val: protein,
            setVal: (val: number): void => {
                setProtein(val);
            }
        },
        {
            name: "Fat",
            val: fat,
            setVal: (val: number): void => {
                setFat(val);
            }
        },
        {
            name: "Fiber",
            val: fiber,
            setVal: (val: number): void => {
                setFiber(val);
            }
        }
    ];
    if (location.hash !== "#create-new-from-scratch" && location.hash !== "#upload-from-existing-page") {
        location.hash = "#create-new-from-scratch";
    }
    return (
        <div className='d-flex flex-column mt-4 m-4'>
            <div className='d-flex flex-row justify-content-between'>
                <div className='align-self-center'><MDBNavLink
                    className={location.hash === "#create-new-from-scratch" || (location.hash === "" && location.pathname === "/recipes") ? 'nav-button-active' : 'nav-button'}
                    to="#create-new-from-scratch" link>Create new recipe from scratch</MDBNavLink> <MDBNavLink
                    className={(location.hash === "#upload-from-existing-page") ? 'nav-button-active' : 'nav-button'}
                    to={"#upload-from-existing-page"}
                    link>Upload from existing page</MDBNavLink></div>

                <div className='d-flex'>
                    <button className='action-button'>Save</button>
                </div>
            </div>
            <div className='divider mt-3 mb-5'/>
            {location.hash == "#create-new-from-scratch" &&
            <>
                <MDBRow>
                    <MDBCol md="6">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row">
                                <div className="nav-button-active"><MDBIcon icon="camera"/></div>
                                <div className="ml-3"><MDBInput label="Name of the recipe"/></div>
                            </div>
                            <div className="grey-wrapper p-3 mt-3">
                                {items.map((item) => {
                                    return (
                                        <div className="wrapper-item">
                                            <div className="item-miniature"><img className="mr-2" width={40} height={40}
                                                                                 src="/static/media/recipe7.3389b2c2.jpg"/>
                                            </div>
                                            <div className="item-body">{item} <MDBIcon size="1x" icon="trash-alt"/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol md="6" xl="4">
                        <div className="d-flex flex-column mt-3 border-grey rounded p-3">
                            <div className="d-flex flex-row justify-content-around mb-3">
                                <div className="mr-3">Details <MDBIcon icon="sliders-h" /></div>
                                <div>Set nutrients <MDBIcon icon="sliders-h" /></div>
                            </div>
                            <div className='d-flex flex-column'>

                                {nutrientRows.map((nutrient, index, array) => {
                                    return (<NutrientRow {...nutrient.name} />)
                                })}
                            </div>
                            <div className="nav-button text-center">Generate from ingredients</div>
                        </div>

                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3" lg="12">
                    <MDBCol xl="6">
                        <div className="h4-responsive">Ingredients</div>
                        <div className="p-3">
                            {ingredients.map((ingredient) => {
                                return (
                                    <MDBRow className="d-flex flex-row ">
                                        <MDBCol xl="9" lg="10" md="8" sm="8" size="8"
                                                className="border-grey rounded p-2">{ingredient.name}</MDBCol>
                                        <MDBCol xl="2" lg="1" md="2" sm="2" size="2"
                                                className="border-grey rounded text-center p-2">{ingredient.unit}</MDBCol>
                                        <MDBCol xl="1" lg="1" md="2" sm="1" size="1"
                                                className="text-center p-2"><MDBIcon size="1x"
                                                                                     icon="trash-alt"/></MDBCol>
                                    </MDBRow>
                                )
                            })}
                        </div>
                        <div><MDBBtn>+ ingredient</MDBBtn></div>
                    </MDBCol>
                    <MDBCol xl="4" lg="12">
                        <div className="d-flex flex-column mt-3">
                            <div className="h4-responsive mb-3">Process</div>
                            {process.map((step,index)=>{
                                return (
                                    <MDBRow className="d-flex flex-row ">
                                        <MDBCol size="1" className="text-center">{++index}</MDBCol>
                                        <MDBCol size="10"
                                                className="border-grey rounded text-center p-3 long-text">{step}</MDBCol>
                                        <MDBCol  size="1"
                                                 className="text-center p-2"><MDBIcon size="1x"
                                                                                      icon="trash-alt"/></MDBCol>
                                    </MDBRow>
                                )
                            })}
                        </div>

                    </MDBCol>
                </MDBRow>
            </>
            }
            {location.hash == "#upload-from-existing-page" &&
                <MDBContainer>
            <MDBCol lg="6" md="12" className="d-flex flex-column">

                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Link to the website from which you want to upload a
                        recipe</label>
                    <input
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mt-2">
                    <div className="nav-button-active">Add</div>
                </div>
            </MDBCol>
                </MDBContainer>
            }
        </div>
    )
}

interface Ingredient
{
    name: string,
        unit
:
    string
}
