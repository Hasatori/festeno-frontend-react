import React, {useEffect} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import AppHeader from './navigation/AppHeader';
import Home from './home/Home';
import Signup from './user/signup/Signup';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import NotFound from './notfound/NotFound';
import LoadingIndicator from './loading/LoadingIndicator';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import Login from "./user/login/Login";
import ForgottenPassword from "./user/forgottenpassword/ForgottenPassword";
import PasswordReset from "./user/forgottenpassword/PasswordReset";
import {PrivateRoute} from "./user/PrivateRoute";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {connect} from 'react-redux'
import Account from "./user/account/Account";
import {AppState} from "../redux/store/Store";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AnyAction} from "redux";
import {
    loadCurrentlyLoggedInUser,
    logoutActionCreator,
    refreshTokenActionCreator
} from "../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";

import {
    dismissFailure,
    dismissInfo,
    dismissSuccess,
    dismissWarning,
    FAILURE,
    INFO,
    SUCCESS,
    WARNING
} from "../redux/actiontype/GeneralActionTypes";
import ActivateAccount from "./user/activateaccount/ActivateAccount";
import {CookiesConsent} from "./modal/CookiesConsent";
import {AppProps, store} from "../index";
import ConfirmEmailChange from "./user/confirmemilchange/ConfirmEmailChange";
import Explore from "./explore/Explore";
import {Recipes} from "./recipes/Recipes";
import {DietPlan} from "./dietplan/DietPlan";
import Profile from "./user/profile/Profile";
import {Routes} from "../util/Constants";
import FoodPreferences from './foodpreferences/FoodPreferences';

function mapStateToProps(state: AppState, props: AppProps) {
    return {
        loading: state.generalState.loading,
        loadingMessage: state.generalState.loadingMessage,
        successMessage: state.generalState.successMessage,
        failureMessage: state.generalState.failureMessage,
        warningMessage: state.generalState.warningMessage,
        infoMessage: state.generalState.infoMessage,
        authenticated: state.userState.authenticated,
        loggedIn: state.userState.loggedIn,
        user: state.userState.currentUser,
        accessToken: state.userState.accessToken
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        loadCurrentUser: () => dispatch(loadCurrentlyLoggedInUser()),
        onLogOut: () => dispatch(logoutActionCreator()),
        refreshToken: () => dispatch(refreshTokenActionCreator())
    };
};

function toastEmitter(type: string): ToastOptions {
    let dismissOnClose: <T = {}>(props: T) => void = () => {
    };
    let autoClose: number | false = false;
    switch (type) {
        case SUCCESS:
            dismissOnClose = () => {
                store.dispatch(dismissSuccess())
            };
            autoClose = 3000;
            break;
        case WARNING:
            dismissOnClose = () => {
                store.dispatch(dismissWarning())
            };
            autoClose = 5000;
            break;
        case FAILURE:
            dismissOnClose = () => {
                store.dispatch(dismissFailure())
            };
            autoClose = false;
            break;
        case INFO:
            dismissOnClose = () => {
                store.dispatch(dismissInfo())
            };
            autoClose = 5000;
            break;
    }
    return {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClose: dismissOnClose
    }
};

function App(appProps: AppProps) {
    const location = useLocation();
    const showMenu = location.pathname !== "/login" && location.pathname !== Routes.SIGNUP
    useEffect(() => {
        if (typeof appProps.warningMessage !== "undefined") {
            toast.warning('⚠    ' + appProps.warningMessage, toastEmitter(WARNING));
        }
    }, [appProps.warningMessage]);

    useEffect(() => {
        if (typeof appProps.infoMessage !== "undefined") {
            toast.info('ℹ   ' + appProps.infoMessage, toastEmitter(INFO));
        }
    }, [appProps.infoMessage]);
    useEffect(() => {
        if (typeof appProps.successMessage !== "undefined") {
            toast.success('✔    ' + appProps.successMessage, toastEmitter(SUCCESS));
        }
    }, [appProps.successMessage]);
    useEffect(() => {
        if (typeof appProps.failureMessage !== "undefined") {
            toast.error('❕  ' + appProps.failureMessage, toastEmitter(FAILURE));
        }
    }, [appProps.failureMessage]);
    useEffect(() => {
        if (appProps.loggedIn) {
            appProps.loadCurrentUser();
        }
    }, [appProps.loggedIn])
    useEffect(() => {
        if (!appProps.loggedIn) {
            appProps.refreshToken();
        }
    }, []);
    useEffect(() => {
        if (appProps.loading) {
            toast.dismiss();
        }
    }, [appProps.loading])

    return (

        <div className="app">
            <CookiesConsent/>
            <div className='d-flex flex-row'>
                {(showMenu ? <div><AppHeader {...appProps}/></div> : <></>)}
                <div className='flex-grow-1 app-body'>
                    <Switch>
                        <Route exact path={Routes.EXPLORE} component={Explore}/>
                        <Route path={Routes.RECIPES} render={(props) => <Recipes  {...appProps} />}/>
                        <PrivateRoute
                            path={[Routes.HOME]}
                            {...{
                                authenticated: appProps.authenticated,
                                authenticationPath: Routes.LOGIN,
                                redirectPathOnAuthentication: Routes.HOME
                            }} exact={true}
                            render={(props) => <Home loading={appProps.loading} feed={[]} loadFeed={() => {
                            }} user={appProps.user}/>}/>
                        <PrivateRoute
                            path={"/preferences"}
                            {...{
                                authenticated: appProps.authenticated,
                                authenticationPath: Routes.LOGIN,
                                redirectPathOnAuthentication: "/preferences"
                            }} exact={true}
                            render={(props) =>
                                <FoodPreferences
                                    loading={appProps.loading}
                                    loadingMessage={appProps.loadingMessage}
                                />}/>
                        <PrivateRoute
                            path={[Routes.DIET_PLAN]}
                            {...{
                                authenticated: appProps.authenticated,
                                authenticationPath: Routes.LOGIN,
                                redirectPathOnAuthentication: Routes.DIET_PLAN
                            }} exact={true}
                            render={(props) => <DietPlan/>}/>
                        <PrivateRoute
                            path={[Routes.PROFILE]}
                            {...{
                                authenticated: appProps.authenticated,
                                authenticationPath: Routes.LOGIN,
                                redirectPathOnAuthentication: Routes.PROFILE
                            }} exact={true}
                            render={(props) => <Profile/>}/>

                        <PrivateRoute
                            path={[Routes.ACCOUNT]}
                            {...{
                                authenticated: appProps.authenticated,
                                authenticationPath: Routes.LOGIN,
                                redirectPathOnAuthentication: Routes.ACCOUNT
                            }} exact={true}
                            render={(props) => <Account/>}/>

                        <Route path={Routes.LOGIN}
                               render={(props) => appProps.authenticated ? <Redirect to='account'/> :
                                   <Login twoFactorRequired={false} login={() => {
                                   }} loginTwoFactor={() => {
                                   }} loginRecoveryCode={() => {
                                   }} loading={appProps.loading}  {...props} />}/>
                        <Route path={Routes.SIGNUP}
                               render={(props) => <Signup {...appProps} />}/>
                        <Route path={Routes.FORGOTTEN_PASSWORD}
                               render={(props) => <ForgottenPassword {...props}/>}/>
                        <Route path={Routes.PASSWORD_RESET}
                               render={(props) => <PasswordReset {...props}/>}/>
                        <Route path={Routes.OAUTH2_REDIRECT}
                               render={(props) => <OAuth2RedirectHandler {...appProps}{...props}/>}/>
                        <Route path={`${Routes.ACTIVATE_ACCOUNT}*`}
                               render={(props) => <ActivateAccount {...appProps}{...props}/>}/>
                        <Route path={`${Routes.CONFIRM_EMAIL_CHANGE}*`}
                               render={(props) => <ConfirmEmailChange {...appProps}{...props}/>}/>
                        <Route component={NotFound}/>
                    </Switch>

                </div>
            </div>


            <ToastContainer newestOnTop={true}/>
            {/*  <Footer/>*/}
        </div>

    );
}

export interface RecipesPreferences {
    mainDietType: string
}

export interface User {
    name: string;
    email: string;
    profileImage: Image;
    twoFactorEnabled: boolean;
    backupCodes: string[]
    recipesPreferences: RecipesPreferences
}

export interface Image {
    name?: string;
    type?: string;
    data?: string;
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
