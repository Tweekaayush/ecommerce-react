import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderHistoryPrev from './OrderHistoryPrev'
import { Delete } from '@mui/icons-material';

const Profile = () => {

  const { profileImg, username, email } = useSelector(state=>state.user) 
  const [formData, setFormData] = useState({
    username: username
  })
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <section id="profile">
        <div className="profile-container">
            <div className="profile-left-container">
              <div className="profile-header">
                <div className="profile-img-container">
                  <img src={profileImg} alt={username} />
                </div>
                <h1>{username}</h1>
              </div>
              <div className="profile-options">
                <h4>Edit Profile: </h4>
                <form className="edit-profile-form">
                  <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder={username} />
                  <input type="submit" value="save changes" />
                </form>
                <button>Delete My Account <Delete/></button>
              </div>
            </div>
            <div className="profile-right-container">
              <OrderHistoryPrev />
            </div>
        </div>
    </section>
  )
}

export default Profile