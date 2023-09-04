package com.example.xhealth

import android.Manifest
import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.datastore.core.DataStore
import androidx.datastore.dataStore
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.xhealth.alarm.AlarmItem
import com.example.xhealth.alarm.AndroidAlarmScheduler
import com.example.xhealth.alarm.setAlarm
import com.example.xhealth.homeScreen.startScreen
import com.example.xhealth.network.AndroidDownloder
import com.example.xhealth.network.XHealthApi
import com.example.xhealth.network.XHealthApiService
import com.example.xhealth.repository.LocalUserRepository
import com.example.xhealth.theme.DynamicTheme
import com.example.xhealth.viewModels.dataViewModel
import com.example.xhealth.viewModels.doctorViewModel
import kotlinx.coroutines.flow.first
import java.time.LocalDateTime
import java.util.Calendar

val Context.userDatastore: DataStore<User> by dataStore(
    fileName = "user.pb",
    serializer = UserSerializer
)

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        val scheduler=AndroidAlarmScheduler(this)
        val alarmItem:AlarmItem= AlarmItem(
            time = LocalDateTime.now().plusSeconds((10).toLong()),
            message = "hello from the alarm"
        )
        scheduler.schedule(alarmItem)

        super.onCreate(savedInstanceState)
        installSplashScreen();
//        Log.d(TAG,WorkManager.getInstance(this).enqueue(getDataRequest).result.isDone.toString()+"++++++++++++++++++++++")

        setContent {
            DynamicTheme(){
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val name = getString(R.string.channel_name)
                    val descriptionText = getString(R.string.channel_description)
                    val importance = NotificationManager.IMPORTANCE_HIGH
                    val channel = NotificationChannel("ID", name, importance).apply {
                        description = descriptionText
                    }
                    // Register the channel with the system
                    val notificationManager: NotificationManager =
                        getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                    notificationManager.createNotificationChannel(channel)
                    val model: dataViewModel = viewModel(
                        factory = dataViewModel.Factory(
                            localUserRep = LocalUserRepository(userDatastore)
                        )
                    )
                    val ready by rememberSaveable { mutableStateOf(false) }
//                    Button(onClick = {
//                        AndroidAlarmScheduler(context = this ).schedule(Calendar.getInstance().apply {
//                            timeInMillis = System.currentTimeMillis()
//                            set(Calendar.HOUR_OF_DAY, 20)
//                            set(Calendar.MINUTE, 28)
//                        })
//                    }) {
//
//                    }

                    startScreen(model)
                }
            }
        }
    }
}

