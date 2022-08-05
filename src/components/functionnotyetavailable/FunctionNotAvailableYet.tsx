import { MDBContainer } from "mdbreact";
import React from "react";
import {useMediaQuery} from "react-responsive";


export function FunctionNotAvailableYet(){
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <MDBContainer className={isSmallScreen?'pt-2 mt-5':'mt-3'} fluid={false}><p className="note note-info">
            <strong> Sorry, this feature is not available yet. We are working on it.</strong>
        </p></MDBContainer>
    )
}