package com.example.xhealth

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.media.RingtoneManager
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat.getSystemService
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkRequest
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.example.xhealth.worker.uploadWorkRequest
import com.google.firebase.messaging.FcmBroadcastProcessor
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import java.util.concurrent.ExecutorService

class MyFirebaseMessagingService : FirebaseMessagingService() {


    override fun onMessageReceived(message: RemoteMessage) {
        //        WorkManager.getInstance(application).enqueue().result
//        Log.d(TAG,WorkManager.getInstance(this).enqueue(getDataRequest).state.toString())
//        Log.d(TAG, "received")
        class GetDataWorker(appContext: Context, workerParams: WorkerParameters) :
            Worker(appContext, workerParams) {
            override fun doWork(): Result {
                runBlocking {
                    for (i in 1..5) {
                        var builder =
                            NotificationCompat.Builder(this@MyFirebaseMessagingService, "ID")
                                .setSmallIcon(R.drawable.xhealthlogo)
                                .setContentTitle("User is $i")
                                .setContentText(applicationContext.userDatastore.data.first().email)
                                .setPriority(NotificationCompat.PRIORITY_HIGH)
                        with(NotificationManagerCompat.from(this@MyFirebaseMessagingService)) {
                            // notificationId is a unique int for each notification that you must define
                            notify((Math.random() * 1000).toInt(), builder.build())
                        }
                        delay(1000)
                    }
                }
                return Result.success()
            }
        }

        val getDataRequest: WorkRequest =
            OneTimeWorkRequestBuilder<GetDataWorker>().build()


        var builder = NotificationCompat.Builder(this, "ID")
            .setSmallIcon(R.drawable.xhealthlogo)
            .setContentTitle(message.notification?.title)
            .setContentText(message.notification?.body)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
        with(NotificationManagerCompat.from(this)) {
            // notificationId is a unique int for each notification that you must define
            notify((Math.random() * 1000).toInt(), builder.build())
        }
        WorkManager.getInstance(this).enqueue(getDataRequest).state.isInitialized
    }

}
