package com.example.xhealth.worker

import android.app.Notification
import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkRequest
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.example.xhealth.R
import com.example.xhealth.userDatastore
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import java.time.Duration
import java.util.concurrent.TimeUnit

class UploadWorker(appContext: Context, workerParams: WorkerParameters):
    Worker(appContext, workerParams) {
    override fun doWork(): Result {
        // Do the work here--in this case, upload the images.
        var builder = NotificationCompat.Builder(this.applicationContext, "ID")
            .setSmallIcon(R.drawable.xhealthlogo)
            .setContentTitle("fs")
            .setContentText("fd")
            .setPriority(NotificationCompat.PRIORITY_HIGH)
        with(NotificationManagerCompat.from(this.applicationContext)) {
            // notificationId is a unique int for each notification that you must define
            notify((Math.random() * 1000).toInt(), builder.build())
        }
        // Indicate whether the work finished successfully with the Result
        return Result.success()
    }
}


val uploadWorkRequest: WorkRequest =

        PeriodicWorkRequestBuilder<UploadWorker>(1, TimeUnit.MINUTES)
        // Additional configuration
//        .setInitialDelay(Duration.ofMinutes(1))
        .build()



//OneTimeWorkRequestBuilder<UploadWorker>()
//.build()
