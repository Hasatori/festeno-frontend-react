import React, {useState} from 'react';
import './Home.css';
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import plus from "../../assets/images/common/add.svg"
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import heart_empty from  "../../assets/images/common/heart_empty.svg";
import heart_filled from  "../../assets/images/common/heart_filled.svg";
import star_empty from  "../../assets/images/common/star_empty.svg";
import star_filled from  "../../assets/images/common/star_filled.svg";

export default function Home() {
    const streamers = new Array(50).fill('');
    const recipesForRow = new Array(4).fill('Recipe');
    const rows = new Array(6).fill('Recipe');
    const [watchingStreamer, setWatchingStreamer] = useState(false);
    const [streamerImg, setStreamerImg] = useState(`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`);
    const [comments, setComments] = useState<string[]>(["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]);
    const [comment, setComment] = useState("");
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    return (
        <div className={isSmallScreen?"mx-0 px-0 mt-5":"mx-0 px-0"}>
            <div className={watchingStreamer ? 'streaming-overlay visible' : 'streaming-overlay'}>
                <MDBCol md={"8"} sm={"12"} xs={"4"} className="streaming-container">
                    <div className="d-flex flex-column pt-5">
                        <div className="video-wrapper">
                            <iframe
                                className="video-frame"
                                src="https://www.youtube.com/embed/mhDJNfV7hjk"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                            <div className="d-flex flex-row video-icons-wrapper">
                                <div className="video-like video-icon mr-3"><MDBIcon icon="heart" size="2x"/></div>
                                <div className="video-comment video-icon"><MDBIcon icon="comment" size="2x"/></div>
                            </div>


                        </div>
                        <div className="d-flex flex-row mt-4">
                            <div>
                                <div className='streamer-image-wrapper'>
                                    <img
                                        src={streamerImg}
                                        className="streamer-image hoverable" alt="aligment"/>
                                    <div className='live-status'><small>Live</small></div>
                                </div>
                            </div>
                            <div className="ml-2 d-flex flex-column">
                                <div className=" h4-responsive">Andrea Smith</div>
                                <div>11 min</div>
                                <div className="long-text mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                                <div className="d-flex flex-row mt-3">
                                    <div className="align-self-center"><input
                                        placeholder="leave comment"
                                        type="text"
                                        className="form-control leave-comment-input"
                                        onKeyDown={(event => {
                                            if (event.key === "Enter") {
                                                setComments((oldComments: string[]) => [...oldComments, comment]);
                                                setComment("");
                                            }
                                        })}
                                        onChange={(event => {
                                            setComment(event.target.value)
                                        })}

                                        value={comment}

                                    /></div>
                                    <div>
                                        <MDBBtn className="color-background background-color-primary" onClick={() => {
                                            setComments((oldComments: string[]) => [...oldComments, comment]);
                                            setComment("")
                                        }}>Send</MDBBtn>
                                    </div>
                                </div>
                                <div className="mt-3 mb-3 h4-responsive">Comments</div>
                                {comments.map((comment) => {
                                    return ( <>
                                        <div className="d-flex flex-column mt-2">
                                            <div className="d-flex flex-row mb-2">
                                                <div className="align-self-center">
                                                    <div className='streamer-image-wrapper'>
                                                        <img
                                                            src={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`}
                                                            className="streamer-image-smaller hoverable" alt="aligment"/>
                                                    </div>
                                                </div>
                                                <div className="ml-2 d-flex flex-column">
                                                    <div className="h5-responsive">Name</div>
                                                    <div>Yesterday 2:37pm</div>
                                                </div>
                                            </div>
                                            <div className="long-text">{comment}</div>
                                        </div>
                                    </>)
                                })}
                            </div>
                        </div>

                    </div>
                    <div className="close-watching-streamer hover-pointer-cursor" onClick={() => {
                        setWatchingStreamer(false)
                    }}><MDBIcon icon="times" size={"2x"}/></div>
                </MDBCol>

            </div>
            <div
                className={watchingStreamer ? 'd-flex flex-column pt-4 pl-2 blur-strong' : 'd-flex flex-column pt-4 pl-2'}>
                <div className='d-flex flex-row'>
                    <div className='d-flex mr-3'>
                        <img src={plus} className="streamer-image"/>
                    </div>
                    {streamers.map((value, index) => {
                            const imgSrc = `https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`;
                            return <div className='d-flex mr-3'>
                                <div className='streamer-image-wrapper hover-pointer-cursor' onClick={() => {
                                    setWatchingStreamer(true);
                                    setStreamerImg(imgSrc);
                                }}>
                                    <img
                                        src={imgSrc}
                                        className="streamer-image hoverable" alt="aligment"/>
                                    {index % 5 === 0 ? <div className='live-status'><small>Live</small></div> : <></>}
                                </div>

                            </div>
                        }
                    )}
                </div>

                <div className='mt-5 flex-column mx-2'>
                    {rows.map(value => {
                        return (
                            <div className='mt-3'>
                                <MDBContainer fluid={false}>
                                <MDBRow>
                                    {recipesForRow.map((value,index) => {
                                        return (
                                            <MDBCol md='6' lg="3" sm="12" className='mt-5 px-4'>
                                                <Link to="/recipes/recipe/adasdad54536s4fg65ds4fa5s4f">
                                                <div className='d-flex flex-column recipe-wrapper z-depth-1'>

                                                   <div > <img className='recipe-image'
                                                         src={require(`../../assets/images/recipes/recipe${Math.floor(Math.random() * 50)}.jpg`)}/>
                                                   </div>
                                                    <div className='recipe-footer d-flex flex-column'>
                                                        <div className="mb-3 h6-responsive">Nejlepší pochutina světa</div>
                                                        <div className="d-flex flex-row justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div className="mr-1">
                                                                <img
                                                                    src={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${Math.floor(Math.random() * 15) + 1}.jpg`}
                                                                    className='recipe-author-image' alt="aligment"/>
                                                                </div>
                                                                <div className="d-flex flex-column">
                                                                    <small>Sexy koloušek</small>
                                                                    <small>
                                                                        2m
                                                                    </small>
                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-row">
                                                                <div className="mr-1"><img src={index%2==0?star_empty:star_filled} width={27}/></div>
                                                                <div className="ml-1"><img src={index%2==0?heart_empty:heart_filled} width={25}/></div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                </Link>
                                            </MDBCol>
                                        )
                                    })}
                                </MDBRow></MDBContainer>
                            </div>
                        )

                    })}

                </div>
            </div>
        </div>


    )
}


function ProfilePart() {

}
