/**
 * @description Adds the specified date to ```timeSlotsBooked``` field in Doctor model as a string
 * @param {Instance} doc - instance of Doctor model 
 * @param {Date} d - Date 
 */

const addDocArray = async (doc, d) => {
    doc.timeSlotsBooked.push(d.toString());
    
}

/**
 * @description Adds the specified date to ```userTimeSlolt``` field in User model as a string
 * @param {Instance} user - instance of User model 
 * @param {Date} d - Date 
 */
const addUserArray = async (user, d) => {
    user.userTimeSlot.push(d.toString());
}

/**
@desc: This is desc
@param {Instance} doc: Instance of doctor model
* @param {String} date - appointmentDate as a string
*/
const removeDocArray = async (doc, date) => {
    const index = doc.timeSlotsBooked.indexOf(date)
    console.log(`remove doc array: ${index}`)
    if (index > -1) { // only splice array when item is found
        doc.timeSlotsBooked.splice(index, 1); // 2nd parameter means remove one item only
    }
    
}

/**
 * @description Removes a specific appointment time from ```userTimeSlot``` field in User model
 * @param {Instance} user - instance of User model 
 * @param {String} date - appointmentDate as a string
 */

const removeUserArray = async (user, date) => {

    const uIndex = user.userTimeSlot.indexOf(date)
    console.log(`user array: ${uIndex}`)
    // console.log(`user index is ${uIndex}`);
    if (uIndex > -1) {
        user.userTimeSlot.splice(uIndex, 1)
    }
    console.log(user.userTimeSlot)
    
}

export {addDocArray, addUserArray, removeDocArray, removeUserArray};