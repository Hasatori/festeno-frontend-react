import close_icon from "../../../assets/images/common/close-icon.svg";
import hamburger from "../../../assets/images/common/hamburger-icon.svg";
import logo from "../../../assets/images/logos/festeno_yellow2.svg";
import {MDBNavLink} from "mdbreact";
import home_active from "../../../assets/images/common/home-active.svg";
import home from "../../../assets/images/common/home.svg";
import book_active from "../../../assets/images/common/book_active.svg";
import book from "../../../assets/images/common/book.svg";
import calendar_active from "../../../assets/images/common/calendar_active.svg";
import calendar from "../../../assets/images/common/calendar.svg";
import loupe_active from "../../../assets/images/common/loupe_active.svg";
import loupe from "../../../assets/images/common/loupe.svg";
import signOut from "../../../assets/images/common/sign-out.svg";
import {Link, useLocation} from "react-router-dom";
import settings_active from "../../../assets/images/common/settings_active.svg";
import settings from "../../../assets/images/common/settings.svg";
import React, {useState} from "react";
import {HeaderProps, resolveNavLinkClass} from "../AppHeader";
import {useTranslation} from "react-i18next";
import "./SmallScreenNav.css"
import {Routes} from "../../../util/Constants";

export function SmallScreenNav(props: HeaderProps) {
    const {t, i18n} = useTranslation();
    const location = useLocation();
    const [navOpen, setNavOpen] = useState(false);
    return (
        <div className="top-nav">
            <div className="d-flex flex-row justify-content-between pl-2 pr-2">
                <div onClick={(event => setNavOpen(!navOpen))}><img
                    src={navOpen ? close_icon : hamburger} width={20} height={20}/></div>
                <div><img src={logo} width={30}/></div>
            </div>
            {navOpen &&
            <div className='side-nav-collapsed pb-5 d-flex flex-column'>
                <div className={resolveNavLinkClass(location.pathname, Routes.HOME, true) + '  align-self-left'}>
                    <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink to={Routes.HOME} link><img
                        src={location.pathname === "/" ? home_active : home}
                        width={25}/>Feed</MDBNavLink>
                    </div>
                </div>
                {props.authenticated ?
                    <>
                        <div
                            className={resolveNavLinkClass(location.pathname, Routes.RECIPES, false) + '  align-self-center'}>
                            <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink to={Routes.RECIPES}
                                                                                                     link><img
                                src={location.pathname.startsWith(Routes.RECIPES) ? book_active : book}
                                width={25}/>Recipes</MDBNavLink></div>
                        </div>
                        <div
                            className={resolveNavLinkClass(location.pathname, Routes.DIET_PLAN, false) + '  align-self-center'}>
                            <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink
                                to={Routes.DIET_PLAN}
                                link><img
                                src={location.pathname.startsWith(Routes.DIET_PLAN) ? calendar_active : calendar}
                                width={25}/>Diet plan</MDBNavLink></div>
                        </div>
                    </> : <></>}

                <div className={resolveNavLinkClass(location.pathname, Routes.EXPLORE, false) + '  align-self-center'}>
                    <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink to={Routes.EXPLORE}
                                                                                             link><img
                        src={location.pathname.startsWith(Routes.EXPLORE) ? loupe_active : loupe}
                        width={25}/>Explore</MDBNavLink></div>

                </div>
                {props.authenticated ?
                <div className='mt-auto d-flex flex-column'>
                    <div className={'mt-auto align-self-center additional-action'}>
                        <img src={signOut} width={20}/>
                    </div>
                    <Link to={Routes.PROFILE}
                          className={location.pathname === Routes.PROFILE ? ' mt-3 align-self-center additional-action-active' : 'mt-3 align-self-center additional-action'}
                          onClick={(event => setNavOpen(false))}
                    >
                        <img
                            src={location.pathname === Routes.PROFILE ? settings_active : settings}
                            width={20}/>
                    </Link>
                    <div className='mt-3 align-self-center ' onClick={(event => setNavOpen(false))}>
                        <div className='profile-image-wrapper'>
                            <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
                                 className="rounded float-right profile-image-collapsed" alt="aligment"/>
                            <div className='profile-image-status-online-collapsed'>
                            </div>

                        </div>
                    </div>
                </div>:<></>
                }
            </div>
            }

        </div>
    )
}
