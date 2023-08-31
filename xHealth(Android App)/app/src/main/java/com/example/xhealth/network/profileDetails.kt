package com.example.xhealth.network


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class profileDetails(
    @SerialName("bloodGroup")
    var bloodGroup: String,
    @SerialName("city")
    var city: String,
    @SerialName("dateOfBirth")
    var dateOfBirth: String,
    @SerialName("email")
    var email: String,
    @SerialName("firstName")
    var firstName: String,
    @SerialName("gender")
    var gender: String,
    @SerialName("_id")
    var id: String,
    @SerialName("lastName")
    var lastName: String,
    @SerialName("phoneNumber")
    var phoneNumber: String,
    @SerialName("pincode")
    var pincode: String,
    @SerialName("state")
    var state: String
)
