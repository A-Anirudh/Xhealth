package com.example.xhealth.viewModels

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
     var allDoctors:doctorClass?=null;
    init {
        viewModelScope.launch {
            allDoctors=XHealthApi.retrofitService.getDoc();
        }
    }
}
