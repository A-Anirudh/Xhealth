package com.example.xhealth.navigatedHomeScreens

import android.content.ContentValues.TAG
import android.util.Log
import androidx.compose.foundation.gestures.ScrollableState
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import appointmentResponse
import com.example.xhealth.homePage.convertTo12Hour
import com.example.xhealth.network.doctorClass
import kotlinx.serialization.json.Json
import java.text.SimpleDateFormat
import java.util.Date

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
fun Appointment(it: appointmentResponse.Appointment,doc: doctorClass.AllDoc){
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

@Preview(showSystemUi = true, showBackground = true)
@Composable
fun AllAppointmentScreenPreview(){
    val data="""[
    {
        "_id": "64cf96e527fdf8c675dbe696",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64cead652a1fae980800d582",
        "appointmentDate": "Sun Mar 13 2022 09:00:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "9:00",
        "reason": "",
        "status": "Scheduled",
        "createdAt": "2023-08-06T12:49:41.919Z",
        "updatedAt": "2023-08-06T12:49:41.919Z",
        "__v": 0
    },
    {
        "_id": "64cf971f27fdf8c675dbe6a1",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf1e2a1fae980800d588",
        "appointmentDate": "Mon Mar 14 2022 10:30:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "10:30",
        "reason": "Follow-up checkup",
        "status": "Completed",
        "createdAt": "2023-08-06T12:50:39.831Z",
        "updatedAt": "2023-08-06T12:50:39.831Z",
        "__v": 0
    },
    {
        "_id": "64cf972a27fdf8c675dbe6a9",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4ba",
        "appointmentDate": "Tue Mar 15 2022 12:15:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "12:15",
        "reason": "General health consultation",
        "status": "In Progress",
        "createdAt": "2023-08-06T12:50:50.919Z",
        "updatedAt": "2023-08-06T12:50:50.919Z",
        "__v": 0
    },
    {
        "_id": "64cf973527fdf8c675dbe6b1",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64cead652a1fae980800d582",
        "appointmentDate": "Wed Mar 16 2022 13:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "13:45",
        "reason": "Unexpected travel plans",
        "status": "Cancelled",
        "createdAt": "2023-08-06T12:51:01.317Z",
        "updatedAt": "2023-08-06T12:51:01.317Z",
        "__v": 0
    },
    {
        "_id": "64cf974227fdf8c675dbe6b9",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4bb",
        "appointmentDate": "Thu Mar 17 2022 15:00:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "15:00",
        "reason": "Vaccination appointment",
        "status": "Scheduled",
        "createdAt": "2023-08-06T12:51:14.563Z",
        "updatedAt": "2023-08-06T12:51:14.563Z",
        "__v": 0
    },
    {
        "_id": "64cf975c27fdf8c675dbe6c4",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf1e2a1fae980800d588",
        "appointmentDate": "Fri Mar 18 2022 16:30:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "16:30",
        "reason": "Routine checkup",
        "status": "Completed",
        "createdAt": "2023-08-06T12:51:41.161Z",
        "updatedAt": "2023-08-06T12:51:41.161Z",
        "__v": 0
    },
    {
        "_id": "64cf976f27fdf8c675dbe6d0",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4be",
        "appointmentDate": "Sat Mar 19 2022 15:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "15:45",
        "reason": "Medication review",
        "status": "In Progress",
        "createdAt": "2023-08-06T12:51:59.269Z",
        "updatedAt": "2023-08-06T12:51:59.269Z",
        "__v": 0
    },
    {
        "_id": "64cf977827fdf8c675dbe6dc",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf1e2a1fae980800d588",
        "appointmentDate": "Sun Mar 20 2022 12:20:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "12:20",
        "reason": "Dental checkup",
        "status": "Scheduled",
        "createdAt": "2023-08-06T12:52:09.131Z",
        "updatedAt": "2023-08-06T12:52:09.131Z",
        "__v": 0
    },
    {
        "_id": "64cf978127fdf8c675dbe6e4",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64cead652a1fae980800d582",
        "appointmentDate": "Mon Mar 21 2022 14:00:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "14:00",
        "reason": "Not feeling well",
        "status": "Cancelled",
        "createdAt": "2023-08-06T12:52:17.515Z",
        "updatedAt": "2023-08-06T12:52:17.515Z",
        "__v": 0
    },
    {
        "_id": "64d079c77cab518015cd40fe",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4ba",
        "appointmentDate": "Tue Mar 22 2022 10:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "10:45",
        "reason": "Blood test results",
        "status": "Expired",
        "createdAt": "2023-08-07T04:57:43.511Z",
        "updatedAt": "2023-08-07T04:57:43.511Z",
        "__v": 0
    },
    {
        "_id": "64cf978927fdf8c675dbe6ec",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4ba",
        "appointmentDate": "Tue Mar 22 2022 11:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "11:45",
        "reason": "Blood test results",
        "status": "Completed",
        "createdAt": "2023-08-06T12:52:25.593Z",
        "updatedAt": "2023-08-06T12:52:25.593Z",
        "__v": 0
    },
    {
        "_id": "64d07a117cab518015cd4114",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4ba",
        "appointmentDate": "Thu Sep 22 2022 09:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "9:45",
        "reason": "Blood test results",
        "status": "Scheduled",
        "createdAt": "2023-08-07T04:58:58.173Z",
        "updatedAt": "2023-08-07T04:58:58.173Z",
        "__v": 0
    },
    {
        "_id": "64d079e77cab518015cd4109",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4ba",
        "appointmentDate": "Thu Sep 22 2022 10:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "10:45",
        "reason": "Blood test results",
        "status": "Expired",
        "createdAt": "2023-08-07T04:58:15.420Z",
        "updatedAt": "2023-08-07T04:58:15.420Z",
        "__v": 0
    },
    {
        "_id": "64d07a227cab518015cd411f",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4ba",
        "appointmentDate": "Fri Sep 23 2022 09:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "9:45",
        "reason": "Blood test results",
        "status": "Scheduled",
        "createdAt": "2023-08-07T04:59:15.220Z",
        "updatedAt": "2023-08-07T04:59:15.220Z",
        "__v": 0
    },
    {
        "_id": "64cf93b127fdf8c675dbe681",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64cead652a1fae980800d582",
        "appointmentDate": "Sun Aug 13 2023 11:00:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "11:00",
        "reason": "I have a crush on the doctor",
        "status": "Scheduled",
        "createdAt": "2023-08-06T12:36:01.441Z",
        "updatedAt": "2023-08-07T04:20:45.794Z",
        "__v": 0
    },
    {
        "_id": "64d07a3a7cab518015cd412a",
        "userId": "64ce8065ecc46787ace3d9c8",
        "doctorId": "64ceaf56086173b4dac1f4ba",
        "appointmentDate": "Sat Sep 23 2023 09:45:00 GMT+0530 (India Standard Time)",
        "appointmentStartTime": "9:45",
        "reason": "Blood test results",
        "status": "Scheduled",
        "createdAt": "2023-08-07T04:59:38.651Z",
        "updatedAt": "2023-08-07T04:59:38.651Z",
        "__v": 0
    }
]"""
    val doctorJson="""{
    "allDoc": [
        {
            "_id": "64cead652a1fae980800d582",
            "firstName": "Aayanam",
            "lastName": "Anirudh",
            "email": "second@second.com",
            "phoneNumber": "9606144749",
            "bloodGroup": "O+",
            "dateOfBirth": "2022-03-25T00:00:00.000Z",
            "gender": "Male",
            "state": "Karnataka",
            "city": "Bengaluru",
            "pincode": "560073",
            "department": "Cardiology",
            "workingHourStart": "9:00",
            "workingHourEnd": "17:00",
            "qualification": [],
            "experience": "10 years",
            "currentHospitalWorkingName": "Manipal Hospital",
            "registrationNumber": "123908",
            "timeSlotsBooked": [
                "Mon May 16 2022 14:00:00 GMT+0530 (India Standard Time)",
                "Thu Jun 16 2022 14:00:00 GMT+0530 (India Standard Time)",
                "Sat Jul 16 2022 14:00:00 GMT+0530 (India Standard Time)",
                "Tue Aug 16 2022 14:00:00 GMT+0530 (India Standard Time)",
                "Sun Mar 13 2022 09:00:00 GMT+0530 (India Standard Time)",
                "Wed Mar 16 2022 13:45:00 GMT+0530 (India Standard Time)",
                "Mon Mar 21 2022 14:00:00 GMT+0530 (India Standard Time)",
                "Sun Aug 13 2023 11:00:00 GMT+0530 (India Standard Time)"
            ],
            "avgRating": 0,
            "gradCollegeName": [
                "Ramiah"
            ],
            "createdAt": "2023-08-05T20:13:25.849Z",
            "updatedAt": "2023-08-07T04:20:45.794Z",
            "__v": 9
        },
        {
            "_id": "64ceaf1e2a1fae980800d588",
            "firstName": "Saksham",
            "lastName": "Reddy",
            "email": "saksham@mail.com",
            "phoneNumber": "9606144749",
            "bloodGroup": "O+",
            "dateOfBirth": "2022-03-25T00:00:00.000Z",
            "gender": "Male",
            "state": "Karnataka",
            "city": "Bengaluru",
            "pincode": "560073",
            "department": "Cardiology",
            "workingHourStart": "9:00",
            "workingHourEnd": "17:00",
            "qualification": [],
            "experience": "10 years",
            "currentHospitalWorkingName": "Apollo Hospital",
            "registrationNumber": "123908",
            "timeSlotsBooked": [
                "Sun Mar 13 2022 09:00:00 GMT+0530 (India Standard Time)",
                "Sun Mar 13 2022 14:00:00 GMT+0530 (India Standard Time)",
                "Mon Mar 14 2022 10:30:00 GMT+0530 (India Standard Time)",
                "Fri Mar 18 2022 16:30:00 GMT+0530 (India Standard Time)",
                "Sun Mar 20 2022 12:20:00 GMT+0530 (India Standard Time)"
            ],
            "avgRating": 0,
            "gradCollegeName": [
                "Ramiah"
            ],
            "createdAt": "2023-08-05T20:20:46.393Z",
            "updatedAt": "2023-08-06T12:52:09.000Z",
            "__v": 5
        },
        {
            "_id": "64ceaf56086173b4dac1f4ba",
            "firstName": "Dr. Sunita",
            "lastName": "Sharma",
            "email": "sunita.sharma@example.com",
            "phoneNumber": "9876543211",
            "bloodGroup": "B+",
            "dateOfBirth": "1978-12-10T00:00:00.000Z",
            "gender": "Female",
            "state": "Maharashtra",
            "city": "Mumbai",
            "pincode": "400001",
            "department": "Pediatrics",
            "workingHourStart": "08:30",
            "workingHourEnd": "16:30",
            "qualification": [
                "MBBS",
                "DCH"
            ],
            "experience": "15 years",
            "currentHospitalWorkingName": "Fortis Hospital",
            "registrationNumber": "DOC987654",
            "timeSlotsBooked": [
                "Tue Mar 15 2022 12:15:00 GMT+0530 (India Standard Time)",
                "Tue Mar 22 2022 11:45:00 GMT+0530 (India Standard Time)",
                "Tue Mar 22 2022 10:45:00 GMT+0530 (India Standard Time)",
                "Thu Sep 22 2022 10:45:00 GMT+0530 (India Standard Time)",
                "Thu Sep 22 2022 09:45:00 GMT+0530 (India Standard Time)",
                "Fri Sep 23 2022 09:45:00 GMT+0530 (India Standard Time)",
                "Sat Sep 23 2023 09:45:00 GMT+0530 (India Standard Time)"
            ],
            "avgRating": 0,
            "gradCollegeName": [
                "Grant Medical College",
                "KEM Hospital"
            ],
            "createdAt": "2023-08-05T20:21:42.892Z",
            "updatedAt": "2023-08-07T04:59:38.524Z",
            "__v": 7
        },
        {
            "_id": "64ceaf56086173b4dac1f4be",
            "firstName": "Dr. Arjun",
            "lastName": "Gupta",
            "email": "arjun.gupta@example.com",
            "phoneNumber": "9876543214",
            "bloodGroup": "B-",
            "dateOfBirth": "1982-11-30T00:00:00.000Z",
            "gender": "Male",
            "state": "Karnataka",
            "city": "Bengaluru",
            "pincode": "560001",
            "department": "Dermatology",
            "workingHourStart": "09:30",
            "workingHourEnd": "17:30",
            "qualification": [
                "MBBS",
                "DVD"
            ],
            "experience": "14 years",
            "currentHospitalWorkingName": "Manipal Hospital",
            "registrationNumber": "DOC112233",
            "timeSlotsBooked": [
                "Sat Mar 19 2022 15:45:00 GMT+0530 (India Standard Time)"
            ],
            "avgRating": 0,
            "gradCollegeName": [
                "St. John's Medical College",
                "Mysore Medical College"
            ],
            "createdAt": "2023-08-05T20:21:42.968Z",
            "updatedAt": "2023-08-06T12:51:59.143Z",
            "__v": 1
        },
        {
            "_id": "64ceaf56086173b4dac1f4bb",
            "firstName": "Dr. Priya",
            "lastName": "Singh",
            "email": "priya.singh@example.com",
            "phoneNumber": "9876543213",
            "bloodGroup": "AB+",
            "dateOfBirth": "1990-08-15T00:00:00.000Z",
            "gender": "Female",
            "state": "Uttar Pradesh",
            "city": "Lucknow",
            "pincode": "226001",
            "department": "Gynecology",
            "workingHourStart": "08:00",
            "workingHourEnd": "16:00",
            "qualification": [
                "MBBS",
                "DGO"
            ],
            "experience": "8 years",
            "currentHospitalWorkingName": "Medanta Hospital",
            "registrationNumber": "DOC998877",
            "timeSlotsBooked": [
                "Thu Mar 17 2022 15:00:00 GMT+0530 (India Standard Time)"
            ],
            "avgRating": 0,
            "gradCollegeName": [
                "King George's Medical University",
                "GSVM Medical College"
            ],
            "createdAt": "2023-08-05T20:21:42.961Z",
            "updatedAt": "2023-08-06T12:51:14.418Z",
            "__v": 1
        },
        {
            "_id": "64ceaf57086173b4dac1f4c1",
            "firstName": "Dr. Nisha",
            "lastName": "Chopra",
            "email": "nisha.chopra@example.com",
            "phoneNumber": "9876543215",
            "bloodGroup": "A-",
            "dateOfBirth": "1975-07-05T00:00:00.000Z",
            "gender": "Female",
            "state": "Punjab",
            "city": "Chandigarh",
            "pincode": "160001",
            "department": "Neurology",
            "workingHourStart": "10:30",
            "workingHourEnd": "18:30",
            "qualification": [
                "MBBS",
                "DM"
            ],
            "experience": "18 years",
            "currentHospitalWorkingName": "Max Hospital",
            "registrationNumber": "DOC121212",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Government Medical College and Hospital, Chandigarh",
                "Dayanand Medical College and Hospital"
            ],
            "createdAt": "2023-08-05T20:21:43.091Z",
            "updatedAt": "2023-08-05T20:21:43.091Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4c2",
            "firstName": "Dr. Manoj",
            "lastName": "Rao",
            "email": "manoj.rao@example.com",
            "phoneNumber": "9876543216",
            "bloodGroup": "O-",
            "dateOfBirth": "1976-03-25T00:00:00.000Z",
            "gender": "Male",
            "state": "Kerala",
            "city": "Kochi",
            "pincode": "682001",
            "department": "ENT",
            "workingHourStart": "08:00",
            "workingHourEnd": "16:00",
            "qualification": [
                "MBBS",
                "MS"
            ],
            "experience": "20 years",
            "currentHospitalWorkingName": "Aster Medicity",
            "registrationNumber": "DOC343434",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Government Medical College, Kottayam",
                "Trivandrum Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.092Z",
            "updatedAt": "2023-08-05T20:21:43.092Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4c6",
            "firstName": "Dr. Vikram",
            "lastName": "Malhotra",
            "email": "vikram.malhotra@example.com",
            "phoneNumber": "9876543218",
            "bloodGroup": "B+",
            "dateOfBirth": "1979-04-17T00:00:00.000Z",
            "gender": "Male",
            "state": "Haryana",
            "city": "Gurugram",
            "pincode": "122001",
            "department": "Psychiatry",
            "workingHourStart": "09:30",
            "workingHourEnd": "17:30",
            "qualification": [
                "MBBS",
                "MD"
            ],
            "experience": "13 years",
            "currentHospitalWorkingName": "Artemis Hospital",
            "registrationNumber": "DOC434343",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Pt. B.D. Sharma Post Graduate Institute of Medical Sciences",
                "PGIMS, Rohtak"
            ],
            "createdAt": "2023-08-05T20:21:43.276Z",
            "updatedAt": "2023-08-05T20:21:43.276Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4c3",
            "firstName": "Dr. Anjali",
            "lastName": "Mishra",
            "email": "anjali.mishra@example.com",
            "phoneNumber": "9876543217",
            "bloodGroup": "AB-",
            "dateOfBirth": "1988-06-12T00:00:00.000Z",
            "gender": "Female",
            "state": "Tamil Nadu",
            "city": "Chennai",
            "pincode": "600001",
            "department": "Ophthalmology",
            "workingHourStart": "09:00",
            "workingHourEnd": "17:00",
            "qualification": [
                "MBBS",
                "DOMS"
            ],
            "experience": "11 years",
            "currentHospitalWorkingName": "Sankara Eye Hospital",
            "registrationNumber": "DOC232323",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Madras Medical College",
                "Stanley Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.094Z",
            "updatedAt": "2023-08-05T20:21:43.094Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4c7",
            "firstName": "Dr. Pooja",
            "lastName": "Shah",
            "email": "pooja.shah@example.com",
            "phoneNumber": "9876543219",
            "bloodGroup": "A+",
            "dateOfBirth": "1983-09-08T00:00:00.000Z",
            "gender": "Female",
            "state": "West Bengal",
            "city": "Kolkata",
            "pincode": "700001",
            "department": "Dentistry",
            "workingHourStart": "08:30",
            "workingHourEnd": "16:30",
            "qualification": [
                "BDS",
                "MDS"
            ],
            "experience": "16 years",
            "currentHospitalWorkingName": "Ruby General Hospital",
            "registrationNumber": "DOC232323",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Dr. R. Ahmed Dental College & Hospital",
                "Guru Nanak Institute of Dental Sciences & Research"
            ],
            "createdAt": "2023-08-05T20:21:43.277Z",
            "updatedAt": "2023-08-05T20:21:43.277Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4c8",
            "firstName": "Dr. Sanjay",
            "lastName": "Kumar",
            "email": "sanjay.kumar@example.com",
            "phoneNumber": "9876543220",
            "bloodGroup": "B-",
            "dateOfBirth": "1984-11-23T00:00:00.000Z",
            "gender": "Male",
            "state": "Bihar",
            "city": "Patna",
            "pincode": "800001",
            "department": "General Medicine",
            "workingHourStart": "09:00",
            "workingHourEnd": "17:00",
            "qualification": [
                "MBBS",
                "MD"
            ],
            "experience": "9 years",
            "currentHospitalWorkingName": "Indira Gandhi Institute of Medical Sciences",
            "registrationNumber": "DOC676767",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Patna Medical College",
                "Darbhanga Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.278Z",
            "updatedAt": "2023-08-05T20:21:43.278Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4cc",
            "firstName": "Dr. Meera",
            "lastName": "Reddy",
            "email": "meera.reddy@example.com",
            "phoneNumber": "9876543221",
            "bloodGroup": "O+",
            "dateOfBirth": "1981-12-19T00:00:00.000Z",
            "gender": "Female",
            "state": "Telangana",
            "city": "Hyderabad",
            "pincode": "500001",
            "department": "Rheumatology",
            "workingHourStart": "10:00",
            "workingHourEnd": "18:00",
            "qualification": [
                "MBBS",
                "DM"
            ],
            "experience": "19 years",
            "currentHospitalWorkingName": "Care Hospitals",
            "registrationNumber": "DOC565656",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Osmania Medical College",
                "Gandhi Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.482Z",
            "updatedAt": "2023-08-05T20:21:43.482Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4ce",
            "firstName": "Dr. Aarti",
            "lastName": "Gupta",
            "email": "aarti.gupta@example.com",
            "phoneNumber": "9876543223",
            "bloodGroup": "AB+",
            "dateOfBirth": "1986-07-28T00:00:00.000Z",
            "gender": "Female",
            "state": "Madhya Pradesh",
            "city": "Bhopal",
            "pincode": "462001",
            "department": "Oncology",
            "workingHourStart": "09:30",
            "workingHourEnd": "17:30",
            "qualification": [
                "MBBS",
                "MD"
            ],
            "experience": "11 years",
            "currentHospitalWorkingName": "AIIMS Bhopal",
            "registrationNumber": "DOC232323",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Gandhi Medical College, Bhopal",
                "People's College of Medical Sciences & Research Centre"
            ],
            "createdAt": "2023-08-05T20:21:43.484Z",
            "updatedAt": "2023-08-05T20:21:43.484Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4cd",
            "firstName": "Dr. Rakesh",
            "lastName": "Yadav",
            "email": "rakesh.yadav@example.com",
            "phoneNumber": "9876543222",
            "bloodGroup": "A-",
            "dateOfBirth": "1977-10-14T00:00:00.000Z",
            "gender": "Male",
            "state": "Rajasthan",
            "city": "Jaipur",
            "pincode": "302001",
            "department": "Nephrology",
            "workingHourStart": "08:00",
            "workingHourEnd": "16:00",
            "qualification": [
                "MBBS",
                "DNB"
            ],
            "experience": "17 years",
            "currentHospitalWorkingName": "Sawai Man Singh Medical College",
            "registrationNumber": "DOC656565",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "SMS Medical College",
                "Jawaharlal Nehru Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.483Z",
            "updatedAt": "2023-08-05T20:21:43.483Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4d3",
            "firstName": "Dr. Natasha",
            "lastName": "Sinha",
            "email": "natasha.sinha@example.com",
            "phoneNumber": "9876543225",
            "bloodGroup": "A+",
            "dateOfBirth": "1983-02-06T00:00:00.000Z",
            "gender": "Female",
            "state": "Assam",
            "city": "Guwahati",
            "pincode": "781001",
            "department": "Gastroenterology",
            "workingHourStart": "08:30",
            "workingHourEnd": "16:30",
            "qualification": [
                "MBBS",
                "MCh"
            ],
            "experience": "14 years",
            "currentHospitalWorkingName": "Gauhati Medical College and Hospital",
            "registrationNumber": "DOC989898",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Gauhati Medical College",
                "Silchar Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.678Z",
            "updatedAt": "2023-08-05T20:21:43.678Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4d2",
            "firstName": "Dr. Rohan",
            "lastName": "Sharma",
            "email": "rohan.sharma@example.com",
            "phoneNumber": "9876543224",
            "bloodGroup": "B+",
            "dateOfBirth": "1974-06-22T00:00:00.000Z",
            "gender": "Male",
            "state": "Uttarakhand",
            "city": "Dehradun",
            "pincode": "248001",
            "department": "Endocrinology",
            "workingHourStart": "09:00",
            "workingHourEnd": "17:00",
            "qualification": [
                "MBBS",
                "DM"
            ],
            "experience": "18 years",
            "currentHospitalWorkingName": "Max Super Speciality Hospital",
            "registrationNumber": "DOC787878",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Institute of Medical Sciences, BHU",
                "Doon Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.677Z",
            "updatedAt": "2023-08-05T20:21:43.677Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4df",
            "firstName": "Dr. Amit",
            "lastName": "Patel",
            "email": "amit.patel@example.com",
            "phoneNumber": "9876543212",
            "bloodGroup": "O+",
            "dateOfBirth": "1980-09-25T00:00:00.000Z",
            "gender": "Male",
            "state": "Gujarat",
            "city": "Ahmedabad",
            "pincode": "380001",
            "department": "Orthopedics",
            "workingHourStart": "10:00",
            "workingHourEnd": "18:00",
            "qualification": [
                "MBBS",
                "MS"
            ],
            "experience": "12 years",
            "currentHospitalWorkingName": "CIMS Hospital",
            "registrationNumber": "DOC555000",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "BJ Medical College",
                "GCS Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.990Z",
            "updatedAt": "2023-08-05T20:21:43.990Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4db",
            "firstName": "Dr. Sameer",
            "lastName": "Patil",
            "email": "sameer.patil@example.com",
            "phoneNumber": "9876543228",
            "bloodGroup": "B+",
            "dateOfBirth": "1980-04-13T00:00:00.000Z",
            "gender": "Male",
            "state": "Chhattisgarh",
            "city": "Raipur",
            "pincode": "492001",
            "department": "Urology",
            "workingHourStart": "09:30",
            "workingHourEnd": "17:30",
            "qualification": [
                "MBBS",
                "MCh"
            ],
            "experience": "11 years",
            "currentHospitalWorkingName": "Ramkrishna Care Hospital",
            "registrationNumber": "DOC111111",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Pt. JNM Medical College",
                "Chhattisgarh Institute of Medical Sciences"
            ],
            "createdAt": "2023-08-05T20:21:43.857Z",
            "updatedAt": "2023-08-05T20:21:43.857Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4d4",
            "firstName": "Dr. Anil",
            "lastName": "Kumar",
            "email": "anil.kumar@example.com",
            "phoneNumber": "9876543226",
            "bloodGroup": "O-",
            "dateOfBirth": "1976-11-30T00:00:00.000Z",
            "gender": "Male",
            "state": "Odisha",
            "city": "Bhubaneswar",
            "pincode": "751001",
            "department": "Pulmonology",
            "workingHourStart": "10:00",
            "workingHourEnd": "18:00",
            "qualification": [
                "MBBS",
                "MD"
            ],
            "experience": "15 years",
            "currentHospitalWorkingName": "AIIMS Bhubaneswar",
            "registrationNumber": "DOC676767",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "SCB Medical College",
                "VSS Medical College & Hospital"
            ],
            "createdAt": "2023-08-05T20:21:43.679Z",
            "updatedAt": "2023-08-05T20:21:43.679Z",
            "__v": 0
        },
        {
            "_id": "64ceaf57086173b4dac1f4d9",
            "firstName": "Dr. Rajesh",
            "lastName": "Verma",
            "email": "rajesh.verma@example.com",
            "phoneNumber": "9876543210",
            "bloodGroup": "A+",
            "dateOfBirth": "1985-05-20T00:00:00.000Z",
            "gender": "Male",
            "state": "Delhi (National Capital Territory of Delhi)",
            "city": "New Delhi",
            "pincode": "110001",
            "department": "Cardiology",
            "workingHourStart": "09:00",
            "workingHourEnd": "17:00",
            "qualification": [
                "MBBS",
                "MD"
            ],
            "experience": "10 years",
            "currentHospitalWorkingName": "Apollo Hospital",
            "registrationNumber": "DOC123456",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "AIIMS Delhi",
                "Maulana Azad Medical College"
            ],
            "createdAt": "2023-08-05T20:21:43.856Z",
            "updatedAt": "2023-08-05T20:21:43.856Z",
            "__v": 0
        },
        {
            "_id": "64ceaf58086173b4dac1f4e3",
            "firstName": "Dr. Sangeeta",
            "lastName": "Joshi",
            "email": "sangeeta.joshi@example.com",
            "phoneNumber": "9876543227",
            "bloodGroup": "AB-",
            "dateOfBirth": "1978-09-16T00:00:00.000Z",
            "gender": "Female",
            "state": "Jharkhand",
            "city": "Ranchi",
            "pincode": "834001",
            "department": "Hematology",
            "workingHourStart": "09:00",
            "workingHourEnd": "17:00",
            "qualification": [
                "MBBS",
                "DM"
            ],
            "experience": "16 years",
            "currentHospitalWorkingName": "RIMS Ranchi",
            "registrationNumber": "DOC787878",
            "timeSlotsBooked": [],
            "avgRating": 0,
            "gradCollegeName": [
                "Rajendra Institute of Medical Sciences",
                "Patliputra Medical College"
            ],
            "createdAt": "2023-08-05T20:21:44.150Z",
            "updatedAt": "2023-08-05T20:21:44.150Z",
            "__v": 0
        }
    ]
}"""
    val json= Json{ignoreUnknownKeys=true;}
    val AppointmentData=json.decodeFromString<List<appointmentResponse.Appointment>>(data)
    val DoctorData=json.decodeFromString<doctorClass>(doctorJson)
    allAppointmentsScreen(appointmentData = AppointmentData, doctorClass = DoctorData)
    Log.d(TAG,DoctorData.toString())
}


