import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './AppHeader.css';
import {connect} from "react-redux";
import {AppProps} from "../../index";
import {MDBIcon, MDBNavLink} from 'mdbreact';
import {useTranslation} from "react-i18next";
import {getLanguageFlagPairFromLocale} from "../../i18n/I18nConfig";
import home from "../../assets/images/common/home.svg";
import home_active from "../../assets/images/common/home-active.svg";
import loupe from "../../assets/images/common/loupe.svg";
import loupe_active from "../../assets/images/common/loupe_active.svg";
import logo from "../../assets/images/logos/festeno_yellow2.svg";
import {useMediaQuery} from 'react-responsive'

function AppHeader(props: AppProps) {
    const [open, setOpen] = useState(false);
    const {t, i18n} = useTranslation();
    let [flagName] = getLanguageFlagPairFromLocale(i18n.language);
    const location = useLocation();
    const bgPink = {backgroundColor: '#181818'}
    const [exploreImg, setExploreImg] = useState('');
    const [feedImg, setFeedImage] = useState('');
    const isSmallScreen = useMediaQuery({query: '(min-width: 1400px)'});
    const [expanded, setExpanded] = useState(isSmallScreen);
    useEffect(() => {
        setExpanded(isSmallScreen);

    }, [isSmallScreen]);
    return (
        <div className='side-nav-wrapper'>
            {expanded ?
            <div className='side-nav d-flex flex-column py-5'>
                <div className='close-nav-toggle' onClick={()=>{setExpanded(false)}}>

                    <MDBIcon icon="angle-double-left"/>
                </div>

                <div className='d-flex align-self-center px-5'>
                    <img src={logo} width={70} className='mb-3'></img>

                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/",true)} >
                    <Link to="/"> <div className={resolveNavLinkClass(location.pathname, "/",true)}

                     onMouseEnter={() => setFeedImage(home_active)}
                     onMouseLeave={() => setFeedImage('')}
                >
                    <div className='mr-2 py-2'><img
                        src={feedImg !== '' ? feedImg : location.pathname === "/" ? home_active : home} width={25}/>
                    </div>
                    <div className='align-self-center'>Feed</div>
                </div>
                    </Link>
                </div>
                <div className={resolveNavLinkWrapperClass(location.pathname, "/explore",false)}>
                    <Link to="/explore">
                <div className={resolveNavLinkClass(location.pathname, "/explore",false)}
                     onMouseEnter={() => setExploreImg(loupe_active)}
                     onMouseLeave={() => setExploreImg('')}>
                    <div className='mr-2 py-2'><img
                        src={exploreImg !== '' ? exploreImg :location.pathname.startsWith("/explore")? loupe_active : loupe}
                        width={25}/></div>
                    <div className='align-self-center'>Explore</div>
                </div>
                </Link>
                </div>
                <div className='mt-auto align-self-center '>
                    <div className='profile-image-wrapper'>
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
                             className="rounded float-right profile-image" alt="aligment"/>
                        <div className='profile-image-status-online'>
                        </div>

                    </div>


                </div>
            </div>

            :

            <div className='side-nav-collapsed pb-5 d-flex flex-column'>
                <div className='open-nav-togler' onClick={()=>{setExpanded(true)}}>

                    <MDBIcon icon="angle-double-right"/>
                </div>
                <div className='d-flex align-self-center mt-3 mb-3'>

                    <img src={logo} width={35} ></img>
                </div>
                <div className={resolveNavLinkClass(location.pathname, "/",true) + '  align-self-center'}
                     onMouseEnter={() => setFeedImage(home_active)}
                     onMouseLeave={() => setFeedImage('')}>
                    <div className='py-2'><MDBNavLink to="/" link><img
                        src={feedImg !== '' ? feedImg : location.pathname === "/" ? home_active : home}
                        width={25}/></MDBNavLink>
                    </div>

                </div>
                <div className={resolveNavLinkClass(location.pathname, "/explore",false) + '  align-self-center'}
                     onMouseEnter={() => setExploreImg(loupe_active)}
                     onMouseLeave={() => setExploreImg('')}>
                    <div className='py-2'><MDBNavLink to="/explore" link><img
                        src={exploreImg !== '' ? exploreImg : location.pathname.startsWith("/explore") ? loupe_active : loupe}
                        width={25}/></MDBNavLink></div>
                </div>
                <div className='mt-auto align-self-center '>
                    <div className='profile-image-wrapper'>
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"
                             className="rounded float-right profile-image-collapsed" alt="aligment" />
                        <div className='profile-image-status-online-collapsed'>
                        </div>

                    </div>


                </div>
            </div>
            }
        </div>
    )

}

function resolveNavLinkWrapperClass(currentLocation: string, expectedLocation: string,exact:boolean): string {
    const result=exact?currentLocation===expectedLocation:currentLocation.startsWith(expectedLocation);
    return result ? 'side-nav-link-wrapper-active d-flex justify-content-center' : 'side-nav-link-wrapper d-flex justify-content-center';
}

function resolveNavLinkClass(currentLocation: string, expectedLocation: string,exact:boolean): string {
    const result=exact?currentLocation===expectedLocation:currentLocation.startsWith(expectedLocation);
    return result ? 'd-flex flex-row side-nav-link-active align-self-center' : 'd-flex flex-row side-nav-link align-self-center';
}

export default connect()(AppHeader);
