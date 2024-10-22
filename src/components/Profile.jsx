import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderHistoryPrev from './OrderHistoryPrev'
import { Delete } from '@mui/icons-material';

const Profile = () => {

  const { profileImg, username, email, address } = useSelector(state=>state.user.data) 

  return (
    <section id="profile">
        <div className="profile-container">
            <div className="profile-left-container">
              <div className="profile-header">
                <img src={profileImg} alt={username} />
              </div>
              <div className="profile-details">
                <div>
                  <h4>Name:</h4>
                  <p>{username}</p>
                </div>
                <div>
                  <h4>Email:</h4>
                  <p>{email}</p>
                </div>
                <div>
                  <h4>Address:</h4>
                  {address?.pincode?
                    <p>
                      {address?.address_line}, {address?.town}
                      <br/>
                      {address?.city}, {address?.state} - {address?.pincode}
                    </p>
                  :
                    <p className='address-placeholder'>
                      Address Line 1
                    </p>}
                </div>
              </div>
              <button>Delete My Account <Delete/></button>
            </div>
            <div className="profile-right-container">
              <OrderHistoryPrev />
            </div>
        </div>
    </section>
  )
}

export default Profile