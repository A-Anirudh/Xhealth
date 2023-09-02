package com.example.xhealth.viewModels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.xhealth.User
import com.example.xhealth.network.XHealthApi
import com.example.xhealth.network.profileDetails
import kotlinx.coroutines.launch

class profileDetailsViewModel(
    dataViewModel: dataViewModel
) : ViewModel() {
    var user:profileDetails?=null;

    init {
        viewModelScope.launch {
            val headers=mapOf("email" to dataViewModel.email,"password" to dataViewModel.password)
            user=XHealthApi.retrofitService.getProfile(headers);
        }
    }
}