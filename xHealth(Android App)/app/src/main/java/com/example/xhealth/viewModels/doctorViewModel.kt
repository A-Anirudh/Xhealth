package com.example.xhealth.viewModels

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.example.xhealth.network.XHealthApi
import com.example.xhealth.network.XHealthApiService
import com.example.xhealth.network.doctorClass
import kotlinx.coroutines.launch
import okhttp3.internal.wait

class doctorViewModel(
) : ViewModel() {
    var allDoctors:doctorClass? by mutableStateOf(null);
    var dataReady:Boolean by mutableStateOf(false);
    init {
        viewModelScope.launch {
            allDoctors=XHealthApi.retrofitService.getDoc();
            dataReady=true
        }
    }
}
