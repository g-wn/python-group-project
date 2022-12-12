import React, { useState } from 'react';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

function Navigation() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    const user = useSelector(state => state.session.user);

    return (
        <>
            <header className='splash-page-header'>
                <div className='splash-page-top-bar-container'>
                    <div className='header-top-bar'>
                        <div>
                            <span>FOLLOW @ UNCRATE</span>
                        </div>
                        <div className='header-top-bar-center'>
                            <a href='#hi'>UNCRATE.COM</a>
                            <a href='#hi'>UNCRATE.SUPPLY</a>
                            <a href='#hi'>UNCRATE.TV</a>
                        </div>
                        {!user ? <div>
                            <button className='login-button' onClick={() => setShowLoginModal(true)}>LOG IN</button> | {" "}
                            <button className='signup-button' onClick={() => setShowSignupModal(true)}>SIGN UP</button>
                            {showLoginModal && <Modal onClose={() => setShowLoginModal(false)}><LoginForm setShowLoginModal={setShowLoginModal} /></Modal>}
                            {showSignupModal && <Modal onClose={() => setShowSignupModal(false)}><SignUpForm /></Modal>}
                        </div> :
                            <div>
                                <LogoutButton setShowLoginModal={setShowLoginModal} /> | {" "}
                                <button className='signup-button'>PROFILE</button>
                            </div>
                        }
                    </div>
                </div>
                <div className='header-bottom-bar'>
                    <div></div>
                    <div className='header-logo'>
                        <img src='https://uncrate.com/img/uncrate-lights.png' alt='header-logo'></img>
                    </div>
                    <div className='splash-header-icons'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <i className="fa-sharp fa-solid fa-box"></i>
                    </div>
                </div>
            </header>
            <nav className='nav'>
                <div className='nav-bar-categories'>
                    <a href='#hi'>GEAR</a>
                    <a href='#hi'>STYLE</a>
                    <a href='#hi'>CARS</a>
                    <a href='#hi'>TECH</a>
                    <a href='#hi'>SHELTER</a>
                    <a href='#hi'>VICES</a>
                    <a href='#hi'>BODY</a>
                    <a href='#hi'>ETC</a>
                </div>
                <div className='nav-bar-categories-border' />
                <div className='nav-bar-subcategories-border' />
                <div className='nav-bar-subcategories'>
                    <a href='#hi'>SHOP</a>
                    <a href='#hi'>MAGAZINE</a>
                    <a href='#hi'>IPHONE APP</a>
                    <a href='#hi'>ANDROID APP</a>
                    <a href='#hi'>MOST WANTED</a>
                    <a href='#hi'>BLACK LIST</a>
                    <a href='#hi'>STASH</a>
                </div>
                <div className='nav-bar-subcategories-border' />
            </nav>
        </>
    )
}

export default Navigation;
