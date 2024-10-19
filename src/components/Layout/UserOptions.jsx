import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../features/userSlice';
import { auth, signOut } from '../../config/firebase';
import { Person, Logout } from '@mui/icons-material';

const UserOptions = ({photo}) => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {uid, profileImg} = useSelector(state=>state.user)
  const [open, setOpen] = useState(false);
  const options = [
    {
      icon:<Person />,
      name:"Profile",
      func: account
    },
    {
      icon:<Logout />,
      name:"Logout",
      func: logoutUser
    }
  ]
  
  function account(){
    navigate("/account")
  }

  function logoutUser(){
    if(uid){
      signOut(auth).then(()=>{
          dispatch(signOutUser())
      }).catch((e)=> console.log(e.message))
  }
  }


  return (
        <SpeedDial
        className='speedDial'
        ariaLabel='SpeedDial'
        sx={{ '& .MuiFab-primary': { width: '32px', height: '32px', minHeight: '10px' }}}
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        icon={<img
            className='speedDialIcon'
            src={profileImg}
            alt="Profile"
        />
      }
        direction="down"
        >
          {
            options.map((option)=>(
              <SpeedDialAction sx={{width: '32px', height: '32px', minHeight: '10px'}} key={option.name} icon={option.icon} tooltipTitle={option.name} onClick={option.func}></SpeedDialAction>
            ))
          }
        </SpeedDial>
  )
}

export default UserOptions