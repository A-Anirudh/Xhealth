
import kotlinx.serialization.Serializable

import kotlinx.serialization.SerialName

@Serializable
data class appointmentResponse(
    @SerialName("appointments")
    var appointments: List<Appointment>
) {
    @Serializable
    data class Appointment(
        @SerialName("appointmentDate")
        var appointmentDate: String,
        @SerialName("appointmentStartTime")
        var appointmentStartTime: String,
        @SerialName("createdAt")
        var createdAt: String,
        @SerialName("doctorId")
        var doctorId: String,
        @SerialName("_id")
        var id: String,
        @SerialName("reason")
        var reason: String,
        @SerialName("status")
        var status: String,
        @SerialName("updatedAt")
        var updatedAt: String,
        @SerialName("userId")
        var userId: String,
        @SerialName("__v")
        var v: Int
    )
}