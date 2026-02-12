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
            </div>
            <img onClick={()=>user?navigate('/profile'):navigate('/login')} className='profile-icon' src='../profile-icon.avif'/>
        </div>
    )
}

export default Navbar;