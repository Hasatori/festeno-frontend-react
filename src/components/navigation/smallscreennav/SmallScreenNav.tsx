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
import {resolveNavLinkClass} from "../AppHeader";
import {useTranslation} from "react-i18next";
import "./SmallScreenNav.css"

export function SmallScreenNav(){
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
                <div className={resolveNavLinkClass(location.pathname, "/", true) + '  align-self-left'}>
                    <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink to="/" link><img
                        src={location.pathname === "/" ? home_active : home}
                        width={25}/>Feed</MDBNavLink>
                    </div>
                </div>
                <div className={resolveNavLinkClass(location.pathname, "/recipes", false) + '  align-self-center'}>
                    <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink to="/recipes" link><img
                        src={location.pathname.startsWith("/recipes") ? book_active : book}
                        width={25}/>Recipes</MDBNavLink></div>
                </div>
                <div
                    className={resolveNavLinkClass(location.pathname, "/diet-plan", false) + '  align-self-center'}>
                    <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink to="/diet-plan"
                                                                                                 link><img
                        src={location.pathname.startsWith("/diet-plan") ? calendar_active : calendar}
                        width={25}/>Diet plan</MDBNavLink></div>
                </div>
                <div className={resolveNavLinkClass(location.pathname, "/explore", false) + '  align-self-center'}>
                    <div className='py-2' onClick={(event => setNavOpen(false))}><MDBNavLink to="/explore" link><img
                        src={location.pathname.startsWith("/explore") ? loupe_active : loupe}
                        width={25}/>Explore</MDBNavLink></div>

                </div>

                <div className='mt-auto d-flex flex-column'>
                    <div className={'mt-auto align-self-center additional-action'}>
                        <img src={signOut} width={20}/>
                    </div>
                    <Link to="/profile"
                          className={location.pathname === "/profile" ? ' mt-3 align-self-center additional-action-active' : 'mt-3 align-self-center additional-action'}
                          onClick={(event => setNavOpen(false))}
                    >
                        <img
                            src={location.pathname === "/profile" ? settings_active : settings}
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
                </div>
            </div>
            }

        </div>
    )
}
