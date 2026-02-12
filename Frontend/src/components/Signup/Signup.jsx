import './Signup.css';
import {useNavigate} from 'react-router-dom';
import { useContext, useState } from 'react';
import { userContext } from '../../stores/userStore';
// import SignupSchema from '../../validators/SignupValidator';
// import Alert from '@mui/material/Alert';

function Signup(){
    const {registerUser}=useContext(userContext);
    const navigate=useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState(null);

    // submit the button
    async function handleSubmit(){
        try {
            const obj={name,email,password,phone};
            // const corrects=await SignupSchema(obj);
            // if(!corrects){
            //     console.log("")
            // }
            await registerUser(obj);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            navigate('/');
        } catch (error) {
            console.log("error comes",error);
        }
    }


    return(
        <div className='signup'>
            <img src='./login img.jpg'/>
            
            <div className='signup-form'>
                <p className='signup-heading' align='center'>Signup</p> <br/>
                <label htmlFor='fullname'>Full Name</label><br/>
                <input type='text' placeholder='John Doe' 
                        id='fullname' name='fullname'
                        required="true"
                        onChange={(e)=>setName(e.target.value)}
                /><br/><br/>

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

                <label htmlFor='number'>Number</label><br/>
                <input type='number' placeholder='+91-8650720418'
                        id='number' name='number'
                        required
                        onChange={(e)=>setPhone(e.target.value)}/>
                <br/><br/>

                <div className='signup-btn'>
                    <button onClick={()=>navigate('/login')}>Login</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;