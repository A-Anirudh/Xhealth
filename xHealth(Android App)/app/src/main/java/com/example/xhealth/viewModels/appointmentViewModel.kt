package com.example.xhealth.viewModels

import android.content.ContentValues.TAG
import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.xhealth.network.appointmentResponse
import com.example.xhealth.network.XHealthApi
import kotlinx.coroutines.launch

class appointmentViewModel(
    dataViewModel: dataViewModel
):ViewModel() {
    var allAppointment: List<appointmentResponse.Appointment>? by mutableStateOf(null)
    var dataReady:Boolean by mutableStateOf(false)
    init {
        viewModelScope.launch {
            var headers=mapOf("email" to dataViewModel.email, "password" to dataViewModel.password)
            allAppointment=XHealthApi.retrofitService.getAllAppointment(headers)
            dataReady=true
        }
    }
}