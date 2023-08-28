import React from 'react'
import { useParams } from 'react-router-dom';
import { Users } from '../sdk/users';
import { useGetDoctorAptQuery } from '../slices/doctorsApiSlice';

export const ViewAppointments = () => {
    const user = new Users();
    const [aptBasedOnDoc, refetchapt] = user.getDocApt();
    const {id}=useParams()
    const [getApts]=useGetDoctorAptQuery()
    console.log(getApts)
  return (
    <div>ViewAppointments</div>
  )
}
