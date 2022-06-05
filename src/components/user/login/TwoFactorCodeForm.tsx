import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {TwoFactorFormProps} from "./Login";
import {Routes} from "../../../util/Constants";

export default function TwoFactorCodeForm(twoFactorFormProps: TwoFactorFormProps) {
    const {t} = useTranslation();
    const [code, setCode] = useState("");
    const [userRecoveryCode, setUseRecoveryCode] = useState(twoFactorFormProps.userRecoveryCode);
    const [recoveryCode, setRecoveryCode] = useState("");

    function handleTwoFactorLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        twoFactorFormProps.loginTwoFactor(code);
    }

    function handleRecoveryCodeLogin(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        twoFactorFormProps.loginRecoveryCode(recoveryCode);
    }

    if (userRecoveryCode) {
        return (
            <form onSubmit={handleRecoveryCodeLogin}>
                <label
                    htmlFor="code"
                    className="color-primary m-0 p-0"
                >
                    {t('ns1:recoveryCodeLabel')}
                </label>
                <input
                    type="text"
                    id="code"
                    className="form-control background-color-grey border-grey color-secondary"
                    value={recoveryCode} onChange={(event) => setRecoveryCode(event.target.value)}
                    required
                />
                <div className="text-center py-4 mt-3">
                    <div className="text-center my-2">

                        <MDBBtn className="background-color-primary color-background rounded z-depth-1 w-100 bold"
                                type="submit"
                        >{t('ns1:loginLabel')}</MDBBtn>
                    </div>
                </div>
                <div className="mb-3">
                    <Link
                        className="ml-1 link-yellow" onClick={() => {
                        setUseRecoveryCode(false)
                    }}
                        to="#">{t('ns1:goBackButton')}</Link>
                </div>
            </form>
        )
    } else {
        return (
            <>
                <form onSubmit={handleTwoFactorLogin}>
                    <label
                        htmlFor="code"
                        className="color-primary m-0 p-0"
                    >
                        {t('ns1:twoFactorCodeLabel')}
                    </label>
                    <input
                        type="text"
                        id="code"
                        className="form-control background-color-grey border-grey color-secondary"
                        value={code} onChange={(event) => setCode(event.target.value)} required
                    />
                    <div className="text-center py-4 mt-1">
                        <div className="text-center my-2">

                            <MDBBtn className="background-color-primary color-background rounded z-depth-1 w-100 bold"
                                    type="submit"
                            >{t('ns1:loginLabel')}</MDBBtn>
                        </div>
                    </div>
                </form>
                <div className="mb-3"><span
                    className="color-secondary">{t('ns1:havingProblemsLoginTwoFactorQuestion')}</span>
                    <Link
                        className="ml-1 link-yellow" onClick={() => {
                        setUseRecoveryCode(true)
                    }}
                        to="#">{t('ns1:useRecoveryCodeLabel')}</Link>
                </div>
                <div className="mb-3"><span className="color-secondary"/>
                    <Link className="ml-1 link-yellow"
                          to={Routes.LOGIN}>{t('ns1:goBackButton')}</Link></div>
            </>
        )
    }
}
