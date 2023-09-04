package com.example.xhealth.navigatedHomeScreens

import android.content.ContentValues.TAG
import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.xhealth.network.appointmentResponse
import com.example.xhealth.homePage.convertTo12Hour
import com.example.xhealth.network.doctorClass
import com.example.xhealth.viewModels.appointmentViewModel
import com.example.xhealth.viewModels.doctorViewModel
import kotlinx.serialization.json.Json
import java.text.SimpleDateFormat

@Composable
fun allAppointmentsScreen(
    appointmentData:List<appointmentResponse.Appointment>,
    doctorClass: doctorClass
) {
    val formatter = SimpleDateFormat("EEE MMM dd yyyy")

    val completedAppointment = appointmentData.filter {
        it.status == "Completed"
    }
    val scheduledAppointment = appointmentData.filter {
        it.status == "Scheduled"
    }
    val progressAppointment = appointmentData.filter {
        it.status == "Progress"
    }
    val cancelledAppointment = appointmentData.filter {
        it.status == "Cancelled"
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight(),
    ) {
        item {
            Text(text = "Current Appointments", fontSize = 20.sp, modifier = Modifier.padding(horizontal = 5.dp, vertical = 3.dp))
        }
        item {
            ElevatedCard(
                colors = CardDefaults.elevatedCardColors(
                    containerColor = MaterialTheme.colorScheme.background
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(3.dp)
            ) {

                if(progressAppointment.isEmpty()){
                    Column(
                        Modifier.fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ){
                        Text(text = "Looks like you don't have any appointments here!",fontSize=13.sp,modifier=Modifier.padding(5.dp))

                    }
                }
                for (it in progressAppointment){
                    val doc = doctorClass.allDoc.find { d ->
                        d.id == it.doctorId
                    }

                    if (doc != null) {
                        Appointment(it = it, doc = doc)
                    }
                }
            }
        }

    item{
        Text(text = "Scheduled Appointments", fontSize = 20.sp, modifier = Modifier.padding(horizontal = 5.dp, vertical = 3.dp))

    }
    item{
        ElevatedCard(
            colors = CardDefaults.elevatedCardColors(
                containerColor = MaterialTheme.colorScheme.background
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(3.dp)
        ) {
            if(scheduledAppointment.isEmpty()){
                Column(
                    Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ){
                    Text(text = "Looks like you don't have any appointments here!",fontSize=13.sp,modifier=Modifier.padding(5.dp))

                }
            }
            for(it in scheduledAppointment){

                    val doc = doctorClass.allDoc.find { d ->
                        d.id == it.doctorId
                    }

                    if (doc != null) {
                        Appointment(it = it, doc = doc)
                    }
                }

        }
    }
    item{
        Text(text = "Completed Appointments", fontSize = 20.sp, modifier = Modifier.padding(horizontal = 5.dp, vertical = 3.dp))

    }
    item{
        ElevatedCard(
            colors = CardDefaults.elevatedCardColors(
                containerColor = MaterialTheme.colorScheme.background
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(3.dp)
        ) {
            if(completedAppointment.isEmpty()){
                Column(
                    Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ){
                    Text(text = "Looks like you don't have any appointments here!",fontSize=13.sp,modifier=Modifier.padding(5.dp))

                }
            }
            for(it in completedAppointment){

                    val doc = doctorClass.allDoc.find { d ->
                        d.id == it.doctorId
                    }

                    if (doc != null) {
                        Appointment(it = it, doc = doc)
                    }

            }
        }
    }

    item {
        Text(text = "Cancelled Appointments", fontSize = 20.sp, modifier = Modifier.padding(horizontal = 5.dp, vertical = 3.dp))

    }


    item{
        ElevatedCard(
            colors = CardDefaults.elevatedCardColors(
                containerColor = MaterialTheme.colorScheme.background
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(3.dp)
        ){
            if(cancelledAppointment.isEmpty()){
                Column(
                    Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ){
                    Text(text = "Looks like you don't have any appointments here!",fontSize=13.sp,modifier=Modifier.padding(5.dp))

                }
            }
            for(it in cancelledAppointment){

                    val doc = doctorClass.allDoc.find { d ->
                        d.id == it.doctorId
                    }
                    if (doc != null) {
                        Appointment(it = it, doc = doc)
                    }


            }
        }
    }








}
}

@Composable
fun Appointment(it: appointmentResponse.Appointment, doc: doctorClass.AllDoc){
    val time=convertTo12Hour(it.appointmentStartTime.split(":")[0].toInt())
    val month=it.appointmentDate.substring(4,7)
    val date=it.appointmentDate.substring(8,10)
    Card(
        modifier= Modifier
            .fillMaxWidth()
            .padding(7.dp),
        colors = CardDefaults.elevatedCardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer
        )
    ) {
        Column(modifier= Modifier
            .fillMaxWidth()
            .padding(5.dp)) {
            Row(
                modifier=Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ){
                Text(text = doc?.firstName+" "+doc?.lastName, fontSize = 18.sp)
                Text(text = time.dropLast(2)+":"+it.appointmentStartTime.split(":")[1]+time.takeLast(2))
                Text(text = "$date $month")
            }
            Row(
                modifier=Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically)
            {
                Text(text = it.reason, fontSize = 16.sp,modifier=Modifier.padding(start=3.dp))
            }

            Row(
                modifier=Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End,
                verticalAlignment = Alignment.CenterVertically
            ){
                Text(text=doc?.currentHospitalWorkingName+" "+doc?.city)
            }
        }
    }
}


@Composable
fun AllAppointmentScreenPreview(
    appointmentViewModel: appointmentViewModel,
    doctorViewModel: doctorViewModel
){
    var appointmentData=appointmentViewModel.allAppointment
    if (appointmentData != null) {
        doctorViewModel.allDoctors?.let { allAppointmentsScreen(appointmentData = appointmentData, doctorClass = it) }
    }
}


