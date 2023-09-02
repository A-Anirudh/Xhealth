package com.example.xhealth.repository

import android.app.Application
import android.content.Context
import android.service.autofill.UserData
import androidx.datastore.core.DataStore
import com.example.xhealth.User
import com.example.xhealth.network.XHealthApi
import com.example.xhealth.network.XHealthApiService
import com.example.xhealth.network.profileDetails
import com.example.xhealth.userDatastore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first


interface UserRepository {
    suspend fun getUser():Flow<User>
    suspend fun setUser(email: String,password: String)
    suspend fun getUserData(email: String,password: String):profileDetails
    suspend fun setAlarm()
}

class LocalUserRepository constructor(
    private val userDataStore: DataStore<User>
):UserRepository{

    val email:String=""
    val password:String=""
    val alarmSet:Boolean=true;

    override suspend fun getUser(): Flow<User> {
        return userDataStore.data
    }

    override suspend fun setUser(email:String,password:String){
        userDataStore.updateData {
            it.toBuilder().setEmail(email).setPassword(password).build()

        }
    }

    override suspend fun getUserData(email:String,password: String):profileDetails {
        val headers: MutableMap<String, String> =
            mutableMapOf("email" to email, "password" to password)
        return XHealthApi.retrofitService.getProfile(headers)
    }

    override suspend fun setAlarm() {
        userDataStore.updateData {
            it.toBuilder().setAlarmSet(true).build()
        }
    }
}