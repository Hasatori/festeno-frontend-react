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
import React, {useState} from "react";
import {resolveNavLinkClass, resolveNavLinkWrapperClass} from "../AppHeader";
import {useTranslation} from "react-i18next";
import './BigScreenNav.css';

export function BigScreenNav() {

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
            <div className='side-nav d-flex flex-column py-5'>
                <div className='d-flex align-self-center px-5'>
                    <img src={logo} width={70} className='mb-3'/>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/", true)}>
                    <Link to="/">
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
                <div className={resolveNavLinkWrapperClass(location.pathname, "/recipes", true)}>
                    <Link to="/recipes">
                        <div className={resolveNavLinkClass(location.pathname, "/recipes", true)}

                             onMouseEnter={() => setBookImage(book_active)}
                             onMouseLeave={() => setBookImage('')}
                        >
                            <div className='mr-2 py-2'><img
                                src={bookImg !== '' ? bookImg : location.pathname.startsWith("/recipes") ? book_active : book}
                                width={25}/>
                            </div>
                            <div className='align-self-center'>Recipes</div>
                        </div>
                    </Link>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/recipes/mine-recipes", true)}>
                    <Link to="/recipes/mine-recipes">
                        <div className={resolveNavLinkClass(location.pathname, "/recipes/mine-recipes", true)}
                        >
                            <div className='ml-5 align-self-left'>Mine recipes</div>
                        </div>
                    </Link>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/recipes/create", true)}>
                    <Link to="/recipes/create">
                        <div className={resolveNavLinkClass(location.pathname, "/recipes/create", true)}
                        >
                            <div className='ml-5 text-left'>Create</div>
                        </div>
                    </Link>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/diet-plan", true)}>
                    <Link to="/diet-plan">
                        <div className={resolveNavLinkClass(location.pathname, "/diet-plan", true)}

                             onMouseEnter={() => setCalendarImage(calendar_active)}
                             onMouseLeave={() => setCalendarImage('')}
                        >
                            <div className='mr-2 py-2'><img
                                src={calendarImg !== '' ? calendarImg : location.pathname.startsWith("/diet-plan") ? calendar_active : calendar}
                                width={25}/>
                            </div>
                            <div className='align-self-center'>Diet plan</div>
                        </div>
                    </Link>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/explore", false)}>
                    <Link to="/explore">
                        <div className={resolveNavLinkClass(location.pathname, "/explore", false)}
                             onMouseEnter={() => setExploreImg(loupe_active)}
                             onMouseLeave={() => setExploreImg('')}>
                            <div className='mr-2 py-2'><img
                                src={exploreImg !== '' ? exploreImg : location.pathname.startsWith("/explore") ? loupe_active : loupe}
                                width={25}/></div>
                            <div className='align-self-center'>Explore</div>
                        </div>
                    </Link>
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
                    <div className='mt-3 align-self-center'>
                        <div className='profile-image-wrapper'>
                            <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
                                 className="rounded float-right profile-image" alt="aligment"/>
                            <div className='profile-image-status-online'>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
