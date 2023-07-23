import React, { useEffect, useState } from 'react'
import { useGetUserInfoQuery } from '../../slices/usersApiSlice';
import ProfileInfoCard from './ProfileInfoCard';
import FaceIcon from '@mui/icons-material/Face';
import Face4Icon from '@mui/icons-material/Face4';
import './profileCard.css'
const Profile = () => {
  const { data } = useGetUserInfoQuery();




  useEffect(() => {
    console.log('User Info:', data);  
  }, [data])

  if (!data) return ('loading')

  const keys = Object.keys(data).slice(1,);
  const label = {
    "email": 'Email :',
    "firstName": 'First Name :',
    "lastName": 'Last name :',
    "phoneNumber": "Phone number :",
    "bloodGroup": "Blood Group :",
    "dateOfBirth": "Date of birth :",
    "gender": "Gender :",
    "state": "State :",
    "city": "City :",
    "pincode": "Pincode :",
  }

  function getDate(params) {
    const dateOfBirthString = data["dateOfBirth"];
    const dateOfBirth = new Date(dateOfBirthString);
    const formattedDateOfBirth = `${dateOfBirth.getDate()}/${dateOfBirth.getMonth() + 1}/${dateOfBirth.getFullYear()}`;
    return (formattedDateOfBirth)
  }


  return (
    <div className='profile-main'>
      <h1 style={{ textAlign: 'center', overflow: 'hidden', fontWeight: 'bolder', color: "272848" }}>Profile</h1>
      {data['gender']=='male'?<FaceIcon className='icon'/>:<Face4Icon className='icon'/>}
      <div className='main-container'>
        {
          keys.map((item) => {
            if (item == 'dateOfBirth') { return <ProfileInfoCard key={item} name={label[item]} value={getDate(data[item])} />; } // This will log each item in the keys array.
            return <ProfileInfoCard key={item} name={label[item]} value={data[item]} />;
          })}

      </div>
      <button className='update-btn'>Update Profile</button>
    </div>
  )
}

export default Profile