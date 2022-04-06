import React, {useCallback, useEffect, useState} from "react";
import "./Explore.css";
import {MDBBtn, MDBContainer, MDBPageItem, MDBPageNav, MDBPagination} from "mdbreact";
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
    const [dietType, setDietType] = useState<string | null>("Vegan");
    const dietTypes = ["Vegan", "Vegetarian", "Omnivore"];
    const [dietSubTypes, setDietSubTypes] = useState<Array<string>>([]);
    const specificDiets = ["low fat", "low carbohydrates", "high protein", "gluten free", "Low Lactose"];
    const [wantedFood, setWantedFood] = useState<Array<string>>([]);
    const [wantedFoodVal,setWantedFoodVal] = useState("");
    const [wantedFoodError, setWantedFoodError] = useState("");
    const [notWantedFood, setNotWantedFood] = useState([]);
    const [preferredCuisine, setPreferredCuisine] = useState<string>(notSelectedOption);
    const cuisines = [notSelectedOption, 'Italian', 'Thai', 'French', 'Japanese', 'Lebanese', 'Spanish', 'German', 'Korean', 'SouthAfrican', 'Australian', 'Caribbean', 'Greek', 'Filipino', 'Scottish', 'Indian', 'Mexican', 'Indonesian', 'Brazilian', 'Chinese', 'American'];
    const [page, setPage] = useState(-1);

    async function submit() {
        if (page === -1) {
            await setPage(0);
        }else {
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
                const request: RecipesSearchRequest = {
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

    return (
        <MDBContainer className={isSmallScreen ? "mx-auto p-4 pt-2 mt-5" : "mx-auto p-5 mt-3"}>
            <div className='d-flex justify-content-start'>
                <h1 className='text-center'>Search recipes</h1>
            </div>
            <div className='divider mt-3 mb-5'/>
            <div className='d-flex flex-row'>
                <div className='d-flex flex-column'>
                    <div>Diet types</div>
                    <div className='d-flex flex-column'>
                        <select onChange={(event => {
                            setDietType(event.target.value)
                        })}
                        disabled={props.loading}
                        >
                            {dietTypes.map((value) => {
                                return (
                                    <option value={value}>{value}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className='d-flex flex-column ml-4'>
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
                <div className='d-flex flex-column ml-4'>
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
                {/*<div className='d-flex flex-column ml-4'>
                    <div>Wanted food</div>
                    <div className='d-flex flex-column'>
                        <div className='d-flex flex-row'>
                            <div className='d-flex align-self-center mr-1'>
                                <div className="my-0">
                                    <input
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
                                    className="background-color-primary color-background rounded z-depth-1 w-100 bold"
                                    type="button"
                                    onClick={() => {
                                        if (wantedFoodVal.trim() === "") {
                                            setWantedFoodError("Fill value")
                                        } else if (wantedFood.map((answer) => answer.toLowerCase().trim()).includes(wantedFoodVal.toLowerCase().trim())) {
                                            setWantedFoodError("Already added");
                                        } else {
                                            setWantedFood(oldArray => [...oldArray, wantedFoodVal]);
                                            setWantedFoodVal("");
                                            setWantedFoodError("");
                                        }
                                    }}>Add
                                </MDBBtn>
                            </div>
                        </div>
                        <ul>
                            {wantedFood.map(value => {
                                return (
                                    <li>{value}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>*/}
            </div>
            <div className='d-flex'>
                <MDBBtn

                    disabled={props.loading}
                    className="background-color-primary color-background rounded z-depth-1 bold"
                    type="button"
                    onClick={async () => {
                        await setPage(0);
                       await submit();
                    }}>search
                </MDBBtn>
            </div>

            {props?.recipesSearchResponse?.maxPages > 1?
            <MDBPagination className="mb-5">
                <MDBPageItem disabled={page === 0 || props.loading}>
                    <MDBPageNav aria-label="Previous">
                                <span aria-hidden="true" onClick={() => {
                                    setPage(page - 1);
                                }}>Previous</span>
                    </MDBPageNav>
                </MDBPageItem>
                {
                    Array.from(Array(props.recipesSearchResponse.maxPages).keys()).map((value, index) => {
                        return (
                            <MDBPageItem active={index === page}
                                         disabled={props.loading}>
                                <MDBPageNav>
                                        <span onClick={() => {
                                            {
                                                setPage(index);
                                            }
                                        }}> {index} </span>
                                </MDBPageNav>
                            </MDBPageItem>
                        )
                    })
                }
                <MDBPageItem disabled={page === props.recipesSearchResponse.maxPages - 1 || props.loading}>
                    <MDBPageNav aria-label="Previous">
                                <span aria-hidden="true" onClick={() => {
                                    setPage(page + 1);
                                }}>Next</span>
                    </MDBPageNav>
                </MDBPageItem>
            </MDBPagination>:null}
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
                        <RecipesGrid recipes={props.recipesSearchResponse.recipes} heading={"Search result"}/>
                    </div>
                    : null
            }

        </MDBContainer>)

}


export default connect(mapStateToProps, mapDispatchToProps)(Explore)
