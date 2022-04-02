import logo from "../../../assets/images/logos/festeno_yellow2.svg";
import {Link, useLocation} from "react-router-dom";
import home_active from "../../../assets/images/common/home-active.svg";
import home from "../../../assets/images/common/home.svg";
import book_active from "../../../assets/images/common/book_active.svg";
import book from "../../../assets/images/common/book.svg";
import calendar_active from "../../../assets/images/common/calendar_active.svg";
import calendar from "../../../assets/images/common/calendar.svg";
import loupe_active from "../../../assets/images/common/loupe_active.svg";
import loupe from "../../../assets/images/common/loupe.svg";
import signOut_active from "../../../assets/images/common/sign-out-active.svg";
import signOut from "../../../assets/images/common/sign-out.svg";
import settings_active from "../../../assets/images/common/settings_active.svg";
import settings from "../../../assets/images/common/settings.svg";
import login_active from "../../../assets/images/common/login_active.svg";
import login from "../../../assets/images/common/login.svg";
import signUp_active from "../../../assets/images/common/signUp_active.svg";
import signUp from "../../../assets/images/common/signUp.svg";
import React, {useState} from "react";
import {HeaderProps, resolveNavLinkClass, resolveNavLinkWrapperClass} from "../AppHeader";
import {useTranslation} from "react-i18next";
import './BigScreenNav.css';
import {Routes} from "../../../util/Constants";

export function BigScreenNav(props: HeaderProps) {

    const {t, i18n} = useTranslation();
    const location = useLocation();
    const [exploreImg, setExploreImg] = useState('');
    const [feedImg, setFeedImage] = useState('');
    const [calendarImg, setCalendarImage] = useState('');
    const [bookImg, setBookImage] = useState('');
    const [signOutImg, setSignOutImg] = useState('');
    const [settingImg, setSettingsImg] = useState('');
    const [loginImage, setLoginImg] = useState('');
    const [signUpImage, setSignUpImg] = useState('');

    return (
        <div className='side-nav-wrapper'>
            <div className='side-nav d-flex flex-column py-5'>
                <div className='d-flex align-self-center px-5'>
                    <img src={logo} width={70} className='mb-3'/>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/", true)}>
                    <Link to={Routes.HOME}>
                        <div className={resolveNavLinkClass(location.pathname, "/", true)}

                             onMouseEnter={() => setFeedImage(home_active)}
                             onMouseLeave={() => setFeedImage('')}
                        >
                            <div className='mr-2 py-2'><img
                                src={feedImg !== '' ? feedImg : location.pathname === "/" ? home_active : home}
                                width={25}/>
                            </div>
                            <div className='align-self-center'>Feed</div>
                        </div>
                    </Link>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, Routes.EXPLORE, false)}>
                    <Link to={Routes.EXPLORE}>
                        <div className={resolveNavLinkClass(location.pathname, Routes.EXPLORE, false)}
                             onMouseEnter={() => setExploreImg(loupe_active)}
                             onMouseLeave={() => setExploreImg('')}>
                            <div className='mr-2 py-2'><img
                                src={exploreImg !== '' ? exploreImg : location.pathname.startsWith(Routes.EXPLORE) ? loupe_active : loupe}
                                width={25}/></div>
                            <div className='align-self-center'>Explore</div>
                        </div>
                    </Link>
                </div>
                {props.authenticated ?
                    <div className='mt-auto d-flex flex-column'>
                        <div className={'mt-auto align-self-center additional-action'}
                             onMouseEnter={() => setSignOutImg(signOut_active)}
                             onMouseLeave={() => setSignOutImg('')}>
                            <img src={signOutImg !== '' ? signOut_active : signOut} width={20}/>
                        </div>
                        <Link to={Routes.PROFILE}
                              className={location.pathname === Routes.PROFILE ? ' mt-3 align-self-center additional-action-active' : 'mt-3 align-self-center additional-action'}
                              onMouseEnter={() => setSettingsImg(settings_active)}
                              onMouseLeave={() => setSettingsImg('')}>
                            <img
                                src={settingImg !== '' || location.pathname === Routes.PROFILE ? settings_active : settings}
                                width={20}/>
                        </Link>
                        <div className='mt-3 align-self-center'>
                            <div className='profile-image-wrapper'>
                                <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
                                     className="rounded float-right profile-image" alt="aligment"/>
                                <div className='profile-image-status-online'>
                                </div>

                            </div>
                        </div>
                    </div> :
                    <div className='mt-auto d-flex flex-column'>

                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.LOGIN, true)}>
                            <Link to={Routes.LOGIN}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.LOGIN, false)}
                                     onMouseEnter={() => setLoginImg(login_active)}
                                     onMouseLeave={() => setLoginImg('')}>
                                    <div className='mr-2 py-2'><img
                                        src={loginImage !== '' ? loginImage : location.pathname.startsWith(Routes.LOGIN) ? login_active : login}
                                        width={25}/></div>
                                    <div className='align-self-center'>Login</div>
                                </div>
                            </Link>
                        </div>
                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.SIGNUP, true)}>
                            <Link to={Routes.SIGNUP}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.SIGNUP, false)}
                                     onMouseEnter={() => setSignUpImg(signUp_active)}
                                     onMouseLeave={() => setSignUpImg('')}>
                                    <div className='mr-2 py-2'><img
                                        src={signUpImage !== '' ? signUpImage : location.pathname.startsWith(Routes.SIGNUP) ? signUp_active : signUp}
                                        width={25}/></div>
                                    <div className='align-self-center'>Signup</div>
                                </div>
                            </Link>
                        </div>
                    </div>



                }

            </div>
        </div>
    )

}
