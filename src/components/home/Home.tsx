import React from 'react';
import './Home.css';
import {MDBCol, MDBRow} from "mdbreact";
import plus from "../../assets/images/common/add.svg"

export default function Home() {
    const streamers = new Array(50).fill('');
    const recipesForRow = new Array(4).fill('Recipe');
    const rows = new Array(6).fill('Recipe');
    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row'>
                <div className='d-flex mr-3'>
                    <img src={plus} className="streamer-image"/>
                </div>
                {streamers.map((value, index) => {
                    return <div className='d-flex mr-3'>
                        <div className='streamer-image-wrapper'>
                            <img
                                src={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`}
                                className="streamer-image" alt="aligment"/>
                            {index % 5 === 0 ? <div className='live-status'><small>Live</small></div> : <></>}

                        </div>

                    </div>
                })}
            </div>
            <div className='mt-5 flex-column mx-5'>
                {rows.map(value => {
                    return(
                        <div className='mt-3'>
                            <MDBRow>
                                {recipesForRow.map(value => {
                                    return (
                                        <MDBCol md='6' xl='3' className='mt-5'>
                                            <div className='recipe-wrapper'>

                                                <img className='recipe-image'
                                                     src={require(`../../assets/images/recipes/recipe${Math.floor(Math.random() * 50)}.jpg`)}/>

                                                <div className='recipe-author'>
                                                    <div className='d-flex flex-row'>
                                                        <div> <img
                                                            src={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`}
                                                            className='recipe-author-image' alt="aligment"/></div>
                                                        <div className='ml-2 d-flex flex-column '>
                                                            <div><small className='hr-bold'>Pepa</small></div>
                                                            <div><small>2m</small></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='recipe-header'>

                                                </div>
                                                <div className='recipe-body'>

                                                </div>
                                                <div className='recipe-name'>Nejlepší pochutina světa</div>
                                            </div>
                                        </MDBCol>
                                    )
                                })}
                            </MDBRow>
                        </div>
                    )

                })}

            </div>
        </div>

    )
}


function ProfilePart() {

}
