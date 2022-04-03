import React, {useState} from "react";
import "./Explore.css";
import {MDBBtn, MDBContainer} from "mdbreact";
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
    recipes: Array<RecipeOverview>
    searchRecipes: (foodPreferencesRequest: FoodPreferencesRequest) => void
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        searchRecipes: (foodPreferencesRequest: FoodPreferencesRequest) => dispatch(searchRecipes(foodPreferencesRequest))
    };
};

function mapStateToProps(state: AppState, props: ExploreProps) {
    return {
        loading: state.generalState.loading,
        loadingMessage: state.generalState.loadingMessage,
        recipes: state.generalState.searchedRecipes
    }
}

function Explore(props: ExploreProps) {
    const notSelectedOption = "Not selected";
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    const [dietType, setDietType] = useState<string | null>("Vegan");
    const dietTypes = ["Vegan", "Vegetarian", "Omnivore"];
    const [dietSubTypes, setDietSubTypes] = useState<Array<string>>([]);
    const specificDiets = ["Low fat", "Low carb", "High protein", "Gluten free", "Lactose free"];
    const [preferredCuisine, setPreferredCuisine] = useState<string>(notSelectedOption);
    const cuisines = [notSelectedOption, 'Italian', 'Thai', 'French', 'Japanese', 'Lebanese', 'Spanish', 'German', 'Korean', 'SouthAfrican', 'Australian', 'Caribbean', 'Greek', 'Filipino', 'Scottish', 'Indian', 'Mexican', 'Indonesian', 'Brazilian', 'Chinese', 'American'];
    function submit() {
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
            const request: FoodPreferencesRequest = {
                dietType: dietType,
                foodPreferences: foodPreferences,
            }
            props.searchRecipes(request);
        }
    }

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
                        <select  onChange={(event => {
                            setDietType(event.target.value)
                        })}>
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
                        <select  onChange={(event => {
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
            </div>
            <div className='d-flex'>
                <MDBBtn
                    className="background-color-primary color-background rounded z-depth-1 bold"
                    type="button"
                    onClick={() => {
                        submit();
                    }}>search
                </MDBBtn>
            </div>
            {props.loading?
                <div>
                    <CircleLoader
                        css={`margin:auto;`}
                        size={75}
                        color={"#123abc"}
                        loading={props.loading}
                    />
                    <h2 className="text-center">Loading recipes</h2>
                </div>:
                props.recipes?
                <div>
                    <RecipesGrid recipes={props.recipes} heading={"Search result"}/>
                </div>
                :null}
        </MDBContainer>)

}


export default connect(mapStateToProps, mapDispatchToProps)(Explore)
