import React, {useCallback, useEffect, useState} from "react";
import "./Explore.css";
import {MDBBtn, MDBCol, MDBContainer, MDBPageItem, MDBPageNav, MDBPagination, MDBRow} from "mdbreact";
import {useMediaQuery} from "react-responsive";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {searchRecipes} from "../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../redux/store/Store";
import {RecipeOverview} from "../../redux/reducer/GeneralReducer";
import {connect} from "react-redux";
import {FoodPreference, FoodPreferencesRequest, FoodPreferenceType} from "../foodpreferences/FoodPreferences";
import RecipesGrid from "../recipes/RecipesGrid";
import {CircleLoader} from "react-spinners";

export interface ExploreProps {
    loading: boolean
    loadingMessage: string | undefined
    recipesSearchResponse: RecipesSearchResponse
    searchRecipes: (recipesSearchRequest: RecipesSearchRequest) => void
}

export interface RecipesSearchRequest {

    nameOrKeyword?: string
    dietType: string,
    foodPreferences: Array<FoodPreference>,
    pageNumber: number
}

export interface RecipesSearchResponse {
    recipes: Array<RecipeOverview>
    maxPages: number
}


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        searchRecipes: (recipesSearchRequest: RecipesSearchRequest) => dispatch(searchRecipes(recipesSearchRequest))
    };
};

function mapStateToProps(state: AppState, props: ExploreProps) {
    return {
        loading: state.generalState.loading,
        loadingMessage: state.generalState.loadingMessage,
        recipesSearchResponse: state.generalState.recipesSearchResponse
    }
}

function Explore(props: ExploreProps) {
    const notSelectedOption = "Not selected";
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    const [nameOrKeyword, setNameOrKeyword] = useState<string>();
    const [dietType, setDietType] = useState<string | null>("Vegan");
    const dietTypes = ["Vegan", "Vegetarian", "Omnivore"];
    const [dietSubTypes, setDietSubTypes] = useState<Array<string>>([]);
    const specificDiets = ["low fat", "low carbohydrates", "high protein", "gluten free", "Low Lactose", "Sugar free"];
    const [wantedFood, setWantedFood] = useState<Array<string>>([]);
    const [wantedFoodVal, setWantedFoodVal] = useState("");
    const [wantedFoodError, setWantedFoodError] = useState("");
    const [notWantedFood, setNotWantedFood] = useState<Array<string>>([]);
    const [notWantedFoodVal, setNotWantedFoodVal] = useState("");
    const [notWantedFoodError, setNotWantedFoodError] = useState("");
    const [preferredCuisine, setPreferredCuisine] = useState<string>(notSelectedOption);
    const cuisines = [notSelectedOption, 'Italian', 'Thai', 'French', 'Japanese', 'Lebanese', 'Spanish', 'German', 'Korean', 'SouthAfrican', 'Australian', 'Caribbean', 'Greek', 'Filipino', 'Scottish', 'Indian', 'Mexican', 'Indonesian', 'Brazilian', 'Chinese', 'American'];
    const [page, setPage] = useState(-1);
    const [filterHidden, setFilterHidden] = useState(false);

    async function submit() {
        if (page === -1) {
            await setPage(0);
        } else {
            if (dietType !== null) {
                const foodPreferences: FoodPreference[] = []
                const dietSub: FoodPreference[] = dietSubTypes.map((dietSubType) => {
                    return {value: dietSubType, foodPreferenceType: FoodPreferenceType.DIET_SUB_TYPE}
                });
                foodPreferences.push(...dietSub);
                if (preferredCuisine !== notSelectedOption) {
                    foodPreferences.push({
                        value: preferredCuisine,
                        foodPreferenceType: FoodPreferenceType.FAVOURITE_CUISINE
                    });
                }

                foodPreferences.push(...dietSub);
                const favouriteFoodsReq: FoodPreference[] = wantedFood.map((lovedFood) => {
                    return {value: lovedFood, foodPreferenceType: FoodPreferenceType.FAVOURITE_FOOD};
                });
                foodPreferences.push(...favouriteFoodsReq);
                const hatedFoodsReq: FoodPreference[] = notWantedFood.map((hatedFood) => {
                    return {value: hatedFood, foodPreferenceType: FoodPreferenceType.HATED_FOOD}
                });
                foodPreferences.push(...hatedFoodsReq);
                const request: RecipesSearchRequest = {
                    nameOrKeyword: nameOrKeyword,
                    dietType: dietType,
                    foodPreferences: foodPreferences,
                    pageNumber: page
                }
                props.searchRecipes(request);
            }
        }
    }

    useEffect(() => {
        if (page >= 0) {
            submit();
        }
    }, [page]);

    function addWantedFood() {
        if (wantedFoodVal.trim() === "") {
            setWantedFoodError("Fill value")
        } else if (wantedFood.map((answer) => answer.toLowerCase().trim()).includes(wantedFoodVal.toLowerCase().trim())) {
            setWantedFoodError("Already added");
        } else if (notWantedFood.map((answer) => answer.toLowerCase().trim()).includes(wantedFoodVal.toLowerCase().trim())) {
            setWantedFoodError("Already in the not wanted foods")
        } else {
            setWantedFood(oldArray => [...oldArray, wantedFoodVal]);
            setWantedFoodVal("");
            setWantedFoodError("");
        }
    }

    function addNotWantedFood() {
        if (notWantedFoodVal.trim() === "") {
            setNotWantedFoodError("Fill value")
        } else if (notWantedFood.map((answer) => answer.toLowerCase().trim()).includes(notWantedFoodVal.toLowerCase().trim())) {
            setNotWantedFoodError("Already added");
        } else if (wantedFood.map((answer) => answer.toLowerCase().trim()).includes(notWantedFoodVal.toLowerCase().trim())) {
            setNotWantedFoodError("Already in the wanted foods")
        } else {
            setNotWantedFood(oldArray => [...oldArray, notWantedFoodVal]);
            setNotWantedFoodVal("");
            setNotWantedFoodError("");
        }
    }
    return (
        <MDBContainer className={isSmallScreen ? "mx-auto p-4 pt-2 mt-5" : "mx-auto p-5 mt-3"}>
            <div className='d-flex justify-content-start'>
                <h1 className='text-center'>Search recipes</h1>
            </div>
            <div className='divider mt-3 mb-5'/>
            <div className='d-flex flex-column'>
                <div className='d-flex align-self-end'>
                <MDBBtn className='background-color-primary color-background rounded m-0'
                        onClick={() => setFilterHidden(!filterHidden)}>{filterHidden ?
                    <>show filters <i className="ml-1 fas fa-angle-down"/></> :
                    <>hide filters <i className="ml-1 fas fa-angle-up"/></>}</MDBBtn>
                </div>
            {!filterHidden ?
                <div className='background-color-secondary border-light-grey rounded p-3'>
                    <MDBRow>
                        <MDBCol md='3' sm='6' className={"mt-5"}>
                            <div className='d-flex flex-column'>
                                <div>Name or keyword</div>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex align-self-center mr-1'>
                                            <div className="my-0">
                                                <input
                                                    type="text"
                                                    placeholder='name or keyword'
                                                    className='form-control'
                                                    value={nameOrKeyword===null?"":nameOrKeyword}
                                                    onChange={(event) => setNameOrKeyword(event.target.value)}
                                                    required
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='3' sm='6' className={"mt-5"}>
                            <div className='d-flex flex-column'>
                                <div>Diet types</div>
                                <div className='d-flex flex-column'>
                                    <select onChange={(event => {
                                        setDietType(event.target.value)
                                    })}
                                            disabled={props.loading}
                                            value={dietType!==null?dietType:dietSubTypes[0]}
                                    >
                                        {dietTypes.map((value) => {
                                            return (
                                                <option value={value}>{value}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </MDBCol>
                        <MDBCol md='3' sm='6' className={"mt-5"}>
                            <div className='d-flex flex-column'>
                                <div>Specific diet</div>
                                <div className='d-flex flex-column'>
                                    {specificDiets.map((value) => {
                                        return (
                                            <div className='d-flex flex-row'>
                                                <div className='align-self-center'>
                                                    <input
                                                        disabled={props.loading}
                                                        checked={dietSubTypes.includes(value)}
                                                        onChange={() => !dietSubTypes.includes(value) ?
                                                            setDietSubTypes(oldArray => [...oldArray, value]) :
                                                            setDietSubTypes(oldArray => oldArray.filter(val => val !== value))}
                                                        type="checkbox"
                                                    />
                                                </div>
                                                <div className='align-self-center ml-2'>
                                                    {value}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </MDBCol>
                        <MDBCol md='3' sm='6' className={"mt-5"}>
                            <div className='d-flex flex-column'>
                                <div>Cuisine</div>
                                <div className='d-flex flex-column'>
                                    <select
                                        disabled={props.loading}
                                        onChange={(event => {
                                            setPreferredCuisine(event.target.value)
                                        })}>
                                        {cuisines.map((value) => {
                                            return (
                                                <option value={value}>{value}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xl='3' sm='6' className={"mt-5"}>
                            <div className='d-flex flex-column'>
                                <div>Wanted food</div>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex align-self-center mr-1'>
                                            <div className="my-0">
                                                <input
                                                    onKeyPress={event => event.key === 'Enter' ? addWantedFood() : null}
                                                    type="text"
                                                    placeholder='type in ingredient'
                                                    className={wantedFoodError !== '' ? 'form-control is-invalid' : 'form-control'}
                                                    value={wantedFoodVal}
                                                    onChange={(event) => setWantedFoodVal(event.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex align-self-center'>
                                            <MDBBtn
                                                disabled={props.loading}
                                                className="background-color-primary color-background rounded w-100 bold"
                                                type="button"
                                                onClick={() => {
                                                    addWantedFood();
                                                }}>Add
                                            </MDBBtn>
                                        </div>
                                    </div>
                                    {wantedFoodError !== "" ?
                                        <div
                                            className="d-flex text-left error-color">{wantedFoodError}</div> : null}
                                    <ul className='list-group'>
                                        {wantedFood.map(value => {
                                            return (
                                                <li className="list-group-item">
                                                    <div className='d-flex flex-row d-flex justify-content-between'>
                                                        <div className='d-flex'>{value}</div>
                                                        <div className="d-flex hover-pointer-cursor"
                                                             onClick={() => {
                                                                 setWantedFood((oldWantedFood) => {
                                                                     return oldWantedFood.filter(wantedFood => {
                                                                         return wantedFood !== value
                                                                     })
                                                                 })
                                                             }}>x
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </MDBCol>
                        <MDBCol xl='3' sm='6' className={"mt-5"}>
                            <div className='d-flex flex-column'>
                                <div>Without ingredient</div>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex align-self-center mr-1'>
                                            <div className="my-0">
                                                <input
                                                    onKeyPress={event => event.key === 'Enter' ? addNotWantedFood() : null}
                                                    type="text"
                                                    placeholder='type in ingredient'
                                                    className={notWantedFoodError !== '' ? 'form-control is-invalid' : 'form-control'}
                                                    value={notWantedFoodVal}
                                                    onChange={(event) => setNotWantedFoodVal(event.target.value)}
                                                    required
                                                />
                                            </div>

                                        </div>
                                        <div className='d-flex align-self-center'>
                                            <MDBBtn
                                                disabled={props.loading}
                                                className="background-color-primary color-background rounded w-100 bold"
                                                type="button"
                                                onClick={() => {
                                                    addNotWantedFood();
                                                }}>Add
                                            </MDBBtn>
                                        </div>
                                    </div>
                                    {notWantedFoodError !== "" ?
                                        <div
                                            className="d-flex text-left error-color">{notWantedFoodError}</div> : null}
                                    <ul className='list-group'>
                                        {notWantedFood.map(value => {
                                            return (
                                                <li className="list-group-item">
                                                    <div className='d-flex flex-row d-flex justify-content-between'>
                                                        <div className='d-flex'>{value}</div>
                                                        <div className="d-flex hover-pointer-cursor"
                                                             onClick={() => {
                                                                 setNotWantedFood((oldWantedFood) => {
                                                                     return oldWantedFood.filter(wantedFood => {
                                                                         return wantedFood !== value
                                                                     })
                                                                 })
                                                             }}>x
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow></div> : null}
            </div>
            <div className='d-flex mt-5'>
                <MDBBtn

                    disabled={props.loading}
                    className="background-color-primary color-background rounded bold"
                    type="button"
                    onClick={async () => {
                        await setPage(0);
                        await submit();
                    }}>search
                </MDBBtn>
            </div>

            {props.loading ?
                <div>
                    <CircleLoader
                        css={`margin:auto;`}
                        size={75}
                        color={"#123abc"}
                        loading={props.loading}
                    />
                    <h2 className="text-center">Loading recipes</h2>
                </div> : props?.recipesSearchResponse?.recipes ?
                    <div>
                        <RecipesGrid
                            recipes={props.recipesSearchResponse.recipes}
                            heading={"Search result"}
                            pagination={{
                                maxPages: props.recipesSearchResponse.maxPages,
                                current: page,
                                onPrevious: () => {
                                    setPage(page - 1);
                                },
                                onNext: () => {
                                    setPage(page + 1);
                                },
                                onSelected: (index: number) => {
                                    setPage(index);
                                },
                                loading: props.loading
                            }
                            }
                        />
                    </div>
                    : null
            }

        </MDBContainer>)

}


export default connect(mapStateToProps, mapDispatchToProps)(Explore)
