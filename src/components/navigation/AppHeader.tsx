import React from 'react';
import './AppHeader.css';
import {AppProps} from "../../index";
import {isMobile} from "react-device-detect";
import {useMediaQuery} from 'react-responsive'
import {connect} from "react-redux";
import {BigScreenNav} from "./bigscreennav/BigScreenNav";
import {MediumScreenNav} from "./mediumscreennav/MediumScreenNav";
import {SmallScreenNav} from "./smallscreennav/SmallScreenNav";

function AppHeader(props: AppProps) {
    const isMediumScreen = useMediaQuery({query: '(max-width: 1400px)'});
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        isMobile || isSmallScreen
            ? <SmallScreenNav/>
            : isMediumScreen
            ? <MediumScreenNav/>
            : <BigScreenNav/>
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

export default connect()(AppHeader);
