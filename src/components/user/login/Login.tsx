import React, {useEffect, useState} from 'react';
import './Login.css';
import {Link, RouteComponentProps} from 'react-router-dom'
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import O2AuthAuthentication from "../oauth2/O2AuthAuthentication";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import logo from "../../../assets/images/logos/festeno_yellow2.svg";
import {
    loginActionCreator,
    loginRecoveryCodeActionCreator,
    loginTwoFactorActionCreator
} from "../../../redux/actiontype/UserActionTypes";
import {AnyAction} from "redux";
import {AppState} from "../../../redux/store/Store";
import {failureActionCreator} from "../../../redux/actiontype/GeneralActionTypes";
import {store} from "../../../index";
import {useTranslation} from "react-i18next";
import {Routes} from "../../../util/Constants";
import TwoFactorCodeForm from "./TwoFactorCodeForm";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        login: (loginRequest: LoginRequest) => dispatch(loginActionCreator(loginRequest)),
        loginTwoFactor: (twoFactorLoginRequest: TwoFactorLoginRequest) => dispatch(loginTwoFactorActionCreator(twoFactorLoginRequest)),
        loginRecoveryCode: (twoFactorLoginRequest: TwoFactorLoginRequest) => dispatch(loginRecoveryCodeActionCreator(twoFactorLoginRequest))

    };
};

function mapStateToProps(state: AppState, props: LoginProps) {
    return {
        twoFactorRequired: state.userState.twoFactorRequired,
        loading: state.generalState.loading
    }
}

export interface LoginProps {
    login: (loginRequest: LoginRequest) => void;
    loginTwoFactor: (loginRequest: TwoFactorLoginRequest) => void,
    loginRecoveryCode: (loginRequest: TwoFactorLoginRequest) => void,
    twoFactorRequired: boolean,
    loading: boolean
}
export interface TwoFactorFormProps {
    loginTwoFactor: (code:string) => void
    loginRecoveryCode: (code:string) => void;
    userRecoveryCode:boolean
}

function Login(props: RouteComponentProps & LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [code, setCode] = useState("");
    const [recoveryCode, setRecoveryCode] = useState("");
    const [userRecoveryCode, setUseRecoveryCode] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {

        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        // @ts-ignore
        if (props.location.state && props.location.state.error) {
            setTimeout(() => {
                // @ts-ignore
                store.dispatch(failureActionCreator(props.location.state.error));
                props.history.replace({
                    pathname: props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    });

    function handleRegularLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: LoginRequest = {email: email, password: password, rememberMe: rememberMe,}
        props.login(loginRequest);

    }
        return (
            <div className="background-overlay">
            <MDBContainer className="custom-center-row">
                <MDBRow>
                    <MDBCol md="5" className="pt-5">
                        <div className='d-flex flex-column'>
                            <div className='d-flex align-self-center'><img src={logo} width={100} className='mb-3'/>
                            </div>
                            <div className='d-flex align-self-center my-font color-primary m-0 p-0'><h1
                                className='brand-text'>Festeno</h1></div>
                            <div className='align-self-end pr-5 color-secondary bold'><p className='m-0'>Be part of a culinary world,</p><p
                                className='pl-5 m-0'>Be connected by food</p></div>
                        </div>
                    </MDBCol>
                    <MDBCol md="1"/>
                    <MDBCol className='mt-5 mx-auto p-3' md='5' sm="8" center>
                        {!props.twoFactorRequired?
                        <>
                            <div className="mb-3"><span className="color-secondary">{t('ns1:newUserLoginQuestion')}</span>
                                <Link className="ml-1 link-yellow"
                                      to={Routes.SIGNUP}>{t('ns1:signupLabel')}!</Link></div>
                            <form onSubmit={handleRegularLogin}
                                  noValidate>
                                <label
                                    htmlFor="email"
                                    className="color-primary m-0 p-0"
                                >
                                    {t('ns1:usernameOrEmailLabel')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control background-color-grey border-grey color-secondary"
                                    value={email} onChange={(event) => setEmail(event.target.value)} required
                                />
                                <br/>
                                <br/>
                                <label
                                    htmlFor="password"
                                    className="color-primary m-0 p-0"
                                >
                                    {t('ns1:passwordLabel')}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control background-color-grey border-grey color-secondary"
                                    value={password} onChange={(event) => setPassword(event.target.value)} required
                                />
                                <br/>
                                <br/>
                                <div className="d-flex"><span className="link"> <Link className="link-yellow"
                                                                                      to={Routes.FORGOTTEN_PASSWORD}>{t('ns1:forgotPasswordQuestion')}</Link></span>
                                </div>
                                <div className='d-flex flex-row justify-content-around mt-3'>
                                    <div className='align-self-center flex-grow-1'><MDBBtn
                                        className="background-color-primary color-background rounded z-depth-1 w-100 bold"
                                        type="submit"
                                        disabled={props.loading}>{t('ns1:loginLabel')}</MDBBtn></div>
                                    <div className='align-self-center flex-grow-1 text-center color-secondary'>or</div>
                                    <div
                                        className='align-self-center flex-grow-0 px-2 py-1'>
                                        <O2AuthAuthentication {...props} registration={false}/>
                                    </div>
                                </div>
                            </form></>
                        : <TwoFactorCodeForm
                                loginTwoFactor={(code:string)=>{
                                    const loginRequest: TwoFactorLoginRequest = {
                                        email: email,
                                        password: password,
                                        rememberMe: rememberMe,
                                        code: code
                                    };
                                    props.loginTwoFactor(loginRequest);
                                }}
                                loginRecoveryCode={(code:string)=>{
                                    const loginRequest: TwoFactorLoginRequest = {
                                        email: email,
                                        password: password,
                                        rememberMe: rememberMe,
                                        code: code
                                    };
                                    props.loginRecoveryCode(loginRequest);
                                }}
                                userRecoveryCode={false}
                            />

                        }


                    </MDBCol>
                    <MDBCol md="1"/>


                </MDBRow>
            </MDBContainer>
            </div>
        );

}

export interface LoginRequest {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface TwoFactorLoginRequest {
    email: string,
    password: string,
    rememberMe: boolean,
    code: string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
