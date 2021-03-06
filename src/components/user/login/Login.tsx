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

    function handleTwoFactorLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: TwoFactorLoginRequest = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            code: code
        };
        props.loginTwoFactor(loginRequest);
    }

    function handleRecoveyCodeLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        const loginRequest: TwoFactorLoginRequest = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            code: recoveryCode
        };
        props.loginRecoveryCode(loginRequest);
    }

    if (!props.twoFactorRequired) {
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
                        <div className="mb-3"><span className="color-secondary">{t('ns1:newUserLoginQuestion')}</span>
                            <Link className="ml-1 link-yellow"
                                  to="/signup">{t('ns1:signupLabel')}!</Link></div>
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
                                to="/forgotten-password">{t('ns1:forgotPasswordQuestion')}</Link></span>
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


                        </form>

                        {/*   </MDBCardBody>
                            <MDBCardFooter>
                                <div className="text-center mb-1">{t('ns1:orLoginWithSuggestion')}</div>

                                {<O2AuthAuthentication {...props} registration={false}/>}
                            </MDBCardFooter>
                        </MDBCard>*/}
                    </MDBCol>
                    <MDBCol md="1"/>


                </MDBRow>
            </MDBContainer>
            </div>
        );
    } else if (userRecoveryCode) {
        return (<MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>

                            <MDBCardBody>
                                <p className="h4 text-center">{t('ns1:loginHeading')}</p>
                                <form onSubmit={handleRecoveyCodeLogin}>
                                    <label
                                        htmlFor="code"
                                        className="grey-text font-weight-light"
                                    >
                                        {t('ns1:recoveryCodeLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        className="form-control"
                                        value={recoveryCode} onChange={(event) => setRecoveryCode(event.target.value)}
                                        required
                                    />
                                    <div className="text-center py-4 mt-3">
                                        <div className="text-center my-2">

                                            <button className="btn btn-block btn-primary p-1" type="submit"
                                                    disabled={props.loading}>{t('ns1:loginLabel')}</button>
                                        </div>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3"/>
                </MDBRow>
            </MDBContainer>
        )
    } else {
        return (
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>

                            <MDBCardBody>
                                <p className="h4 text-center">{t('ns1:loginHeading')}</p>
                                <form onSubmit={handleTwoFactorLogin}>
                                    <label
                                        htmlFor="code"
                                        className="grey-text font-weight-light"
                                    >
                                        {t('ns1:twoFactorCodeLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        className="form-control"
                                        value={code} onChange={(event) => setCode(event.target.value)} required
                                    />
                                    <div className="text-center py-4 mt-1">
                                        <div className="text-center my-2">

                                            <button className="btn btn-block btn-primary p-1" type="submit"
                                                    disabled={props.loading}>{t('ns1:loginLabel')}</button>
                                        </div>
                                    </div>
                                </form>
                                <span
                                    className="font-weight-light-blue flex-center">{t('ns1:havingProblemsLoginTwoFactorQuestion')}
                                    <Link
                                        className="ml-1" onClick={() => {
                                        setUseRecoveryCode(true)
                                    }}
                                        to="#">{t('ns1:useRecoveryCodeLabel')}</Link></span>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="3"/>
                </MDBRow>
            </MDBContainer>)
    }
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
