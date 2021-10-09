import {Action, ActionCreator, AnyAction, Dispatch} from "redux";
import configureStore from "../store/Store";
import {ThunkAction} from "redux-thunk";
import axios from "axios";
import {Recipe} from "../reducer/GeneralReducer";
import i18next from "i18next";
import API from "../../util/APIUtils";

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
    recipes: Array<Recipe>

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
            url: process.env.REACT_APP_REST_API_URL + "/recipes/feed",
            method: 'GET'
        }).then((response) => {
            dispatch({type: LOAD_FEED, recipes: response.data})
            dispatch(doneActionCreator(""));
        }).catch(error => {
            dispatch(failureActionCreator((error.response && error.response.data && error.response.data.message) || i18next.t('ns1:defaultErrorMessage')));
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
    | LoadFeed;
