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
import {resolveNavLinkClass} from "../AppHeader";
import {useTranslation} from "react-i18next";
import "./MediumScreenNav.css"

export function MediumScreenNav() {
    const {t, i18n} = useTranslation();
    const location = useLocation();
    const [exploreImg, setExploreImg] = useState('');
    const [feedImg, setFeedImage] = useState('');
    const [calendarImg, setCalendarImage] = useState('');
    const [bookImg, setBookImage] = useState('');
    const [signOutImg, setSignOutImg] = useState('');
    const [settingImg, setSettingsImg] = useState('');
    return (
        <div className='side-nav-wrapper'>
            <div className='side-nav-collapsed pb-5 d-flex flex-column'>
                <div className='d-flex align-self-center mt-3 mb-3'>
                    <img src={logo} width={35}></img>
                </div>
                <div className={resolveNavLinkClass(location.pathname, "/", true) + '  align-self-center'}
                     onMouseEnter={() => setFeedImage(home_active)}
                     onMouseLeave={() => setFeedImage('')}>
                    <div className='py-2'><MDBNavLink to="/" link><img
                        src={feedImg !== '' ? feedImg : location.pathname === "/" ? home_active : home}
                        width={25}/></MDBNavLink>
                    </div>
                </div>
                <div
                    className={resolveNavLinkClass(location.pathname, "/recipes", false) + '  align-self-center'}
                    onMouseEnter={() => setBookImage(book_active)}
                    onMouseLeave={() => setBookImage('')}>
                    <div className='py-2'><MDBNavLink to="/recipes" link><img
                        src={bookImg !== '' ? bookImg : location.pathname.startsWith("/recipes") ? book_active : book}
                        width={25}/></MDBNavLink></div>
                </div>
                <div
                    className={resolveNavLinkClass(location.pathname, "/diet-plan", false) + '  align-self-center'}
                    onMouseEnter={() => setCalendarImage(calendar_active)}
                    onMouseLeave={() => setCalendarImage('')}>
                    <div className='py-2'><MDBNavLink to="/diet-plan" link><img
                        src={calendarImg !== '' ? calendarImg : location.pathname.startsWith("/diet-plan") ? calendar_active : calendar}
                        width={25}/></MDBNavLink></div>
                </div>
                <div
                    className={resolveNavLinkClass(location.pathname, "/explore", false) + '  align-self-center'}
                    onMouseEnter={() => setExploreImg(loupe_active)}
                    onMouseLeave={() => setExploreImg('')}>
                    <div className='py-2'><MDBNavLink to="/explore" link><img
                        src={exploreImg !== '' ? exploreImg : location.pathname.startsWith("/explore") ? loupe_active : loupe}
                        width={25}/></MDBNavLink></div>
                </div>
                <div className='mt-auto d-flex flex-column'>
                    <div className={'mt-auto align-self-center additional-action'}
                         onMouseEnter={() => setSignOutImg(signOut_active)}
                         onMouseLeave={() => setSignOutImg('')}>
                        <img src={signOutImg !== '' ? signOut_active : signOut} width={20}/>
                    </div>
                    <Link to="/profile"
                          className={location.pathname === "/profile" ? ' mt-3 align-self-center additional-action-active' : 'mt-3 align-self-center additional-action'}
                          onMouseEnter={() => setSettingsImg(settings_active)}
                          onMouseLeave={() => setSettingsImg('')}>
                        <img
                            src={settingImg !== '' || location.pathname === "/profile" ? settings_active : settings}
                            width={20}/>
                    </Link>
                    <div className='mt-3 align-self-center '>
                        <div className='profile-image-wrapper'>
                            <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
                                 className="rounded float-right profile-image-collapsed" alt="aligment"/>
                            <div className='profile-image-status-online-collapsed'>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )

}
