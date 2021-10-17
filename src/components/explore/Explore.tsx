import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import "./Explore.css";
import {MDBBadge, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import NutrientRow from "../common/NutrientRow";
import {useMediaQuery} from "react-responsive";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getTags, SearchRecipes, searchRecipes} from "../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../redux/store/Store";
import {Recipe} from "../../redux/reducer/GeneralReducer";
import {connect} from "react-redux";
import RecipesGrid from "../recipes/RecipesGrid";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        searchRecipes: (searchRecipe: SearchRecipes) => dispatch(searchRecipes(searchRecipe)),
        getTags: () => dispatch(getTags())
    };
};

function mapStateToProps(state: AppState, props: ExploreProps) {
    return {
        feed: state.generalState.feed,
        recipeTags: state.generalState.recipeTags
    }
}

interface ExploreProps {
    feed: Array<Recipe>
    searchRecipes: (searchRecipes: SearchRecipes) => void
    getTags: () => void
    recipeTags: Array<string>
}

interface Type {
    value: string,
    active: boolean,
    disabled: boolean
}

function Explore(props: ExploreProps) {
    const wantToDoNotWantToFeed = ['potatoes', 'onion', 'tomato', 'carrot', 'cucumber'];
    const keywordsFeed = ['paleo', 'kidsfood', 'vegan', 'low carb', 'high protein', 'kids', 'veggie-soup'];
    const [types, setTypes] = useState<Array<Type>>(new Array());
    const [wantTo, setWantTo] = useState(new Array());
    const [dontWantTo, setDoNotWantTo] = useState(new Array());
    const [keywords, setKeywords] = useState(new Array());
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
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    const [wantToDoNotWantToActive, setWantToDoNotWantToActive] = useState(false);
    const [keywordsToActive, setKeyWordsActive] = useState(false);
    const [showFilter, setShowFilter] = useState(true);

    function search(){
        const searchRecipesParams: SearchRecipes = {
            tags: types.filter(t => t.active).map(type => type.value).concat(keywords),
            wantedIngredients: wantTo,
            notWantedIngredients: dontWantTo
        }
        props.searchRecipes(searchRecipesParams);
    }

    useEffect(() => {
        const searchRecipesParams: SearchRecipes = {
            tags: types.filter(t => t.active).map(type => type.value).concat(keywords),
            wantedIngredients: wantTo,
            notWantedIngredients: dontWantTo
        }
        props.searchRecipes(searchRecipesParams);

    }, [keywords, wantTo, dontWantTo])

    useEffect(() => {
        setTypes([...props.recipeTags.filter((thing: string, i, arr: Array<string>) => {
            return arr.findIndex(t => t === thing) === i;
        }).map((value: string) => {
            return {active: false, value: value, disabled: false};
        })]);
    }, [props.recipeTags]);

    useEffect(() => {
        const recipeTags = props.feed.map(recipe => recipe.tags).flat().filter((thing: string, i, arr: Array<string>) => {
            return arr.findIndex(t => t === thing) === i;
        })
        setTypes([...types.map(t => {
            if (!recipeTags.includes(t.value)) {
                t.disabled = true
            }
            return t;
        })]);
    }, [props.feed]);

    useEffect(() => {
        props.getTags();
    }, []);

    return (
        <MDBContainer className={isSmallScreen ? "mx-auto p-4 pt-2 mt-5" : "mx-auto p-5 mt-3"}>
            <div className='d-flex justify-content-start'>
                <h1 className='text-center'>Search recipes</h1>
            </div>
            <div className='divider mt-3 mb-5'/>
            <button onClick={() => {
                setShowFilter(!showFilter);
            }}>{showFilter ? "hide filter" : "show filter"}</button>
            {showFilter ?
                <div>
                    <MDBRow className='mb-3'>
                        <MDBCol sm='10' md='10' lg='6' className="mx-auto  mb-5">
                            <div className='d-flex flex-column'>

                                {nutrientRows.map((nutrient, index, array) => {
                                    return <NutrientRow nutrientName={nutrient.name}/>
                                })}
                            </div>
                        </MDBCol>
                        <MDBCol sm='10' md='10' lg='5' className="mx-auto mb-5">
                            <div className='d-flex flex-column'>
                                <div>
                                    {types.map((type: Type) => {
                                        return <button disabled={type.disabled}
                                            className={type.active ? 'm-2 primary-button' : 'm-2 neutral-button'}
                                            onClick={() => {
                                                type.active = !type.active;
                                                setTypes([...types.map(t => {
                                                    if (t.value === type.value) {
                                                        t.active = type.active
                                                    }
                                                    return t;
                                                })])
                                                search();
                                            }}>{type.value}</button>
                                    })}
                                </div>
                                <div className='mt-3'>

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
                        <MDBCol sm='10' md='10' lg='6' className='search-tags-wrapper-left-margin mx-auto mb-5'>
                            <div className='search-tags-wrapper d-flex flex-column px-3 pt-1 pb-5'>
                                <div className='d-flex flex-row autocomplete-wrapper'>
                                    <div className='flex-grow-1' onKeyDown={event => {
                                        if (event.key === 'Enter' && keywordVal.trim() !== '') {
                                            setKeywords([...keywords, keywordVal]);
                                            setKeywordVal('');
                                        }
                                    }}>
                                        <MDBInput type='text' className='search-input' id='inputdd'
                                                  label="Keywords, hastags" value={keywordVal}
                                                  onChange={(e => setKeywordVal(e.currentTarget.value))}
                                        />
                                        {keywordVal.trim().length > 0 ?
                                            <div
                                                className='autocomplete'>
                                                {

                                                    keywordsFeed.concat(keywordVal).filter((feed, index, array: string[]) =>
                                                        feed.toLowerCase().match(keywordVal.toLowerCase()) && array.indexOf(feed.toLowerCase()) === index
                                                    ).map(value => {
                                                        return <div className='autocomplete-row' onClick={() => {
                                                            if (keywords.indexOf(value) === -1) {
                                                                setKeywords([...keywords, value]);
                                                            }
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
                        <MDBCol sm='10' md='10' lg='5' className="mx-auto">
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
                                                     if (wantTo.indexOf(wantToDoNotWantToVal) === -1) {
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
                                        {wantToDoNotWantToVal.trim().length > 0 ?
                                            <div
                                                className='autocomplete shadow'>
                                                {

                                                    wantToDoNotWantToFeed.concat(wantToDoNotWantToVal).filter((feed, index, array: string[]) =>
                                                        feed.toLowerCase().match(wantToDoNotWantToVal.toLowerCase()) && array.indexOf(feed.toLowerCase()) === index
                                                    ).map(value => {
                                                        return <div className='autocomplete-row' onClick={() => {
                                                            if (wantToActive) {
                                                                if (wantTo.indexOf(value) === -1) {
                                                                    setWantTo([...wantTo, value]);
                                                                }

                                                            } else {
                                                                if (dontWantTo.indexOf(value) === -1) {
                                                                    setDoNotWantTo([...dontWantTo, value])
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
                                                        >x
                                                        </div>
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
                                                        >x
                                                        </div>
                                                    </MDBBadge>
                                                })
                                        }
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    {/*   <div className='d-flex mt-5 justify-content-center'>
                        <button className='action-button' onClick={() => {
                            const searchRecipesParams: SearchRecipes = {
                                tags: keywords,
                                wantedIngredients: wantTo,
                                notWantedIngredients: dontWantTo
                            }
                            props.searchRecipes(searchRecipesParams);
                        }}>Search
                        </button>
                    </div>*/}
                </div>
                : <></>}


            <div>
                <RecipesGrid recipes={props.feed}/>
            </div>
        </MDBContainer>)

}


export default connect(mapStateToProps, mapDispatchToProps)(Explore)
