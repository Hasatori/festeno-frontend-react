import React from 'react';
import './About.css';
import {MDBBox, MDBCol, MDBContainer, MDBRow, MDBTypography} from "mdbreact";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";
import {Routes} from "../../util/Constants";
import about_search_sample from "../../assets/images/common/about_search_sample.png"
import preferences_sample_1 from "../../assets/images/common/preferences_sample_1.png"
import preferences_sample_2 from "../../assets/images/common/preferences_sample_2.jpg"
import preferences_sample_3 from "../../assets/images/common/preferences_sample_3.jpg"

export default function About() {

    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <MDBContainer className={isSmallScreen ? "mx-auto p-4 pt-2 mt-5" : "mx-auto p-5 mt-3"}>
            <div className="mb-5">
                <MDBTypography tag='h1' variant="h1-responsive" className="text-center ">
                    <strong>Festeno</strong>
                </MDBTypography>
            </div>

            <MDBTypography tag='h2' variant="h2-responsive">
                <strong >Get feed with recipes tailored just for you!</strong>
            </MDBTypography>
            <MDBBox tag='p' className="mt-5 lead">
                All you need to do is to just create an <Link className="ml-1 link-black"
                                                              to={Routes.SIGNUP}>account</Link> login and fill a short
                questionnaire.
            </MDBBox>

            <MDBRow className='border-light-grey'>
                <MDBCol lg="5" md="12" className="mb-4  mx-auto">
                    <img src={preferences_sample_1} className="img-fluid p-3" alt=""/>
                </MDBCol>
                <MDBCol lg="5" md="12" className="mb-4  mx-auto">
                    <img src={preferences_sample_2} className="img-fluid p-3" alt=""/>
                </MDBCol>
            </MDBRow>
            <MDBBox tag='p' className="mt-5 lead">
                Festeno will then prepare feed with recipes according to your preferences. Feed will be regularly
                updated so that you can always try something new!
            </MDBBox>
            <MDBRow className='border-light-grey'>
                <MDBCol lg="10" md="12" className="mb-4  mx-auto">
                    <img src={preferences_sample_3} className="img-fluid p-3" alt=""/>
                </MDBCol>
            </MDBRow>
            <div className='divider mt-3 mb-5'/>
            <MDBTypography tag='h2' variant="h2-responsive" className='mt-5'>
                <MDBBox><strong>Explore new recipes</strong></MDBBox>
            </MDBTypography>
            <MDBBox tag='p' className="mt-5">
                <Link className="ml-1 link-black"
                      to={Routes.EXPLORE}>Search</Link> your favourite recipes using various filters
            </MDBBox>
            <MDBRow className='border-light-grey'>
                <MDBCol lg="10" md="12" className="mb-4 mx-auto">
                    <img src={about_search_sample} className="img-fluid" alt=""/>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}
