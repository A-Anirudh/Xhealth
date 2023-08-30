let debounce;

export const getResult = (e, doctors, setDoctorsData) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        if (e.target.value === "") {
            setDoctorsData(doctors);
        }
        else {
            const filteredDoctors = [
                ...doctors.allDoc.filter(item =>
                    item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.department.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.currentHospitalWorkingName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.avgRating === Number(e.target.value)
                )
            ]
            setDoctorsData({ allDoc: [...filteredDoctors] });
        }
    }, 300)
}