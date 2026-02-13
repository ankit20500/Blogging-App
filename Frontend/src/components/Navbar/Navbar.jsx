import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useContext, useEffect } from 'react';
import { userContext } from '../../stores/userStore';

function Navbar(){
    const {user}=useContext(userContext);
    const navigate=useNavigate();

    return(
        <div className="navbar">
            <img className='navbar-icon' src='../header-icon.png'/>
            <div className='navbar-content'>
                <p onClick={()=>navigate('/')}>Home</p>
                {user?<p onClick={()=>navigate('upload-posts')}>Upload Post</p>:""}
                {user?<p onClick={()=>navigate('/admin/all-posts')}>Your All Posts</p>:""}
                <p>Contact Us</p>
            </div>
            
            {user?
                <img className='profile-icon' src='../profile-icon.avif' onClick={()=>navigate('/profile')}/>
                :
                <button className='profile-login-btn' onClick={()=>navigate('/login')}>Login</button>}
        </div>
    )
}

export default Navbar;