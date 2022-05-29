import React from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBContainer} from 'mdbreact';
import {Routes} from "../../util/Constants";

function NotFound() {
    const {t} = useTranslation();
    return (

        <div>
            <div className="d-flex flex-center mt-5 p-2"><h1>404</h1></div>
            <div className="d-flex flex-center  p-2"><h2>{t('ns1:pageNotFoundMessage')}</h2></div>
            <div className="d-flex flex-center  p-2">
                <Link to={Routes.ABOUT}>
                    <MDBBtn className="background-color-primary color-background rounded bold">{t('ns1:goBackButton')}</MDBBtn>
                </Link></div>
        </div>);
}

export default NotFound;
