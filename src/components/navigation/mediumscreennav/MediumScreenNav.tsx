import logo from "../../../assets/images/logos/festeno_yellow2.svg";
import home_active from "../../../assets/images/common/home-active.svg";
import {MDBNavLink} from "mdbreact";
import home from "../../../assets/images/common/home.svg";
import book_active from "../../../assets/images/common/book_active.svg";
import book from "../../../assets/images/common/book.svg";
import calendar_active from "../../../assets/images/common/calendar_active.svg";
import calendar from "../../../assets/images/common/calendar.svg";
import loupe_active from "../../../assets/images/common/loupe_active.svg";
import loupe from "../../../assets/images/common/loupe.svg";
import signOut_active from "../../../assets/images/common/sign-out-active.svg";
import signOut from "../../../assets/images/common/sign-out.svg";
import {Link, useLocation} from "react-router-dom";
import settings_active from "../../../assets/images/common/settings_active.svg";
import settings from "../../../assets/images/common/settings.svg";
import React, {useState} from "react";
import {HeaderProps, resolveNavLinkClass, resolveNavLinkWrapperClass} from "../AppHeader";
import {useTranslation} from "react-i18next";
import "./MediumScreenNav.css"
import {Routes} from "../../../util/Constants";
import login_active from "../../../assets/images/common/login_active.svg";
import login from "../../../assets/images/common/login.svg";
import signUp_active from "../../../assets/images/common/signUp_active.svg";
import signUp from "../../../assets/images/common/signUp.svg";
import about_active from "../../../assets/images/common/about_active.svg";
import about from "../../../assets/images/common/about.svg";
import favourite_active from "../../../assets/images/common/favourite_active.svg";
import favourite from "../../../assets/images/common/favourite.svg";


export function MediumScreenNav(props: HeaderProps) {
    const {t, i18n} = useTranslation();
    const location = useLocation();
    const [aboutImg, setAboutImage] = useState('');
    const [exploreImg, setExploreImg] = useState('');
    const [feedImg, setFeedImage] = useState('');
    const [calendarImg, setCalendarImage] = useState('');
    const [bookImg, setBookImage] = useState('');
    const [signOutImg, setSignOutImg] = useState('');
    const [settingImg, setSettingsImg] = useState('');
    const [loginImage, setLoginImg] = useState('');
    const [signUpImage, setSignUpImg] = useState('');
    const [favouriteImg, setFavouriteImg] = useState('');
    return (
        <div className='side-nav-wrapper'>
            <div className='side-nav-collapsed pb-5 d-flex flex-column'>
                <div className='d-flex align-self-center mt-3 mb-3'>
                    <img src={logo} width={35}></img>
                </div>

                <div className={resolveNavLinkClass(location.pathname, Routes.ABOUT, true) + '  align-self-center'}
                     onMouseEnter={() => setAboutImage(about_active)}
                     onMouseLeave={() => setAboutImage('')}>
                    <div className='py-2'><MDBNavLink to={Routes.ABOUT} link><img
                        src={aboutImg !== '' ? aboutImg : location.pathname === Routes.ABOUT ? about_active : about}
                        width={25}/></MDBNavLink>
                    </div>
                </div>
                {props.authenticated ?
                    <div className={resolveNavLinkClass(location.pathname, Routes.FEED, true) + '  align-self-center'}
                         onMouseEnter={() => setFeedImage(home_active)}
                         onMouseLeave={() => setFeedImage('')}>
                        <div className='py-2'><MDBNavLink to={Routes.FEED} link><img
                            src={feedImg !== '' ? feedImg : location.pathname === Routes.FEED ? home_active : home}
                            width={25}/></MDBNavLink>
                        </div>
                    </div> : null
                }
                {props.authenticated ?  <div
                    className={resolveNavLinkClass(location.pathname, Routes.FAVOURITE_RECIPES, false) + '  align-self-center'}
                    onMouseEnter={() => setFavouriteImg(favourite_active)}
                    onMouseLeave={() => setFavouriteImg('')}>
                    <div className='py-2'><MDBNavLink to={Routes.FAVOURITE_RECIPES} link><img
                        src={favouriteImg !== '' ? favouriteImg : location.pathname.startsWith(Routes.FAVOURITE_RECIPES) ? favourite_active : favourite}
                        width={25}/></MDBNavLink></div>
                </div>: null
                }
                <div
                    className={resolveNavLinkClass(location.pathname, Routes.EXPLORE, false) + '  align-self-center'}
                    onMouseEnter={() => setExploreImg(loupe_active)}
                    onMouseLeave={() => setExploreImg('')}>
                    <div className='py-2'><MDBNavLink to={Routes.EXPLORE} link><img
                        src={exploreImg !== '' ? exploreImg : location.pathname.startsWith(Routes.EXPLORE) ? loupe_active : loupe}
                        width={25}/></MDBNavLink></div>
                </div>

                {props.authenticated ?
                    <div className='mt-auto d-flex flex-column'>
                        <div className={'mt-auto align-self-center additional-action'}
                             onClick={() => props.onLogOut()}
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
                    </div>:
                    <div className='mt-auto d-flex flex-column'>

                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.LOGIN, true)}>
                            <Link to={Routes.LOGIN}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.LOGIN, false)}
                                     onMouseEnter={() => setLoginImg(login_active)}
                                     onMouseLeave={() => setLoginImg('')}>
                                    <div className='mr-2 py-2'><img
                                        src={loginImage !== '' ? loginImage : location.pathname.startsWith(Routes.LOGIN) ? login_active : login}
                                        width={25}/></div>
                                </div>
                            </Link>
                        </div>
                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.SIGNUP, true)}>
                            <Link to={Routes.SIGNUP}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.SIGNUP, false)}
                                     onMouseEnter={() => setSignUpImg(signUp_active)}
                                     onMouseLeave={() => setSignUpImg('')}>
                                    <div className='mr-2 py-2 mx-auto'><img
                                        src={signUpImage !== '' ? signUpImage : location.pathname.startsWith(Routes.SIGNUP) ? signUp_active : signUp}
                                        width={25}/></div>
                                </div>
                            </Link>
                        </div>
                    </div>

                }

            </div>
        </div>

    )

}
