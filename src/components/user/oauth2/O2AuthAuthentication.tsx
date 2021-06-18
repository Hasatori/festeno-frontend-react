import googleLogo from "../../../assets/images/logos/google-logo.svg";
import fbLogo from "../../../assets/images/logos/fb-logo.svg";
import githubLogo from "../../../assets/images/logos/github-logo.png";
import React from "react";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../../util/Constants";
import {connect} from "react-redux";
import {store} from "../../../index";
import {IN_PROGRESS} from "../../../redux/actiontype/GeneralActionTypes";
import i18next from "i18next";
import './O2Authentication.css';

export interface O2AuthAuthenticationProps {
    registration: boolean
}

function O2AuthAuthentication(props: O2AuthAuthenticationProps) {

    return (
        <div className="d-flex flex-row flex-center">
            <div className="mx-1 third-party-tile">
                <a href={GOOGLE_AUTH_URL(i18next.language)} onClick={() => {
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: props.registration ? 'Signing up with Google' : 'Logging in with Google'
                    });
                }}>
                    <img className="rounded" width={25} height={25} src={googleLogo}
                         alt="Google"/>
                </a></div>
            <div className="mx-1 third-party-tile">
                <a
                    onClick={() => {
                        store.dispatch({
                            type: IN_PROGRESS,
                            message: props.registration ? 'Signing up with Facebook' : 'Logging in with Facebook'
                        });
                    }} href={FACEBOOK_AUTH_URL(i18next.language)}>
                    <img className="rounded" src={fbLogo} width={25} height={25}
                         alt="Facebook"/> </a></div>

            <div className="mx-1 third-party-tile"><a
                onClick={() => {
                    store.dispatch({
                        type: IN_PROGRESS,
                        message: props.registration ? 'Signing up with Github' : 'Logging in with Github'
                    });
                }}
                href={GITHUB_AUTH_URL(i18next.language)}>
                <img className="rounded" width={25} height={25} src={githubLogo}
                     alt="Github"/>
            </a></div>

        </div>
    );
}

export interface O2AuthProps {
    registration: boolean;
}

export default connect()(O2AuthAuthentication);
