package com.example.xhealth.viewModels

import android.content.ContentValues.TAG
import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.xhealth.network.XHealthApi
import com.example.xhealth.network.healthRecordNew
import kotlinx.coroutines.launch

class healthRecordViewModel (dataViewModel: dataViewModel): ViewModel() {
    var dataReady:Boolean by mutableStateOf(false);
    var data:healthRecordNew? by mutableStateOf(null);

    init {
        viewModelScope.launch {
            try {
                var headers=mapOf("email" to dataViewModel.email, "password" to dataViewModel.password)
                Log.d(TAG,headers.toString())
                data=XHealthApi.retrofitService.getHealthRecord(headers);
                Log.d(TAG,data.toString());
                dataReady=true;
            }catch (e:Exception){
                Log.e(TAG,e.message.toString());
            }
        }
    }
}