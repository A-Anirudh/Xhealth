import React, { useEffect } from 'react'
import { useLoginMutation } from '../../slices/usersApiSlice';

const Profile = () => {
  const[profile,{isLoading}]=useLoginMutation();
  useEffect(() => {
  console.log(JSON.stringify(profile(), null, 2))
  }, [])
  

  return (
    <div>Profile</div>
  )
}

export default Profile