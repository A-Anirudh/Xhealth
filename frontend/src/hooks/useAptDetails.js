import { useEffect, useState } from "react";
import { Users } from "../sdk/users";
import { useUpdateAppointmentMutation } from "../slices/usersApiSlice";
import moment from "moment";

export const useAptDetails = () => {
    const user = new Users();
    const [appointments] = user.getAppointments();
    const [doctors] = user.getDoctors();
    const [sortedAppointments, setSortedAppointments] = useState({});
    const [updateApt] = useUpdateAppointmentMutation();
    
    // TODO: ADD HR DATA

    useEffect(() => {
        const doctorDetails = appointments?.map(({ _id, doctorId, appointmentDate, appointmentStartTime, status }) => {
            const docDetail = doctors?.allDoc?.find(({ _id }) => _id === doctorId);
            return ({
                appointmentDate,
                appointmentStartTime, status,
                hospitalName: docDetail?.currentHospitalWorkingName,
                state: docDetail?.state,
                city: docDetail?.city,
                doctorName: docDetail?.firstName,
                department: docDetail?.department,
                healthRecord: "https://picsum.photos/99/99",
                _id
            })
        }).filter(app => new Date(app.appointmentDate).getFullYear() === new Date().getFullYear())
    
    
        const monthlySorted = doctorDetails?.reduce((acc, curr) => {
            const month = moment(curr.appointmentDate).format("MMMM");
            return { ...acc, [month]: Array.isArray(acc[month]) ? [...acc[month], curr] : [curr] }
        }, {})
    
        setSortedAppointments(monthlySorted);
    }, [appointments, doctors])

    useEffect(() => {
        appointments && appointments.forEach(item => new Date(item.appointmentDate) < new Date() && updateApt({ _id: item._id, newStatus: "Expired" }))
    }, [appointments, updateApt])

    return { sortedAppointments, appointments }
    
}
