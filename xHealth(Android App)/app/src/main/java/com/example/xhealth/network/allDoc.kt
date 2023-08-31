package com.example.xhealth.network


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class allDoc(
    @SerialName("allDoc")
    var allDoc: List<AllDoc>
) {
    @Serializable
    data class AllDoc(
        @SerialName("avgRating")
        var avgRating: Int,
        @SerialName("bloodGroup")
        var bloodGroup: String,
        @SerialName("city")
        var city: String,
        @SerialName("createdAt")
        var createdAt: String,
        @SerialName("currentHospitalWorkingName")
        var currentHospitalWorkingName: String,
        @SerialName("dateOfBirth")
        var dateOfBirth: String,
        @SerialName("department")
        var department: String,
        @SerialName("email")
        var email: String,
        @SerialName("experience")
        var experience: String,
        @SerialName("firstName")
        var firstName: String,
        @SerialName("gender")
        var gender: String,
        @SerialName("gradCollegeName")
        var gradCollegeName: List<String>,
        @SerialName("_id")
        var id: String,
        @SerialName("lastName")
        var lastName: String,
        @SerialName("phoneNumber")
        var phoneNumber: String,
        @SerialName("pincode")
        var pincode: String,
        @SerialName("qualification")
        var qualification: List<String>,
        @SerialName("registrationNumber")
        var registrationNumber: String,
        @SerialName("state")
        var state: String,
        @SerialName("timeSlotsBooked")
        var timeSlotsBooked: List<String>,
        @SerialName("updatedAt")
        var updatedAt: String,
        @SerialName("__v")
        var v: Int,
        @SerialName("workingHourEnd")
        var workingHourEnd: String,
        @SerialName("workingHourStart")
        var workingHourStart: String
    )
}