import React, {useState} from "react";
import {getFormControlClass, getUrlParameter, isPasswordValid} from "../../../util/APIUtils";
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {resetPassword} from "../../../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useTranslation} from "react-i18next";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import logo from "../../../assets/images/logos/festeno_yellow2.svg";
import './PasswordReset.css';

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        resetPassword: (resetPasswordRequest: ResetPasswordRequest) => dispatch(resetPassword(resetPasswordRequest))
    };
};

interface PasswordResetProps {
    resetPassword: (resetPasswordRequest: ResetPasswordRequest) => void;
}

function PasswordReset(props: PasswordResetProps & RouteComponentProps) {

    const [password, setPassword] = useState('');
    const [passwordValidationStarted, setPasswordValidationStarted] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckValidationStarted, setPasswordCheckValidationStarted] = useState(false);
    const [passwordCheckValid, setPasswordCheckValid] = useState(false);
    const token = getUrlParameter(props.location.search, 'token');
    const email = getUrlParameter(props.location.search, 'email');
    const {t} = useTranslation();
    console.log(token);
    if (token === '' || email === '') {
        props.history.push("/login");
    }

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (passwordValid && passwordCheckValid) {
            props.resetPassword({email: email, password: password, token: token})
        }
    }

    return (<div className="background-overlay">
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
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <input type="password" name="password"
                               className={getFormControlClass(passwordValidationStarted, passwordValid)+" background-color-grey border-grey color-secondary"}
                               placeholder={t('ns1:passwordLabel')}
                               value={password} onChange={(event) => {
                            setPasswordValidationStarted(true);
                            setPasswordValid(isPasswordValid(event.target.value));
                            setPasswordCheckValidationStarted(true);
                            setPasswordCheckValid(event.target.value === passwordCheck);
                            setPassword(event.target.value);

                        }} required/>
                        <div className="invalid-feedback text-left">
                            {t('ns1:invalidPasswordFormatMessage')}
                        </div>
                    </div>
                    <div className="form-item">
                        <input type="password" name="passwordCheck"
                               className={getFormControlClass(passwordCheckValidationStarted, passwordCheckValid)+" background-color-grey border-grey color-secondary"}
                               placeholder={t('ns1:confirmPasswordLabel')}
                               value={passwordCheck} onChange={(event) => {
                            setPasswordCheckValidationStarted(true);
                            setPasswordCheckValid(password === event.target.value);
                            setPasswordCheck(event.target.value)

                        }} required/>
                        <div className="invalid-feedback text-left">
                            {t('ns1:invalidPasswordFormatMessage')}
                        </div>
                    </div>
                    <div className="form-item">
                        <MDBBtn
                            className="background-color-primary color-background rounded z-depth-1 w-100 bold  m-auto"
                            type="submit">{t('ns1:requestPasswordResetButtonLabel')}</MDBBtn>
                    </div>
                </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
            );
            }

export interface ResetPasswordRequest {

    email: string;
    password: string;
    token: string;
}

export default connect(null, mapDispatchToProps)(PasswordReset);
