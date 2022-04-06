import {Action, ActionCreator, AnyAction, Dispatch} from "redux";
import configureStore from "../store/Store";
import {ThunkAction} from "redux-thunk";
import {Recipe, RecipeOverview, RecommendedRecipe} from "../reducer/GeneralReducer";
import i18next from "i18next";
import API from "../../util/APIUtils";
import {AxiosResponse} from "axios";
import {RecipesPreferences} from "../../components/App";
import {RecipesSearchRequest, RecipesSearchResponse} from "../../components/explore/Explore";

export const IN_PROGRESS = "IN_PROGRESS";
export const SUCCESS = "SUCCESS";
export const DISMISS_SUCCESS = "DISMISS_SUCCESS";
export const FAILURE = "FAILURE";
export const DISMISS_FAILURE = "DISMISS_FAILURE";
export const INFO = "INFO";
export const DISMISS_INFO = "DISMISS_INFO";
export const WARNING = "WARNING";
export const DISMISS_WARNING = "DISMISS_WARNING";
export const DONE = "DONE";
export const LOAD_FEED = "LOAD_FEED";
export const LOAD_RECIPE_TAGS = "LOAD_RECIPE_TAGS";
export const LOAD_RECIPE = "LOAD_RECIPE";
export const RECIPES_SEARCH_RESULT = "RECIPES_SEARCH_RESULT";

export interface InProgressAction extends Action {
    type: typeof IN_PROGRESS,
    message: string;
}

export interface SuccessAction extends Action {
    type: typeof SUCCESS,
    message: string;
}

export interface DismissSuccess extends Action {
    type: typeof DISMISS_SUCCESS
}

export interface FailureAction extends Action {
    type: typeof FAILURE,
    message: string;
}

export interface DismissFailure extends Action {
    type: typeof DISMISS_FAILURE
}

export interface DoneAction extends Action {
    type: typeof DONE
}

export interface InfoAction extends Action {
    type: typeof INFO,
    message: string
}

export interface DismissInfo extends Action {
    type: typeof DISMISS_INFO
}

export interface WarningAction extends Action {
    type: typeof WARNING,
    message: string
}

export interface DismissWarning extends Action {
    type: typeof DISMISS_WARNING
}

export interface LoadFeed extends Action {
    type: typeof LOAD_FEED
    recipeOverviews: Array<RecommendedRecipe>

}

export interface RecipesSearchResult extends Action {
    type: typeof RECIPES_SEARCH_RESULT
    recipesSearchResponse: RecipesSearchResponse

}

export interface LoadRecipe extends Action {
    type: typeof LOAD_RECIPE
    recipe: Recipe

}

export interface LoadRecipeTags extends Action {
    type: typeof LOAD_RECIPE_TAGS
    recipeTags: Array<string>

}

export const inProgressActionCreator: ActionCreator<InProgressAction> = (message: string) => {
    return configureStore().dispatch({type: IN_PROGRESS, message: message});
};

export const successActionCreator: ActionCreator<SuccessAction> = (message: string) => {
    return configureStore().dispatch({type: SUCCESS, message: message});
};
export const failureActionCreator: ActionCreator<FailureAction> = (message: string) => {
    return configureStore().dispatch({type: FAILURE, message: message});
};
export const warningActionCreator: ActionCreator<WarningAction> = (message: string) => {
    return configureStore().dispatch({type: WARNING, message: message});
};
export const infoActionCreator: ActionCreator<InfoAction> = (message: string) => {
    return configureStore().dispatch({type: INFO, message: message});
};
export const doneActionCreator: ActionCreator<DoneAction> = () => {
    return configureStore().dispatch({type: DONE});
};
export const dismissSuccess: ActionCreator<DismissSuccess> = () => {
    return configureStore().dispatch({type: DISMISS_SUCCESS});
};
export const dismissWarning: ActionCreator<DismissWarning> = () => {
    return configureStore().dispatch({type: DISMISS_WARNING});
};
export const dismissInfo: ActionCreator<DismissInfo> = () => {
    return configureStore().dispatch({type: DISMISS_INFO});
};
export const dismissFailure: ActionCreator<DismissFailure> = () => {
    return configureStore().dispatch({type: DISMISS_FAILURE});
};

export const loadFeed: ActionCreator<ThunkAction<void,
    void,
    void,
    AnyAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Loading feed"));
        API({
            url: `${process.env.REACT_APP_REST_API_URL}/recommended`,
            method: 'GET'
        }).then((response) => {
            dispatch({type: LOAD_FEED, recipeOverviews: response.data})
            dispatch(doneActionCreator(""));
        }).catch(error => {
            dispatch(failureActionCreator((error.response && error.response.data && error.response.data.message) || i18next.t('ns1:defaultErrorMessage')));
            dispatch(doneActionCreator(""));
        });
    };
};

export const loadRecipe: ActionCreator<ThunkAction<void,
    void,
    void,
    AnyAction>> = (id:string) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Loading recipe"));
        API({
            url: `${process.env.REACT_APP_REST_API_URL}/recipes/recipe?id=${id}`,
            method: 'GET'
        }).then((response:AxiosResponse<Recipe>) => {
            console.log(response.data.title);
            dispatch({type: LOAD_RECIPE, recipe: response.data})
            dispatch(doneActionCreator(""));
        }).catch(error => {
            dispatch(failureActionCreator((error.response && error.response.data && error.response.data.message) || i18next.t('ns1:defaultErrorMessage')));
            dispatch(doneActionCreator(""));
        });
    };
};

export const searchRecipes: ActionCreator<ThunkAction<void,
    void,
    RecipesPreferences,
    AnyAction>> = (recipesSearchRequest: RecipesSearchRequest) => {
    return async (dispatch: Dispatch) => {
        dispatch(inProgressActionCreator("Searching recipes"));
        API({
            url: process.env.REACT_APP_REST_API_URL + "/recipes/search",
            method: 'POST',
            data: recipesSearchRequest
        }).then((response) => {
            dispatch({type: RECIPES_SEARCH_RESULT, recipesSearchResponse: response.data})
            dispatch(doneActionCreator(""));
        }).catch(error => {
            dispatch(failureActionCreator((error.response && error.response.data && error.response.data.message) || i18next.t('ns1:defaultErrorMessage')));
            dispatch(doneActionCreator(""));
        });
    };
};

export const getTags: ActionCreator<ThunkAction<void,
    void,
    void,
    AnyAction>> = () => {
    return async (dispatch: Dispatch) => {
        //dispatch(inProgressActionCreator("Searching recipes"));
        API({
            url: process.env.REACT_APP_REST_API_URL + "/recipes/tags",
            method: 'GET',
        }).then((response) => {
            dispatch({type: LOAD_RECIPE_TAGS, recipeTags: response.data})
            //dispatch(doneActionCreator(""));
        }).catch(error => {
            dispatch(failureActionCreator((error.response && error.response.data && error.response.data.message) || i18next.t('ns1:defaultErrorMessage')));
            //dispatch(doneActionCreator(""));
        });
    };
};

export type GeneralActionTypes =
    InProgressAction
    | FailureAction
    | DismissFailure
    | SuccessAction
    | DismissSuccess
    | DoneAction
    | InfoAction
    | DismissInfo
    | WarningAction
    | DismissWarning
    | LoadFeed
    | LoadRecipe
    | LoadRecipeTags
    | RecipesSearchResult;
