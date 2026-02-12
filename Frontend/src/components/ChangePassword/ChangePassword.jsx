import { useContext, useState } from 'react';
import './ChangePassword.css';
import {useNavigate} from 'react-router-dom';
import { userContext } from '../../stores/userStore';

function ChangePassword() {
  const navigate=useNavigate();
  const {changePassword}=useContext(userContext);
  const [oldPassword,setOldPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");

  async function handleSubmit(){
    try {
      const passDetails={oldPassword,newPassword};
      await changePassword(passDetails);
      navigate('/profile');
    } catch (error) {
      console.log("some error occured while changing password",error.message);
    }
  }

  return (
    <div className='change-password'>
        <p>Change Password</p>
        <input placeholder='Enter old password...'
              onChange={(e)=>setOldPassword(e.target.value)}
        />
        <input placeholder='Enter new password...'
              onChange={(e)=>setNewPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ChangePassword;