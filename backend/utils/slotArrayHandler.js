const addDocArray = (doc, d) => {
    doc.timeSlotsBooked.push(d.toString());
}

const addUserArray = (user, d) => {
    user.userTimeSlot.push(d.toString());
}

const removeDocArray = (doc, deletedAppointments) => {
    const index = doc.timeSlotsBooked.indexOf(deletedAppointments.appointmentDate)
    // console.log(`doctor index is ${index}`)
    if (index > -1) { // only splice array when item is found
        doc.timeSlotsBooked.splice(index, 1); // 2nd parameter means remove one item only
    }
}

const removeUserArray = (user, deletedAppointments) => {
    const uIndex = user.userTimeSlot.indexOf(deletedAppointments.appointmentDate)
    // console.log(`user index is ${uIndex}`);
    if (uIndex > -1) {
        user.userTimeSlot.splice(uIndex, 1)
    }
}

export {addDocArray, addUserArray, removeDocArray, removeUserArray};