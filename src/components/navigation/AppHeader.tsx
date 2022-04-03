import React from 'react';
import './AppHeader.css';
import {isMobile} from "react-device-detect";
import {useMediaQuery} from 'react-responsive'
import {connect} from "react-redux";
import {BigScreenNav} from "./bigscreennav/BigScreenNav";
import {MediumScreenNav} from "./mediumscreennav/MediumScreenNav";
import {SmallScreenNav} from "./smallscreennav/SmallScreenNav";
import {User} from "../App";
import {AppState} from "../../redux/store/Store";
import {AppProps} from "../../index";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {
    loginActionCreator,
    loginRecoveryCodeActionCreator,
    loginTwoFactorActionCreator, logoutActionCreator
} from "../../redux/actiontype/UserActionTypes";
import {LoginRequest, TwoFactorLoginRequest} from "../user/login/Login";

export interface HeaderProps {
    authenticated: boolean
    onLogOut: () => void
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        onLogOut: () => dispatch(logoutActionCreator())
    };
};

function mapStateToProps(state: AppState, props: HeaderProps) {
    return {
        authenticated: state.userState.authenticated,
    }
}

function AppHeader(props: HeaderProps) {
    const isMediumScreen = useMediaQuery({query: '(max-width: 1400px)'});
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        isMobile || isSmallScreen
            ? <SmallScreenNav {...props} />
            : isMediumScreen
            ? <MediumScreenNav {...props} />
            : <BigScreenNav {...props} />
    )
}


export function resolveNavLinkWrapperClass(currentLocation: string, expectedLocation: string, exact: boolean): string {
    const result = exact ? currentLocation === expectedLocation : currentLocation.startsWith(expectedLocation);
    return result ? 'side-nav-link-wrapper-active d-flex justify-content-center' : 'side-nav-link-wrapper d-flex justify-content-center';
}

export function resolveNavLinkClass(currentLocation: string, expectedLocation: string, exact: boolean): string {
    const result = exact ? currentLocation === expectedLocation : currentLocation.startsWith(expectedLocation);
    return result ? 'd-flex flex-row side-nav-link-active align-self-center' : 'd-flex flex-row side-nav-link align-self-center';
}

export default connect(mapStateToProps,mapDispatchToProps)(AppHeader);
