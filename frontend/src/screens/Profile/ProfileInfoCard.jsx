import React from 'react'
import './profileCard.css'
const ProfileInfoCard = ({name,value}) => {
  return (
    <div className='main-container'>
        <div className='card'>
            <span style={{fontWeight:'bold',textTransform: 'capitalize',marginRight:'10px'}}>{name}</span>
            <span>{value}</span>
        </div>


    </div>
  )
}

export default ProfileInfoCard