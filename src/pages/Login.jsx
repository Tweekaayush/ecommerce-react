import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, auth, provider } from '../config/firebase'
import { setUser } from '../features/userSlice'

const Login = () => {

    const {uid} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleGoogleAuth = () =>{
        signInWithPopup(auth, provider).then((user)=>{
            dispatch(setUser({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
              }))
              navigate('/')
        }).catch((e)=>console.log(e.message))
      }
    
      useEffect(()=>{
        window.scrollTo(0, 0)
        if(uid){
          navigate('/account')
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