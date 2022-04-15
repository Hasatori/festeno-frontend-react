import {
    DISMISS_SUCCESS,
    FAILURE,
    GeneralActionTypes,
    IN_PROGRESS,
    RecipesSearchResult,
    SUCCESS
} from "../actiontype/GeneralActionTypes";
import {Image, User} from "../../components/App";
import {RecipesSearchResponse} from "../../components/explore/Explore";


const initialState = {
    loading: false,
    feed: new Array<RecommendedRecipe>(),
    recipeTags: new Array<string>(),

} as GeneralState;

export interface GeneralState {
    loading: boolean,
    loadingMessage: string | undefined,
    failureMessage: string | undefined,
    successMessage: string | undefined,
    warningMessage: string | undefined,
    infoMessage: string | undefined,
    feed: Array<RecommendedRecipe>,
    recipeTags: Array<string>,
    recipesSearchResponse: RecipesSearchResponse,
    recipe: Recipe
}

export interface RecommendedRecipe {
    recipe: RecipeOverview,
    groupName: string
}

export interface RecipeOverview {
    id: string,
    title: string,
    cookingTimeInMinutes: number,
    rating: number,
    description: number,
    portions: number,
    author: User,
    overviewImage: Image
    tags: Array<string>
    isInFavourites: boolean,
}


export interface Ingredient {
    name: string,
    unit: string
}

export interface Fat {

    fatAmount: number,
    fatWeightUnit: string
}

export interface Energy {
    energyValue: number,
    energyUnit: string
}

export interface Carbohydrate {

    complex: number,
    sugar: number;
    carbohydrateAmountUnit: string,
    carbohydrateAmount: number

}

export interface Protein {
    animalBased: number,
    plantBased: number,
    proteinWeightUnit: string,
    proteinAmount: number

}

export interface Fiber {
    fiberValue: number,
    dietary: number,
    functional: number,
    fiberWeightUnit: string
}

export interface Salt {
    saltValue: number,
    saltWeightUnit: string

}

export interface Recipe {
    title: string,
    cookingTimeInMinutes: number,
    rating: number,
    description: number,
    portions: number,
    author: User,
    overviewImage: Image,
    tags: Array<string>,
    ingredients: Array<string>,
    recipeImages: Array<Image>
    cookingProcedureSteps: Array<string>
    carbohydrate: Carbohydrate,
    protein: Protein,
    fat: Fat,
    fiber: Fiber,
    salt: Salt
    energy: Energy
}

const notLoading = {
    loading: false,
    loadingMessage: undefined,
};
export default function generalReducer(state = initialState, action: GeneralActionTypes): GeneralState {

    switch (action.type) {
        case "IN_PROGRESS":
            return {
                ...state,
                loading: true,
                loadingMessage: action.message,
                failureMessage: undefined,
                successMessage: undefined,
                infoMessage: undefined
            };
        case "FAILURE":
            return {
                ...state,
                failureMessage: action.message
            };
        case "DISMISS_FAILURE":
            return {
                ...state,
                failureMessage: undefined
            };
        case "SUCCESS":
            return {
                ...state,
                successMessage: action.message
            };
        case "DISMISS_SUCCESS":
            return {
                ...state,
                successMessage: undefined
            };
        case "INFO":
            return {
                ...state,
                infoMessage: action.message
            };
        case "DISMISS_INFO":
            return {
                ...state,
                infoMessage: undefined
            };
        case "WARNING":
            return {
                ...state,
                warningMessage: action.message
            };
        case "DISMISS_WARNING":
            return {
                ...state,
                warningMessage: undefined
            };
        case "DONE":
            return {
                ...state,
                ...notLoading,
            };
        case "LOAD_FEED":
            return {
                ...state,
                feed: action.recipeOverviews
            }
        case "RECIPES_SEARCH_RESULT":
            return {
                ...state,
                recipesSearchResponse: action.recipesSearchResponse
            }
        case "LOAD_RECIPE":
            return {
                ...state,
                recipe: action.recipe
            }
        case "LOAD_RECIPE_TAGS":
            return {
                ...state,
                recipeTags: action.recipeTags
            }
        default:
            return state;
    }

}
