import React from 'react';
import './Account.css';
import ChangePassword from "./ChangePassword";
import TwoFactorSetup from "./TwoFactorSetup";
import {connect} from "react-redux";
import CloseAccount from "./CloseAccount";
import Profile from "./Profile";
import {useTranslation} from "react-i18next";
import {MDBCol, MDBContainer, MDBRow, MDBTypography} from "mdbreact";
import {useMediaQuery} from "react-responsive";


function Account() {
    const {t} = useTranslation();
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <MDBContainer className={isSmallScreen ? "mx-auto p-4 pt-2 mt-5" : "mx-auto p-5 mt-3"}>
        <MDBRow>
            <MDBCol lg="1"/>
            <MDBCol  md="12" lg="10">
                    <div className="mb-5">
                        <MDBTypography tag='h1' variant="h1-responsive" className="text-center ">
                            <strong>{t('ns1:manageProfileHeading')}</strong>
                        </MDBTypography>
                    </div>
                <Profile {...{} as any}/>
                <ChangePassword {...{} as any}/>
                <TwoFactorSetup {...{} as any}/>
                <CloseAccount/>
            </MDBCol>
            <MDBCol  lg="1"/>
        </MDBRow>
        </MDBContainer>
    );

}

export default connect()(Account);

