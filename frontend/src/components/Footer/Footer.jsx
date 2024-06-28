import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem Ipsum is simple dummy text of the printing and typesetting industry. Lorem Ipsum has been then industry's standard dummy text ever since the 1500s, when on unknow printer took a galley of type and scrambled it to make a type specmen book</p>
                    <div className='footer-social-icon'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privary policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+84 346 26 9996</li>
                        <li>nguyengiahau2004@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'> Copyright 2024 @ Tomato.com - All Right Reversed.</p>
        </div>
    )
}

export default Footer