// ? Function to convert time in "HH:mm" format to minutes since midnight
export const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

