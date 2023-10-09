import React, { useState } from 'react';
import './register.css';
import '../../app.css';
import {Link,useNavigate} from 'react-router-dom';
import video from '../LoginAssets/video.mp4';
import image from '../LoginAssets/photo.png';
import {FaUserShield}  from 'react-icons/fa';
import {BsFillShieldLockFill}  from 'react-icons/bs';
import {AiOutlineSwapRight} from 'react-icons/ai'
import {MdMarkEmailRead} from 'react-icons/md'
import Axios from "axios";
const Register = () => {
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigateTo = useNavigate();

    const createUser = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8081/register", {
            Email : email,
            UserName : username,
            Password : password
        }).then(()=> {
            navigateTo('/')
            setEmail('')
            setUsername('')
            setPassword('')
        })
    }
    return(
        <div className="registerPage flex">
            <div className="container flex">
                 <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video> 
                    <div className="textDiv">
                        <h2 className="title">Creating Music Player</h2>
                        <p>Please listen to our music!</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/'}>
                        <button className="btn">Login</button>
                        </Link>
                    </div>
                </div>
                
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={image} alt="" />
                        <h3>Let Us Know You!</h3>
                    </div>
                    <form action="" className="form grid">
                       
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon"/>
                                <input type="email" id='email' placeholder='Enter Email' 
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon"/>
                                <input type="text" id='username' placeholder='Enter Username' 
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon"/>
                                <input type="password" id='password' placeholder='Enter Password'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            </div>
                        </div>

                        <button type='submit' className='btn flex' onClick={createUser}>
                            <span>Register</span>
                            <AiOutlineSwapRight className="icon"/>
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="/">Click Here</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
            
    )
}



export default Register;