import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Create} from '@mui/icons-material'
import { updateUser } from '../features/userSlice'
const EditProfile = () => {

  const {username, address} = useSelector(state=>state.user.data)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: username,
    address_town: address.town,
    address_city: address.city,
    address_line: address.address_line,
    address_pincode: address.pincode,
    address_state: address.state
  })

  const handleChange = (e) =>{

    setFormData({...formData, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) =>{

    e.preventDefault()

    dispatch(updateUser({
      username: formData.username,
      address: {
        pincode: formData.address_pincode,
        city: formData.address_city,
        state: formData.address_state,
        address_line: formData.address_line,
        town: formData.address_town
    }
    }))

  }

  return (
    <section id="profile-form-section" onSubmit={handleSubmit}>
      <div className="profile-form-container">
        <div className="profile-headings">
          <h1>Edit Profile</h1>
          <Create/>
        </div>
        <form className="profile-form">
          <div>
            <label htmlFor="username">Name:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='username' required/>
          </div>
          <div>
            <label >Address:</label>
            <div className="address-form-container">
              <input type="text" name="address_pincode" value={formData.address_pincode} onChange={handleChange} placeholder='pincode' required/>
              <input type="text" name="address_state" value={formData.address_state} onChange={handleChange} placeholder='state' required/>
              <input type="text" name="address_city" value={formData.address_city} onChange={handleChange} placeholder='city' required/>
              <input type="text" name="address_town" value={formData.address_town} onChange={handleChange} placeholder='Locality/Town' required/>
              <input type="text" name="address_line" value={formData.address_line} onChange={handleChange} placeholder='House No., Apartment etc' required/>
            </div>
          </div>
          <input type="submit" value="Save Changes"/>
        </form>
      </div>
    </section>
  )
}

export default EditProfile