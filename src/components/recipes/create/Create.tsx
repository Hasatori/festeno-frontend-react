import "./Create.css";
import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBNavLink, MDBRow} from "mdbreact";
import NutrientRow from "../../common/NutrientRow";
import {Routes} from "../../../util/Constants";


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

export default function Create() {
    const items = ["video", "image"];
    const location = useLocation();
    const [carbohydrate, setCarbohydrate] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [fiber, setFiber] = useState(0);
    const [settingDetails, setSettingDetails] = useState(false);
    const types = ['Bio', 'Raw', 'Vegetarian', 'Vegan', 'Low carb', 'Paleo', 'Low fat', 'Lacto free'];
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
        <div className='d-flex flex-column mt-5 mx-2'>
            <MDBRow >
                <MDBCol md={"4"} lg={"3"} xl={"3"} className=''><Link
                    className={location.hash === "#create-new-from-scratch" || (location.hash === "" && location.pathname === Routes.RECIPES) ? 'nav-button-active' : 'nav-button'}
                    to="#create-new-from-scratch" >Create new recipe from scratch</Link></MDBCol>
                <MDBCol  md={"4"} lg={"3"} xl={"3"} className=''> <Link
                    className={(location.hash === "#upload-from-existing-page") ? 'nav-button-active float-left' : 'nav-button '}
                    to={"#upload-from-existing-page"}
                    >Upload from existing page</Link></MDBCol>
                <MDBCol  md={"4"} lg={"6"} xl={"6"} >
                    <button className='action-button float-right'>Save</button>
                </MDBCol>
            </MDBRow>
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
                                <div
                                    className={settingDetails ? "d-flex flex-row details-change-section-button-active" : "d-flex flex-row details-change-section-button"}
                                    onClick={() => setSettingDetails(true)}>
                                    <div className="align-self-center">Details</div>
                                    <div><MDBIcon className="ml-3" icon="sliders-h" size="2x"/></div>
                                </div>
                                <div
                                    className={!settingDetails ? "d-flex flex-row details-change-section-button-active" : "d-flex flex-row details-change-section-button"}
                                    onClick={() => setSettingDetails(false)}>
                                    <div className="align-self-center">Set nutrients</div>
                                    <div><MDBIcon className="ml-3" icon="sliders-h" size="2x"/></div>
                                </div>
                            </div>
                            {settingDetails &&
                            <>
                                <div className='d-flex flex-column'>

                                    {nutrientRows.map((nutrient, index, array) => {
                                        return (<NutrientRow {...nutrient.name} />)
                                    })}
                                </div>
                                <div className="nav-button align-self-center">Generate from ingredients</div>
                            </>
                            }
                            {!settingDetails &&
                            <>
                                <div className='d-flex flex-column '>
                                    <MDBRow >
                                        <MDBCol size="2"/>
                                        <MDBCol size="4">Time</MDBCol>
                                        <MDBCol size="4"><input
                                            type="text"
                                            className="form-control"
                                            id="formGroupExampleInput"
                                        /></MDBCol>
                                        <MDBCol size="2"/>
                                    </MDBRow>
                                    <MDBRow className="mt-2">
                                        <MDBCol size="2"/>
                                        <MDBCol size="4">Kcal</MDBCol>
                                        <MDBCol size="4"><input
                                            type="text"
                                            className="form-control"
                                            id="formGroupExampleInput"
                                        /></MDBCol>
                                        <MDBCol size="2"/>
                                    </MDBRow>
                                    <MDBRow className="mt-2">
                                        <MDBCol size="2"/>
                                        <MDBCol size="4">Type</MDBCol>
                                        <MDBCol size="4">      <div>
                                            <select className="browser-default custom-select">
                                                <option value="1">Breakfast</option>
                                                <option value="2">Lunch</option>
                                                <option value="3">Snack</option>
                                                <option value="4">Dinner</option>
                                            </select>
                                        </div></MDBCol>
                                        <MDBCol size="2"/>
                                    </MDBRow>
                                    <div>
                                        {types.map((val) => {
                                            return <MDBBtn className='neutral-button'>{val}</MDBBtn>
                                        })}
                                    </div>
                                </div>

                            </>
                            }
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
                            {process.map((step, index) => {
                                return (
                                    <MDBRow className="d-flex flex-row ">
                                        <MDBCol size="1" className="text-center">{++index}</MDBCol>
                                        <MDBCol size="10"
                                                className="border-grey rounded text-center p-3 long-text">{step}</MDBCol>
                                        <MDBCol size="1"
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

interface Ingredient {
    name: string,
    unit
        :
        string
}
