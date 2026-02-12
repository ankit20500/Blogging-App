import { useContext } from 'react';
import './Profile.css';
import { userContext } from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';


function Profile(){
    const navigate=useNavigate();
    const {user,logoutUser,loading}=useContext(userContext);

    if(loading) return <p>Loading...</p>;

    if(!user) return navigate('/login');


    return(
        <div className='profile'>
            <div className='profile-left'>
                <h3 className='profile-heading' align='center'>Profile</h3>
                <p onClick={()=>navigate('/admin/all-posts')}>Show All Post</p>
                <p onClick={()=>navigate('/upload-posts')}>Upload Post</p>
                <p onClick={()=>navigate('/change-password')}>Change Password</p>
                <p onClick={()=>{logoutUser(),navigate('/')}}>Logout</p>
            </div>

            <div className='profile-right'>
                <img src={user?user.avtar:'profile-icon.avif'}/>

                <label htmlFor='fullname'>Full Name</label><br/>
                <input type='text' placeholder='John Doe' 
                        id='fullname' name='fullname'
                        disabled
                        value={user?.name}
                />

                <label htmlFor='email'>Email</label><br/>
                <input type='email' placeholder='email@gmail.com' 
                        id='email' name='email'
                        disabled
                        value={user?.email}
                />

                <label htmlFor='number'>Number</label><br/>
                <input type='number' placeholder='+91-8650720418'
                        id='number' name='number'
                        disabled
                        value={user?.phone}
                />

                <button>Edit</button>
            </div>
        </div>
    )
}

export default Profile;