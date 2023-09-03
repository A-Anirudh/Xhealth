import { useEffect, useState } from "react";
import { Users } from "../sdk/users";
import { useUpdateAppointmentStatusMutation } from "../slices/usersApiSlice";
import moment from "moment";
import { v4 as uuid } from "uuid";


export const useAptDetails = ({hrid}) => {
  const user = new Users();
  const [appointments, refetchApt] = user.getAppointments();
  const [doctors] = user.getDoctors();
  const [sortedAppointments, setSortedAppointments] = useState({});
  const [updateApt] = useUpdateAppointmentStatusMutation();

  // TODO: ADD HR DATA

  useEffect(() => {
    const doctorDetails = appointments
      ?.map(
        ({ _id, doctorId, appointmentDate, appointmentStartTime, status }) => {
          const docDetail = doctors?.allDoc?.find(
            ({ _id }) => _id === doctorId
          );
          return {
            appointmentDate,
            appointmentStartTime,
            status,
            hospitalName: docDetail?.currentHospitalWorkingName,
            state: docDetail?.state,
            city: docDetail?.city,
            doctorName: docDetail?.firstName,
            department: docDetail?.department,
            healthRecord: "http://localhost:8080/api/users/healthRecords/key/"+hrid,
            _id,
          };
        }
      )
      .filter(
        (app) =>
          new Date(app.appointmentDate).getFullYear() ===
          new Date().getFullYear()
      );

    const monthlySorted = doctorDetails?.reduce((acc, curr) => {
      const month = moment(curr.appointmentDate).format("MMMM");
      return {
        ...acc,
        [month]: acc[month]
          ? { ...acc[month], apt: [...acc[month]?.apt, curr] }
          : { id: uuid(), apt: [curr] },
      };
    }, {});
    console.log(monthlySorted);
    setSortedAppointments(monthlySorted);
  }, [appointments, doctors]);

  useEffect(() => {
    appointments &&
      appointments.forEach(
        (item) =>
          new Date(item.appointmentDate) < new Date() &&
          updateApt({ _id: item._id, newStatus: "Expired" })
      );
  }, [appointments, updateApt]);

  useEffect(() => {
    refetchApt();
  }, [])

  return { sortedAppointments, appointments };
};
