package com.example.xhealth.network

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class tokenSendRes(
    var status:String,
    var email:String,
    var token:String
)


@Serializable
data class tokenSendReq(
    var email:String,
    var password:String,
    var token:String
)






