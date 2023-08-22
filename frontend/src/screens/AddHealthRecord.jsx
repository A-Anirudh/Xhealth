import React from 'react'
import { useSelector } from 'react-redux';

export const AddHealthRecord = () => {
    const  patientId  = useSelector(state => state.patientId);
    console.log(patientId,"hjk")
  return (
    <div>{patientId}</div>
  )
}
