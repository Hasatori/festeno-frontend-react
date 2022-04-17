import {DISMISS_SUCCESS, FAILURE, GeneralActionTypes, IN_PROGRESS, SUCCESS} from "../actiontype/GeneralActionTypes";
import {Image, User} from "../../components/App";
import {RecipesSearchResponse} from "../../components/explore/Explore";


const initialState = {
    loading: false,
    feed: new Array<RecommendedRecipe>(),
    recipeTags: new Array<string>(),
    favouriteRecipes: new Array<RecipeOverview>()

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
    recipe: Recipe,
    favouriteRecipes: Array<RecipeOverview>,
    redirectUrl: string | undefined
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
            const favIds = state.favouriteRecipes.map((recipeOverview)=>{return recipeOverview.id});
            return {
                ...state,
                feed: action.recipeOverviews.map((recommendedRecipe) => {
                    if (favIds.includes(recommendedRecipe.recipe.id)) {
                        return {
                            ...recommendedRecipe,
                            recipe: {
                                ...recommendedRecipe.recipe,
                                isInFavourites: true
                            }
                        }
                    }
                    return recommendedRecipe;
                })
            }
        case "RECIPES_SEARCH_RESULT":
            const favouriteIds = state.favouriteRecipes.map((recipeOverview)=>{return recipeOverview.id});
            const newRec = action.recipesSearchResponse.recipes.map((recipeOverview) => {
                if (favouriteIds.includes(recipeOverview.id)) {
                    return {
                        ...recipeOverview,
                        isInFavourites: true
                    }
                }
                return recipeOverview;})
            return {
                ...state,
                recipesSearchResponse: {
                    ...action.recipesSearchResponse,
                    recipes:newRec
                }
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
        case "ADD_TO_FAVOURITE":
            const newSearchResult = state.recipesSearchResponse?.recipes?.map((recipeOverview) => {
                if (recipeOverview.id === action.recipe.id) {
                    return {
                        ...recipeOverview,
                        isInFavourites: true
                    }
                }
                return recipeOverview;
            })
            const newFeed = state.feed.map((recommendedRecipe) => {
                if (recommendedRecipe.recipe.id === action.recipe.id) {
                    return {
                        ...recommendedRecipe,
                        recipe: {
                            ...recommendedRecipe.recipe,
                            isInFavourites: true
                        }
                    }
                }
                return recommendedRecipe;
            })
            return {
                ...state,
                recipesSearchResponse: {...state.recipesSearchResponse, recipes: newSearchResult},
                feed: newFeed,
                favouriteRecipes: [...state.favouriteRecipes,action.recipe]
            }
        case "LOAD_FAVOURITE_RECIPES":
            const favouriteRecipesIds = action.favouriteRecipes.map((recipeOverview)=>{return recipeOverview.id});
            const searchResult = state.recipesSearchResponse?.recipes?.map((recipeOverview) => {
                if (favouriteRecipesIds.includes(recipeOverview.id)) {
                    return {
                        ...recipeOverview,
                        isInFavourites: true
                    }
                }
                return recipeOverview;
            })
            const feed = state.feed.map((recommendedRecipe) => {
                if (favouriteRecipesIds.includes(recommendedRecipe.recipe.id)) {
                    return {
                        ...recommendedRecipe,
                        recipe: {
                            ...recommendedRecipe.recipe,
                            isInFavourites: true
                        }
                    }
                }
                return recommendedRecipe;
            })
            return {
                ...state,
                favouriteRecipes: action.favouriteRecipes.map((favRec)=>{return {...favRec, isInFavourites:true}}),
                recipesSearchResponse: {...state.recipesSearchResponse, recipes: searchResult},
                feed: feed
            }
        case "REDIRECT":
            return {
                ...state,
                redirectUrl: action.url
            }
        case "REDIRECT_DONE":
            return {
                ...state,
                redirectUrl: undefined
            }
        default:
            return state;
    }

}
