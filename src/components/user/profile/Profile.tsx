import "./Profile.css"
import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";


export default function Profile() {
    return (
        <MDBContainer>
            <MDBRow className="p-5">
                <MDBCol size="4" className="m-0">
                    <div className="d-flex flex-column">
                        <div className="h3-responsive text-center">Jane Smith</div>
                        <div className="long-text">Lorem Ipsum is simply dummy text of the printing and typesetting
                        </div>
                        <div className="d-flex flex-row white p-2">
                            <div className="d-flex flex-column">
                                <div className="text-center">23</div>
                                <div className="text-center">Recipes</div>
                            </div>
                            <div className="d-flex flex-column ml-3">
                                <div className="text-center">14</div>
                                <div className="text-center">Meal Plans</div>
                            </div>
                            <div className="d-flex flex-column ml-3">
                                <div className="text-center">21</div>
                                <div className="text-center">Stream</div>
                            </div>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol size="2" className="m-0">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-self-center">
                            <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"/>
                        </div>
                        <div className="d-flex flex-row white p-2">
                            <div className="d-flex flex-column">
                                <div className="text-center">124</div>
                                <div className="text-center">Followers</div>
                            </div>
                            <div className="d-flex flex-column ml-3">
                                <div className="text-center">15</div>
                                <div className="text-center">Following</div>
                            </div>
                        </div>
                    </div>


                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
