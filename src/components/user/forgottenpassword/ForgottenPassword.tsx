import React, {useState} from "react";
import {connect} from "react-redux";
import {forgottenPasswordRequest} from "../../../redux/actiontype/UserActionTypes";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useTranslation} from "react-i18next";
import './ForgottenPassword.css';
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import logo from "../../../assets/images/logos/festeno_yellow2.svg";
import {getFormControlClass, isEmailValid} from "../../../util/APIUtils";
import {Simulate} from "react-dom/test-utils";
import {Link} from "react-router-dom";
import {Routes} from "../../../util/Constants";


function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        forgottenPasswordRequest: (email: string) => dispatch(forgottenPasswordRequest(email))
    };
};

interface ForgottenPasswordProps {
    forgottenPasswordRequest: (email: string) => void;
}

function ForgottenPassword(props: ForgottenPasswordProps) {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [emailValidationStarted, setEmailValidationStarted] = useState(false);
    const {t} = useTranslation();

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        props.forgottenPasswordRequest(email);
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
                <form onSubmit={handleSubmit}>
                    <div className="mb-3"><span className="color-secondary"></span>
                        <Link className="ml-1 link-yellow"
                              to={Routes.LOGIN}>{t('ns1:loginLabel')}</Link></div>
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
                        {emailValidationStarted && !isEmailValid(email)?
                            <div className="text-left invalid-feedback visible">
                                {t('ns1:invalidEmailMessage')}
                            </div>:<></>}
                    </div>
                    <div className='align-self-center flex-grow-1'>
                        <MDBBtn
                            className="background-color-primary color-background rounded z-depth-1 w-100 bold  m-auto"
                            type="submit"
                        > {t('ns1:requestPasswordResetButtonLabel')}</MDBBtn>
                    </div>
                </form>
                    </MDBCol>
                    <MDBCol md="1"/>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(ForgottenPassword);
