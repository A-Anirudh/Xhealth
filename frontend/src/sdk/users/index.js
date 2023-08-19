import { toast } from "react-hot-toast";
import { useGetAllDoctorsQuery } from "../../slices/doctorsApiSlice";
import { useGetHealthRecordsQuery } from "../../slices/healthRecordSlice";
import { useGetAppointmentsQuery, useGetPersonalHeathQuery, useGetUserInfoQuery, useLogoutUserMutation, useSetAppointmentMutation, useUpdateUserInfoMutation, useUserLoginMutation } from "../../slices/usersApiSlice";
import moment from "moment";

export class Users {
    constructor() {
        // this.dispatch = dispatch;
    }
    getAppointments() {
        const { data, refetch } = useGetAppointmentsQuery();
        return [data, refetch];
    }

    /**
     * @returns two functions, one that gets user details, one that refetches to prevent caching
     */
    getUserInfo() {
        const { data, refetch } = useGetUserInfoQuery();
        return [data, refetch];
    }

    getDoctors() {
        const { data, refetch } = useGetAllDoctorsQuery();
        return [data, refetch];
    }
    logout() {
        const [logout] = useLogoutUserMutation();
        return logout;
    }
    login() {
        const [login] = useUserLoginMutation();
        return login;
    }
    getHR() {
        const { data, refetch } = useGetHealthRecordsQuery();
        return [data, refetch];
    }

    /**
     * @returns two functions, one that gets Health metrices, one that refetches to prevent caching
     */
    getPersonalHealth() {
        const { data, refetch } = useGetPersonalHeathQuery();
        return [data, refetch]
    }

    /**
     * @returns function that sends post request to edit user profile
     */
    editUserDetails() {
        const [editUser] = useUpdateUserInfoMutation();
        return editUser;
    }

    setAppointment() {
        const [setApt, { error }] = useSetAppointmentMutation();
        return [setApt, error]
    }

    setRecentAppointments(appointments, doctors) {
        if (appointments && doctors?.allDoc) {
            const upcomingApp = appointments.filter(app => app.status === "Scheduled" && new Date(app.appointmentDate).getFullYear() === new Date().getFullYear());
            const previousApp = appointments.filter(app => app.status === "Completed" && new Date(app.appointmentDate).getFullYear() === new Date().getFullYear());

            if (previousApp.length > 0 && upcomingApp.length > 0) {
                const prevAppDoc = doctors?.allDoc?.find(item => item._id === previousApp[previousApp.length - 1].doctorId);
                const nextAppDoc = doctors?.allDoc?.find(item => item._id === upcomingApp[0].doctorId);
                const prevApp = {
                    name: "prev",
                    doctorName: prevAppDoc.firstName,
                    hospitalName: prevAppDoc.currentHospitalWorkingName,
                    appointmentDate: previousApp[previousApp.length - 1].appointmentDate
                };
                const nextApp = {
                    name: "next",
                    doctorName: nextAppDoc.firstName,
                    hospitalName: nextAppDoc.currentHospitalWorkingName,
                    appointmentDate: upcomingApp[0].appointmentDate
                }

                return [prevApp, nextApp];

            }
            else if (previousApp.length === 0 && upcomingApp.length > 0) {
                const nextAppDoc = doctors?.allDoc?.find(item => item._id === upcomingApp[0].doctorId);
                const nextApp = {
                    name: "next",
                    doctorName: nextAppDoc.firstName,
                    hospitalName: nextAppDoc.currentHospitalWorkingName,
                    appointmentDate: upcomingApp[0].appointmentDate
                }

                return [nextApp];
            }
            else if (upcomingApp.length === 0 && previousApp.length > 0) {
                const prevAppDoc = doctors?.allDoc?.find(item => item._id === previousApp[previousApp.length - 1].doctorId);
                const prevApp = {
                    name: "prev",
                    doctorName: prevAppDoc.firstName,
                    hospitalName: prevAppDoc.currentHospitalWorkingName,
                    appointmentDate: previousApp[previousApp.length - 1].appointmentDate
                }

                return [prevApp];
            }
        }
    }

    submitAppointment(setErrorDisplay, setApt, myDoc, date, reason, aptStatus) {
        setErrorDisplay("block")
        let errorTimeout;
        errorTimeout = setTimeout(() => {
            clearTimeout(errorTimeout)
            setErrorDisplay("none")
        }, 3000)
        const newApt = {
            doctorId: myDoc,
            appointmentDate: moment(date).format('YYYY-MM-DD'),
            appointmentStartTime: moment(date).format('HH:MM'),
            status: aptStatus,
            reason
        }
        try {
            if (reason === "") throw new Error("Add some reason")
            setApt(newApt)
            // return { setApt, setErrorDisplay }
        }
        catch (e) {
            console.error(e.message);
            toast.error(e.message)
        }
    }
}