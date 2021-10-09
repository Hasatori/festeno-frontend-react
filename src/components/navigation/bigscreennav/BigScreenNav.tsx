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
                {props.authenticated ?
                    <>
                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.RECIPES, true)}>
                            <Link to={Routes.RECIPES}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.RECIPES, true)}

                                     onMouseEnter={() => setBookImage(book_active)}
                                     onMouseLeave={() => setBookImage('')}
                                >
                                    <div className='mr-2 py-2'><img
                                        src={bookImg !== '' ? bookImg : location.pathname.startsWith(Routes.RECIPES) ? book_active : book}
                                        width={25}/>
                                    </div>
                                    <div className='align-self-center'>Recipes</div>
                                </div>
                            </Link>
                        </div>
                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.MY_RECIPES, true)}>
                            <Link to={Routes.MY_RECIPES}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.MY_RECIPES, true)}
                                >
                                    <div className='ml-5 align-self-left'>Mine recipes</div>
                                </div>
                            </Link>
                        </div>
                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.CREATE_RECIPE, true)}>
                            <Link to={Routes.CREATE_RECIPE}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.CREATE_RECIPE, true)}
                                >
                                    <div className='ml-5 text-left'>Create</div>
                                </div>
                            </Link>
                        </div>
                        <div className={resolveNavLinkWrapperClass(location.pathname, Routes.DIET_PLAN, true)}>
                            <Link to={Routes.DIET_PLAN}>
                                <div className={resolveNavLinkClass(location.pathname, Routes.DIET_PLAN, true)}

                                     onMouseEnter={() => setCalendarImage(calendar_active)}
                                     onMouseLeave={() => setCalendarImage('')}
                                >
                                    <div className='mr-2 py-2'><img
                                        src={calendarImg !== '' ? calendarImg : location.pathname.startsWith(Routes.DIET_PLAN) ? calendar_active : calendar}
                                        width={25}/>
                                    </div>
                                    <div className='align-self-center'>Diet plan</div>
                                </div>
                            </Link>
                        </div>
                    </>
                    : <></>}

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
                    </div> : <></>}

            </div>
        </div>
    )

}
