import * as React from "react";
import {useState} from "react";
import './Signup.css';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {signUp} from "../../../redux/actiontype/UserActionTypes";
import {getFormControlClass, isEmailValid, isPasswordValid} from "../../../util/APIUtils";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import logo from "../../../assets/images/logos/festeno_yellow2.svg";
import {Routes} from "../../../util/Constants";

interface SignUpProps {
    signUp: (signUpRequest: SignUpRequest) => void;
    loading: boolean
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        signUp: (signUpRequest: SignUpRequest) => dispatch(signUp(signUpRequest))
    };
};

function Signup(props: SignUpProps) {
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [nameValidationStarted, setNameValidationStarted] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [emailValidationStarted, setEmailValidationStarted] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidationStarted, setPasswordValidationStarted] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const {t} = useTranslation();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        if (emailValid && passwordValid && nameValid) {
            const signUpRequest: SignUpRequest = {name: name, email: email, password: password}
            props.signUp(signUpRequest);
        }
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
                        <div className="mb-3"><span className="color-secondary">{t('ns1:alreadyHavenAnAccountQuestion')}</span>
                            <Link className="ml-1 link-yellow"
                                  to={Routes.LOGIN}>{t('ns1:loginLabel')}!</Link></div>
                            <form onSubmit={handleSubmit}
                                  noValidate>
                                <div className="form-item">
                                    <input type="text"
                                           className={getFormControlClass(nameValidationStarted, nameValid)+" background-color-grey border-grey color-secondary"}
                                           placeholder={t('ns1:nameLabel')}
                                           value={name} onChange={(event) => {
                                        setNameValidationStarted(true);
                                        setNameValid(event.target.value.length >= 4);
                                        setName(event.target.value);
                                    }} required

                                    />
                                    <small className='required error-color'><MDBIcon icon="asterisk"/></small>

                                    <div className="invalid-feedback text-left">
                                        {t('ns1:invalidNameMessage')}
                                    </div>
                                </div>
                                <div className="form-item">
                                    <input type="email"
                                           className={getFormControlClass(emailValidationStarted, emailValid)+" background-color-grey border-grey color-secondary"}
                                           placeholder={t('ns1:emailLabel')}
                                           value={email} onChange={(event) => {
                                        setEmailValidationStarted(true);
                                        setEmailValid(isEmailValid(event.target.value));
                                        setEmail(event.target.value);

                                    }} required

                                    />
                                    <small className='required error-color'><MDBIcon icon="asterisk"/></small>
                                    {emailValidationStarted && !isEmailValid(email)?
                                        <div className="text-left invalid-feedback visible">
                                            {t('ns1:invalidEmailMessage')}
                                        </div>:<></>}
                                </div>
                                <div className="form-item">

                                    <input type="password"
                                           className={getFormControlClass(passwordValidationStarted, passwordValid)+" background-color-grey border-grey color-secondary"}
                                           placeholder={t('ns1:passwordLabel')}
                                           value={password} onChange={(event) => {
                                        setPasswordValidationStarted(true);
                                        setPasswordValid(isPasswordValid(event.target.value));
                                        setPassword(event.target.value);

                                    }} required
                                    />
                                    <small className='required error-color'><MDBIcon icon="asterisk"/></small>
                                    <div className="invalid-feedback text-left">
                                        {t('ns1:invalidPasswordFormatMessage')}
                                    </div>

                                </div>
                                    <div className='align-self-center flex-grow-1'><MDBBtn
                                        className="background-color-primary color-background rounded z-depth-1 w-100 bold"
                                        type="submit"
                                        disabled={props.loading}>{t('ns1:signupLabel')}</MDBBtn></div>

                            </form>
                    </MDBCol>
                    <MDBCol md="1"/>


                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export interface SignUpRequest {
    name: string,
    email: string,
    password: string

}

export default connect(null, mapDispatchToProps)(Signup);
