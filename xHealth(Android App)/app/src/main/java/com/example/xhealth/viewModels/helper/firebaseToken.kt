package com.example.xhealth.viewModels.helper

import android.content.ContentValues.TAG
import android.util.Log
import com.example.xhealth.viewModels.dataViewModel
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging

fun getToken(viewModel: dataViewModel){
    FirebaseMessaging.getInstance().token.addOnCompleteListener(
        OnCompleteListener { task ->
            if (!task.isSuccessful) {
                Log.w(TAG, "Fetching FCM registration token failed", task.exception)
                return@OnCompleteListener
            }

            // Get new FCM registration token
            viewModel.token=task.result
        }
    )
}