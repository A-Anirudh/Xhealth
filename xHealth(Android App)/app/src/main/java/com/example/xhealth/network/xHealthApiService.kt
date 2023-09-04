package com.example.xhealth.network

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.HeaderMap
import retrofit2.http.POST


private const val BASE_URL = "https://xhealth-git-jagnathreddy9-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/"

val json= Json { ignoreUnknownKeys=true }

private val retrofit=Retrofit
    .Builder()
    .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
    .baseUrl(BASE_URL)
    .build()

@Serializable
data class res(
    var data:String
)

interface XHealthApiService{
//    @GET("photos")
//    suspend fun getPhotos():List<MarsPhoto>
    @POST("api/notification/newDevice")
    fun sendToken(@Body req: tokenSendReq): Call<tokenSendRes>

    @GET("api/users/healthRecords/android/all")
    suspend fun getHealthRecord(@HeaderMap headers:Map<String,String>): healthRecordNew

    @GET("api/users/profile/android")
    suspend fun getProfile(@HeaderMap headers:Map<String,String>):profileDetails

    @GET("api/doctors/all")
    suspend fun getDoc():doctorClass

    @GET("/api/users/appointments/android")
    suspend fun getAllAppointment(@HeaderMap headers:Map<String,String>): List<appointmentResponse.Appointment>


}

object XHealthApi {
    val retrofitService : XHealthApiService by lazy {
        retrofit.create(XHealthApiService::class.java)
    }
}