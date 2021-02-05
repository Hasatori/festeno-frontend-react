import React, {useState} from "react";
import {useLocation} from 'react-router-dom';
import "./Explore.css";
import {MDBBadge, MDBBtn, MDBCol, MDBInput, MDBNavLink, MDBRow} from "mdbreact";


export default function Explore() {

    const types = ['Bio', 'Raw', 'Vegetarian', 'Vegan', 'Low carb', 'Paleo', 'Low fat', 'Lacto free'];
    const wantTo = ['potatoes', 'onion'];
    const dontWantTo = ['tomatoes', 'carrots'];
    const [keywords, setKeywords] = useState(['kidsfood', 'kids', 'soup for little kids', 'veggie soup']);
    const [wantToActive, setWantToActive] = useState(true);
    const [keywordVal, setKeywordVal] = useState("");
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
            }
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
    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row justify-content-between'>
                <div><MDBNavLink className={location.hash === "#recipes" ? 'nav-button-active' : 'nav-button'}
                                 to="#recipes" link>Recipes</MDBNavLink> <MDBNavLink
                    className={(location.hash === "#diet-plan" || (location.hash === "" && location.pathname === "/explore")) ? 'nav-button-active' : 'nav-button'}
                    to={"#diet-plan"}
                    link>DietPlan</MDBNavLink></div>

                <div className='d-flex'>
                    <button className='action-button'>Search</button>
                </div>
            </div>
            <div className='divider mt-3 mb-5'/>
            <div>
                <MDBRow className='mb-3'>
                    <MDBCol sm='10' md='10' lg='7'>
                        <div className='d-flex flex-column'>
                            {nutrientRows.map((nutrient, index, array) => {
                                return (
                                    getNutrientRow(nutrient.name, nutrient.val, nutrient.setVal, index)
                                )
                            })}
                        </div>
                    </MDBCol>
                    <MDBCol sm='10' md='10' lg='5'>
                        <div className='d-flex flex-column'>
                            <div>
                                {types.map((val) => {
                                    return <MDBBtn className='neutral-button'>{val}</MDBBtn>
                                })}
                            </div>
                            <div className='mt-2'>

                                <select className="browser-default custom-select multiple-choices-select">
                                    <option value="1">1 week</option>
                                    <option value="2">2 weeks</option>
                                    <option value="3">3 weeks</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol sm='10' md='10' lg='7' className='search-tags-wrapper-left-margin'>
                        <div className='search-tags-wrapper d-flex flex-column px-3 pt-1 pb-5'>
                            <div className='d-flex flex-row'>
                                <div className='flex-grow-1'><MDBInput type='text' className='search-input'
                                                                       label="Keywords, hastags" value={keywordVal}
                                                                       onChange={(e => setKeywordVal(e.currentTarget.value))}/>
                                </div>
                                <div> {/* <MDBBtn color='primary' onClick={()=>{setKeywords([...keywords,keywordVal]);setKeywordVal("")}}>Add</MDBBtn>*/}</div>

                            </div>

                            <div>
                                {keywords.map((val) => {
                                    return <MDBBadge className='search-tag pr-4 pl-3 py-3 m-2 z-depth-0'
                                                     color="light">{val}
                                        <div className='hover-pointer-cursor search-tag-close' onClick={() => {
                                            setKeywords(keywords.filter(keyword => keyword !== val))
                                        }}>x
                                        </div>
                                    </MDBBadge>
                                })}
                            </div>
                        </div>

                    </MDBCol>
                    <MDBCol sm='10' md='10' lg='5'>
                        <div className='d-flex flex-column'>
                            <div className='d-flex flex-row'>
                                <div
                                    className={wantToActive ? 'including-ingredients-heading-selected hover-pointer-cursor h4-responsive  flex-grow-1  text-center' : 'hover-pointer-cursor h4-responsive  flex-grow-1  text-center'}

                                    onClick={() => {
                                        setWantToActive(true)
                                    }}>Want
                                    to
                                </div>
                                <div
                                    className={!wantToActive ? 'including-ingredients-heading-selected hover-pointer-cursor h4-responsive  flex-grow-1  text-center' : 'hover-pointer-cursor h4-responsive  flex-grow-1  text-center'}
                                    onClick={() => {
                                        setWantToActive(false)
                                    }}>Do not want to
                                </div>
                            </div>
                            <div className='search-tags-wrapper d-flex flex-column px-3 pt-1 pb-5'>
                                <div><MDBInput className='search-input' label="Ingredients I want to include"/>
                                </div>
                                <div>
                                    {
                                        wantToActive ?
                                            wantTo.map((val) => {
                                                return <MDBBadge className='search-tag pr-4 pl-3 py-3 m-2 z-depth-0'
                                                                 color="light">{val}
                                                    <div className='search-tag-close'>x</div>
                                                </MDBBadge>
                                            })
                                            :
                                            dontWantTo.map((val) => {
                                                return <MDBBadge className='search-tag pr-4 pl-3 py-3 m-2 z-depth-0'
                                                                 color="light">{val}
                                                    <div className='search-tag-close'>x</div>
                                                </MDBBadge>
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </div>

        </div>)

}

function getNutrientRow(name: string, nutrientVal: number, setNutrientVal: (val: number) => any, index: number) {
    return (
        <div className='d-flex flex-row flex-grow-1 justify-content-between'>
            <div className='d-flex flex-column pb-4'>
                <div>Nutrient</div>
                <div
                    className={index % 2 == 0 ? 'nutrient-dot-active align-self-center' : 'nutrient-dot-disabled align-self-center'}/>
            </div>

            <div className='mx-2 flex-grow-1 align-self-center'>
                <input type="range"
                       className={index % 2 == 0 ? 'custom-range-active' : 'custom-range-disabled'}

                       value={nutrientVal}
                       onChange={(event => setNutrientVal(Number(event.target.value)))}/>
            </div>
            <div className='align-self-center'>
                <div
                    className={nutrientVal > 0 ? 'nutrient-indicator-has-value' : 'nutrient-indicator-empty'}>{nutrientVal}</div>
            </div>
        </div>
    )
}
