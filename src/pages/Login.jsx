import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { signInWithPopup, auth, provider } from '../config/firebase'
import { getUserDetails } from '../features/userSlice'

const Login = () => {

    const {uid} = useSelector(state=>state.user.data)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {state} = useLocation()
    
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
    }, [])
  return (
    <section id="login">
        <div className="login-container">
            <h1>Login</h1>
            <button onClick={handleGoogleAuth}>Google</button>
        </div>
    </section>
  )
}

export default Login