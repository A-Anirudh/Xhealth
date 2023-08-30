import { useHospitalLoginMutation, useHospitalLogoutMutation, useHospitalRegisterMutation } from "../../slices/hospitalApiSlice";

export class Hospital {
    constructor() {}

    login() {
        const [loginHospital, { error }] = useHospitalLoginMutation();
        return [loginHospital, error]
    }

    logout() {
        const [logoutHospital] = useHospitalLogoutMutation();
        return logoutHospital
    }

    register() {
        const [registerHospital] = useHospitalRegisterMutation();
        return registerHospital
    }
}