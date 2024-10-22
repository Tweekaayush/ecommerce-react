import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { signInWithPopup, auth, provider } from '../config/firebase'
import { getUserDetails } from '../features/userSlice'
import google from '../assets/svg/google.png'

const Login = () => {

    const {uid} = useSelector(state=>state.user.data)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {state} = useLocation()

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })

    const handleChange = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleGoogleAuth = () =>{
        signInWithPopup(auth, provider).then((user)=>{
            dispatch(getUserDetails({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
              }))
        }).catch((e)=>console.log(e.message))
      }
    
      useEffect(()=>{
        if(uid){
          if(state) navigate(state.previousURL)
          else navigate('/account')
        }
      }, [uid])

    useEffect(()=>{
      window.scrollTo(0, 0)
      document.title = 'Log In'
    }, [])
  return (
    <section id="login">
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form">
              <label htmlFor="email">
                <input type="text" name='email' value={formData.email} onChange={handleChange}/>
                <span>Email Address</span>
              </label>
              <label htmlFor="password">
                <input type="text" name='password' value={formData.password} onChange={handleChange}/>
                <span>Password</span>
              </label>
              <input type="submit" value="Login"/>
            </form>
            <hr />
            <button onClick={handleGoogleAuth}>
              <img src={google} alt="google" />
              Google
            </button>
        </div>
    </section>
  )
}

export default Login