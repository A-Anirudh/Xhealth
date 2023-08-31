package com.example.xhealth.alarm

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.example.xhealth.R
import com.example.xhealth.network.healthRecordNew
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.util.Calendar
import java.util.Date
import java.util.logging.Handler

data class AlarmItem(
    val time:LocalDateTime,
    val message:String
)

interface  AlarmScheduler{
    fun schedule(item: AlarmItem){

    }
    fun repeating(){

    }
    fun cancel(item: AlarmItem){

    }
}

class AlarmReceiver:BroadcastReceiver(){
    override fun onReceive(context: Context,intent: Intent?) {
        var name=intent?.getStringExtra("med")
        var builder =
            NotificationCompat.Builder(context, "ID")
                .setSmallIcon(R.drawable.xhealthlogo)
                .setContentTitle(name)
                .setContentText("Its time for a dose of $name")
                .setPriority(NotificationCompat.PRIORITY_MAX)
        with(NotificationManagerCompat.from(context)) {
            // notificationId is a unique int for each notification that you must define
            notify((Math.random() * 1000).toInt(), builder.build())
        }
    }
}
class RepeatingAlarmReceiver:BroadcastReceiver(){
    override fun onReceive(context: Context,intent: Intent?) {
        var builder =
            NotificationCompat.Builder(context, "ID")
                .setSmallIcon(R.drawable.xhealthlogo)
                .setContentTitle("XHealth is in a healthy State!")
                .setContentText("Everything is alright! as far as you can see this notification,This notification is sent every 10 minutes")
                .setPriority(NotificationCompat.PRIORITY_MAX)
        with(NotificationManagerCompat.from(context)) {
            // notificationId is a unique int for each notification that you must define
            notify(1, builder.build())
        }

    }
}

class AndroidAlarmScheduler(
    private val context:Context
):AlarmScheduler{
    private val alarmManager=context.getSystemService(AlarmManager::class.java)
     fun schedule(calendar: Calendar,name:String) {
        val intent=Intent(context,AlarmReceiver::class.java).apply {
            putExtra("med",name)
        }
        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            calendar.timeInMillis,
//            time.atZone(ZoneId.systemDefault()).toEpochSecond()* (1000),
            PendingIntent.getBroadcast(
                context,
                (name.length+(calendar.timeInMillis).toInt()),
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        )
         Log.d(TAG,"Successfully set Alarm")
    }

    override fun cancel(item: AlarmItem) {
        alarmManager.cancel(
            PendingIntent.getBroadcast(
                context,
                item.hashCode(),
                Intent(context,AlarmReceiver::class.java),
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        )
    }

    override fun repeating() {
        val intent=Intent(context,RepeatingAlarmReceiver::class.java)
        val calendar=Calendar.getInstance().apply{
            set(Calendar.HOUR_OF_DAY,Calendar.getInstance().get(Calendar.HOUR_OF_DAY))
            set(Calendar.MINUTE,Calendar.getInstance().get(Calendar.MINUTE))
        }
        alarmManager.setRepeating(
            AlarmManager.RTC_WAKEUP,
            calendar.timeInMillis,
            1000 * 60 * 10,
            PendingIntent.getBroadcast(
                context,
                1,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        )
    }

}


fun setAlarm(meds:List<healthRecordNew.History.Medications>, context: Context){
    Log.d(TAG,meds.toString())
    val formatter=SimpleDateFormat("yyyy-MM-dd")
    val scheduler=AndroidAlarmScheduler(context)
    val today=formatter.parse(formatter.format(Date()))
    for(oneAppointment in meds){
        val d=formatter.parse(oneAppointment.endDate)
        if(d.after(today)){
            //set
            for(med in oneAppointment.allMeds){
                for(time in med.timings){

                    if(time.toInt()>Calendar.getInstance().get(Calendar.HOUR_OF_DAY)) {
                        Log.d(TAG,time.toString()+"=="+Calendar.HOUR_OF_DAY.toString())
                        val c = Calendar.getInstance().apply {
                            set(Calendar.HOUR_OF_DAY, time.toInt())    //in 24h format
                        }
                        scheduler.schedule(c, med.name+"")
                    }
                }
            }
        }
    }
    val c = Calendar.getInstance().apply {
        set(Calendar.HOUR_OF_DAY, Calendar.getInstance().get(Calendar.HOUR_OF_DAY))
        set(Calendar.MINUTE,Calendar.getInstance().get(Calendar.MINUTE)+2)//in 24h format
    }
    scheduler.schedule(c, "test")
    Log.d(TAG,"Alarm set at "+c.toString())
    var builder =
        NotificationCompat.Builder(context, "ID")
            .setSmallIcon(R.drawable.darkxhealthlogo)
            .setContentTitle("Remainders have been set!")
            .setContentText("Please make sure you have XHealth app pinned in your background apps to get remainders seamlessly!")
            .setPriority(NotificationCompat.PRIORITY_HIGH)
    with(NotificationManagerCompat.from(context)) {
        // notificationId is a unique int for each notification that you must define
        notify((Math.random() * 1000).toInt(), builder.build())
    }
}