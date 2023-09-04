package com.example.xhealth.network

import android.app.DownloadManager
import android.content.Context
import android.os.Environment
import androidx.core.net.toUri
import com.example.xhealth.viewModels.dataViewModel
import com.google.type.Date

class AndroidDownloder(context:Context) {
    private val downloadManager=context.getSystemService(DownloadManager::class.java)
    fun downloadFile(url:String,name:String,email:String,password:String){
        val request = DownloadManager.Request(url.toUri())
            .setMimeType("Application/PDF")
            .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            .setTitle(name)
            .setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS,name+Date.getDefaultInstance().toString())

        downloadManager.enqueue(request)
    }
}