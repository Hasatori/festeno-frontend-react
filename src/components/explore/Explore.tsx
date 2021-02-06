import React, {useState} from "react";
import {useLocation} from 'react-router-dom';
import "./Explore.css";
import {MDBBadge, MDBBtn, MDBCol, MDBInput, MDBNavLink, MDBRow} from "mdbreact";
import NutrientRow from "./NutrientRow";


export default function Explore() {
    const wantToDoNotWantToFeed = ['potatoes', 'onion', 'tomato', 'carrot', 'cucumber'];
    const keywordsFeed = ['paleo','kidsfood','vegan','low carb','high protein','kids','veggie soup'];
    const types = ['Bio', 'Raw', 'Vegetarian', 'Vegan', 'Low carb', 'Paleo', 'Low fat', 'Lacto free'];
    const [wantTo, setWantTo] = useState(['potatoes', 'onion']);
    const [dontWantTo, setDoNotWantTo] = useState(['tomatoes', 'carrots']);
    const [keywords, setKeywords] = useState(['kidsfood', 'kids', 'soup for little kids', 'veggie soup']);
    const [wantToActive, setWantToActive] = useState(true);
    const [wantToDoNotWantToVal, setWantToDoNotWantToVal] = useState('');
    const [keywordVal, setKeywordVal] = useState("");
    const location = useLocation();
    const [carbohydrate, setCarbohydrate] = useState(0);
    const enabled = useState(true);
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
    const [wantToDoNotWantToActive,setWantToDoNotWantToActive]=useState(false);
    const [keywordsToActive,setKeyWordsActive]=useState(false);
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
                                return (<NutrientRow {...nutrient.name} />)
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
                            <div className='d-flex flex-row autocomplete-wrapper'>
                                <div className='flex-grow-1' onKeyDown={event => {
                                    if (event.key === 'Enter' && keywordVal.trim() !== '') {
                                        setKeywords([...keywords, keywordVal]);
                                        setKeywordVal('');
                                    }
                                }}>
                                    <MDBInput type='text' className='search-input'
                                              label="Keywords, hastags" value={keywordVal}
                                              onChange={(e => setKeywordVal(e.currentTarget.value))}
                                    />
                                    {keywordVal.trim().length > 0?
                                        <div
                                            className='autocomplete'>
                                            {

                                               keywordsFeed.concat(keywordVal).filter((feed,index,array:string[]) =>
                                                    feed.toLowerCase().match(keywordVal.toLowerCase()) && array.indexOf(feed.toLowerCase()) === index
                                                ).map(value => {
                                                    return  <div className='autocomplete-row' onClick={()=>{
                                                        setKeywords([...keywords, value]);
                                                        setKeywordVal('');
                                                    }}>{value}</div>
                                                })
                                            }
                                        </div> :
                                        <></>

                                    }
                                </div>


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
                                <div className='autocomplete-wrapper'
                                     onKeyDown={event => {
                                         if (event.key === 'Enter' && wantToDoNotWantToVal.trim() !== '') {
                                             if (wantToActive) {
                                                 if (wantTo.indexOf(wantToDoNotWantToVal) === -1){
                                                     setWantTo([...wantTo, wantToDoNotWantToVal]);
                                                 }

                                             } else {
                                                 if (dontWantTo.indexOf(wantToDoNotWantToVal) === -1) {
                                                     setDoNotWantTo([...dontWantTo, wantToDoNotWantToVal])
                                                 }
                                             }
                                             setWantToDoNotWantToVal('');

                                         }
                                     }}><MDBInput className='search-input' label="Ingredients I want to include"
                                                  value={wantToDoNotWantToVal}
                                                  onChange={(e => setWantToDoNotWantToVal(e.currentTarget.value))}


                                />
                                    {wantToDoNotWantToVal.trim().length > 0?
                                        <div
                                            className='autocomplete shadow'>
                                            {

                                                wantToDoNotWantToFeed.concat(wantToDoNotWantToVal).filter((feed,index,array:string[]) =>
                                                    feed.toLowerCase().match(wantToDoNotWantToVal.toLowerCase()) && array.indexOf(feed.toLowerCase()) ===index
                                                ).map(value => {
                                                    return  <div className='autocomplete-row' onClick={()=>{
                                                        if (wantToActive) {
                                                            if (wantTo.indexOf(wantToDoNotWantToVal) === -1){
                                                                setWantTo([...wantTo, value]);
                                                            }

                                                        } else {
                                                            if (dontWantTo.indexOf(wantToDoNotWantToVal) === -1) {
                                                                setDoNotWantTo([...dontWantTo,value])
                                                            }
                                                        }
                                                        setWantToDoNotWantToVal('');
                                                    }}>{value}</div>
                                                })
                                            }
                                        </div> :
                                        <></>

                                    }

                                </div>
                                <div>
                                    {
                                        wantToActive ?
                                            wantTo.map((val) => {
                                                return <MDBBadge className='search-tag pr-4 pl-3 py-3 m-2 z-depth-0'
                                                                 color="light">{val}
                                                    <div className='search-tag-close hover-pointer-cursor'
                                                         onClick={() => {
                                                             setWantTo(wantTo.filter(wantTo => wantTo !== val))
                                                         }}
                                                    >x</div>
                                                </MDBBadge>
                                            })
                                            :
                                            dontWantTo.map((val) => {
                                                return <MDBBadge className='search-tag pr-4 pl-3 py-3 m-2 z-depth-0'
                                                                 color="light">{val}
                                                    <div className='search-tag-close hover-pointer-cursor'
                                                         onClick={() => {
                                                            setDoNotWantTo(dontWantTo.filter(doNotWantTo => doNotWantTo !== val))
                                                         }}
                                                    >x</div>
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

