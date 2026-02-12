import './Footer.css';
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";

function Footer(){
    return(
        <div className='footer'>
            <div className='footer-header'>
                <p>Connect with us on the social media</p>
                <p>
                    <span><FaFacebookF/></span>
                    <span><FaInstagram/></span>
                    <span><FaXTwitter/></span>
                    <span><FiYoutube/></span>
                </p>
            </div>

            <div className='footer-content'>
                <p>
                    <span>About Us</span>
                    <span>We are here to help you all to connect with this and also share your experience with everyone. </span>
                </p>
                <p>
                    <span>contacts</span>
                    <span>Whatsaap</span>
                    <span>Discord</span>
                    <span>Slack</span>

                </p>
                <p>
                    <span>Useful links</span>
                </p>
                <p>
                    <span>product</span>
                </p>
            </div>
        </div>
    )
}

export default Footer;