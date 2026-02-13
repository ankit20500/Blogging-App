import { useContext, useState } from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { userContext } from '../../stores/userStore';
import { LoginSchema } from '../../validators/SignupValidator';
import { toast } from 'react-toastify';


function Login(){
    const navigate=useNavigate();
    const {loginUser}=useContext(userContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    async function handleSubmit(){
        try {
            const userDetail={email,password};

            // check the validation
            await LoginSchema.validate(userDetail);

            await loginUser(userDetail);
            
            setEmail("");
            setPassword("");
            navigate("/")
        } catch (error) {
            toast.warning(error.message);
        }
    }

    return(
        <div className='login'>
            {/* <img src='./login img.jpg'/> */}
            
            <div className='login-form'>
                <p className='login-heading' align='center'>Login</p> <br/>

                <label htmlFor='email'>Email</label><br/>
                <input type='email' placeholder='email@gmail.com' 
                        id='email' name='email'
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                /><br/><br/>

                <label htmlFor='password'>Password</label><br/>
                <input type='password' placeholder='password@123'
                        id='password' name='password'
                        required
                        onChange={(e)=>setPassword(e.target.value)}
                /><br/><br/>


                <div className='login-btn'>
                    <Link to='/signup' className='login-btn-link'>New User</Link>
                    {/* <button onClick={()=>navigate('/signup')}>Signup</button> */}
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;