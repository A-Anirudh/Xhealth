package com.example.xhealth.viewModels

import android.app.Application
import android.content.ContentValues.TAG
import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.ViewModelFactoryDsl
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.example.xhealth.network.XHealthApi
import com.example.xhealth.network.tokenSendReq
import com.example.xhealth.repository.LocalUserRepository
import com.example.xhealth.userDatastore
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import retrofit2.awaitResponse
import java.io.UncheckedIOException

object uiStates{
    val loggedOut="loggedOut"
    val loggedIn="loggedIn"
    val error="error"
}

class dataViewModel(
    val localUserRepository: LocalUserRepository
) : ViewModel() {

    var email:String by  mutableStateOf("")
    var token: String by mutableStateOf("")
    var password: String by mutableStateOf("")
    var LogInError: Boolean by mutableStateOf(false)
    var alarmSet: Boolean by mutableStateOf(true) //assuming its set
    init {
        getEmail();
    }

    private fun getEmail()=viewModelScope.launch {
        email=localUserRepository.getUser().first().email
        password=localUserRepository.getUser().first().password
        alarmSet= localUserRepository.getUser().first().alarmSet
        Log.d(TAG,alarmSet.toString()+"----------------")
    }

    fun setAlarm(){
        viewModelScope.launch {
            alarmSet=true
            localUserRepository.setAlarm()
        }

    }
    fun sendToken(OnSuccess: () -> Unit, OnFailure: () -> Unit, emailIn: String) {
        viewModelScope.launch {
            try {
                val body = tokenSendReq(email = emailIn, password = password, token = token)
                val result = XHealthApi.retrofitService.sendToken(body).awaitResponse().body()
                LogInError = result?.status != "Success"
                if (LogInError) {
                    OnFailure()
                } else {
                    OnSuccess()
//                    getRecords(OnSuccess=OnSuccess,OnFailure=OnFailure)
                    email=emailIn
                    localUserRepository.setUser(emailIn,password);
                }
            } catch (e: Exception) {
                OnFailure()
            }


        }

    }

//    fun getRecords(
//        OnSuccess:()->Unit,OnFailure:()->Unit
//    ) {
//        val headers: MutableMap<String, String> =
//            mutableMapOf("email" to "jagnath@mail.com", "password" to "1234")
//
//        viewModelScope.launch {
//            try {
//                healthData = XHealthApi.retrofitService.getHealthRecord(headers.toMap())
//                healthDataAvailability=true;
//                OnSuccess();
//            }catch(error : Exception){
//                OnFailure();
//            }
//        }
////    }
companion object {
    fun Factory(
        localUserRep:LocalUserRepository
    ):ViewModelProvider.Factory= viewModelFactory{
        initializer {
            dataViewModel(localUserRep)
        }
    }
}
}

