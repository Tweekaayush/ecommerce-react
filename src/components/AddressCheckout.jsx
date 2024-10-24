import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartSummary from './CartSummary'
import { updateUser } from '../features/userSlice'
import DeliveryAddress from './DeliveryAddress'

const AddressCheckout = ({setCurrentStep, order, setOrder}) => {

  const {address, username, email} = useSelector(state=>state.user.data)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    address_town: address.town,
    address_city: address.city,
    address_line: address.address_line,
    address_pincode: address.pincode,
    address_state: address.state
  })
  const [open, setOpen] = useState(false)

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) =>{

    e.preventDefault()
    dispatch(updateUser({address: {
      pincode: formData.address_pincode,
      city: formData.address_city,
      state: formData.address_state,
      address_line: formData.address_line,
      town: formData.address_town
  }}))

  }

  const placeOrder = () =>{
    if(address.pincode){
      setOrder({...order, address: address, username: username, email:email})
      setCurrentStep(3)
    }
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left-container">
        <DeliveryAddress/>
        <div className="checkout-address-form">
          <h4 onClick={()=>setOpen(!open)}>
            {
              address?.pincode?<>Edit </>:<>Add </>
            }
            Address</h4>
          <form onSubmit={handleSubmit} className={open?'address-form-active':''}>
            <div className='form-grid'>
              <input type="text" name="address_pincode" value={formData.address_pincode} onChange={handleChange} placeholder='pincode' required/>
              <input type="text" name="address_state" value={formData.address_state} onChange={handleChange} placeholder='state' required/>
              <input type="text" name="address_city" value={formData.address_city} onChange={handleChange} placeholder='city' required/>
              <input type="text" name="address_town" value={formData.address_town} onChange={handleChange} placeholder='Locality/Town' required/>
              <input type="text" name="address_line" value={formData.address_line} onChange={handleChange} placeholder='House No., Apartment etc' required/>
            </div>
            <input type="submit" value="Save Address"/>
          </form>
        </div>
      </div>
      <div className="checkout-right-container">
        <CartSummary placeOrder={placeOrder} btn={'Continue'}/>
      </div>
    </div>
  )
}

export default AddressCheckout