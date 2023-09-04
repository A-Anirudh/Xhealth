package com.example.xhealth.navigatedHomeScreens

import android.content.ContentValues
import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.xhealth.homePage.convertTo12Hour
import com.example.xhealth.network.doctorClass
import com.example.xhealth.network.healthRecordNew
import com.example.xhealth.theme.DynamicTheme
import com.example.xhealth.utils.ProgressArc
import kotlinx.serialization.json.Json
import java.text.SimpleDateFormat
import java.util.Date

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ExtendedHealthRecord (history: healthRecordNew.History,doctorClass: doctorClass){

    val doc=doctorClass.allDoc.find { it->it.id==history.doctorId }
    Card(
        modifier = Modifier
            .padding(5.dp)
            .fillMaxWidth()
            .heightIn(min = 150.dp)
            .wrapContentHeight(),
        colors = CardDefaults.outlinedCardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer
        ),
    ){
        Row(
            modifier=Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ){
            if (doc != null) {
                Text(text = doc.firstName+" "+doc.lastName, fontFamily = FontFamily.Monospace ,modifier=Modifier.padding(horizontal = 10.dp, vertical = 5.dp), fontSize = 20.sp)
            }
            Text(text=history.time.split("T")[0],modifier=Modifier.padding(horizontal=5.dp))

        }
        Divider(
            Modifier
                .padding(horizontal = 10.dp)
                .fillMaxWidth(1f))
        Row(
            modifier= Modifier
                .wrapContentHeight()
                .padding(horizontal = 5.dp)
        ) {

            Column(
                modifier = Modifier.padding(4.dp)
            ) {
                Text(
                    text = history.diagnoses.data, fontSize = 17.sp
                )
                LazyRow(
                    modifier = Modifier.padding(vertical = 2.dp)
                ) {
                    items(history.diagnoses.problems) {
                        AssistChip(
                            onClick = {},
                            label = { Text(text = it) },
                            modifier = Modifier
                                .height(30.dp)
                                .padding(horizontal = 2.dp),
                            shape = MaterialTheme.shapes.extraSmall,
                        )
                    }
                }
                Column(
                    modifier= Modifier.heightIn(max=300.dp)
                ) {
                    Text(text = "Medication : ", fontSize = 18.sp)
                    for( i in 0 until history.medications.allMeds.size){
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Text(text = history.medications.allMeds[i].name+"", fontSize = 18.sp)
                                    Text(text = history.medications.allMeds[i].dosage.toString() + "mgs", fontSize = 15.sp)
                                }
                                Row(){
                                    val timingString= history.medications.allMeds[i].timings.joinToString(" , ") {
                                        convertTo12Hour(it.toInt())
                                    }
                                    Text(text = "time : $timingString",
                                        Modifier
                                            .padding(horizontal = 8.dp)
                                            .padding(top = 3.dp, bottom = 5.dp))
                                }
                                Divider(modifier = Modifier.padding(horizontal=17.dp).fillMaxWidth())
                            }}

                    }

                    Text(text = "Immunizations : ", fontSize = 18.sp)
                    for( i in 0 until history.immunizations.size){
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(text = history.immunizations[i].name+"", fontSize = 18.sp)
                            Text(text = history.immunizations[i].dosage.toString() + "ml", fontSize = 15.sp)
                        }
                        Divider(modifier = Modifier.padding(horizontal=18.dp).fillMaxWidth().height(2.dp))
                    }
                    
                }
            }

        }

    }


}

@Preview
@Composable
fun displayHealthRecords(){
    val data="""{
    "_id": "64ef29d00205f8cc96bf2e82",
    "history": [
        {
            "diagnoses": {
                "data": "fracture due to falling, a plaster would do!",
                "problems": [
                    "fracture",
                    "less bone density",
                    "lacking calcium"
                ]
            },
            "medications": {
                "startDate": "2023-08-31T00:00:00.000Z",
                "endDate": "2023-09-30T00:00:00.000Z",
                "allMeds": [
                    {
                        "name": "milk",
                        "dosage": 100,
                        "perDay": 2,
                        "gap": 0,
                        "timings": [
                            "9",
                            "16"
                        ],
                        "_id": "64f45650a646534241e3da8e"
                    },
                    {
                        "name": "calcium tablets",
                        "dosage": 20,
                        "perDay": 1,
                        "gap": 0,
                        "timings": [
                            "9"
                        ],
                        "_id": "64f45650a646534241e3da8f"
                    }
                ]
            },
            "doctorId": "64ef2f34d8b04ebe171c1ef0",
            "immunizations": [
                {
                    "name": "painkiller",
                    "dosage": 20,
                    "_id": "64f45650a646534241e3da90"
                }
            ],
            "scans": [
                {
                    "name": "1.pdf",
                    "pdfLink": "http://localhost:8080/api/users/healthRecords/key/1.pdf",
                    "typeOf": "scan",
                    "_id": "64f45650a646534241e3da91"
                }
            ],
            "time": "2023-09-02T20:35:32.488Z",
            "_id": "64f45650a646534241e3da8d"
        },
        {
            "diagnoses": {
                "data": "The patient has been diagnosed with bacterial pneumonia",
                "problems": [
                    "bacterial pneumonia",
                    "Infection",
                    "Weakened Immune System",
                    "Smoking"
                ]
            },
            "medications": {
                "startDate": "2023-09-01T00:00:00.000Z",
                "endDate": "2023-10-18T00:00:00.000Z",
                "allMeds": [
                    {
                        "name": "Amoxicillin",
                        "dosage": 500,
                        "perDay": 3,
                        "gap": 0,
                        "timings": [
                            "8",
                            "14",
                            "19"
                        ],
                        "_id": "64f45b2ea646534241e3dabb"
                    },
                    {
                        "name": "Azithromycin",
                        "dosage": 500,
                        "perDay": 1,
                        "gap": 0,
                        "timings": [
                            "9"
                        ],
                        "_id": "64f45b2ea646534241e3dabc"
                    },
                    {
                        "name": "Doxycycline",
                        "dosage": 100,
                        "perDay": 2,
                        "gap": 0,
                        "timings": [
                            "9",
                            "18"
                        ],
                        "_id": "64f45b2ea646534241e3dabd"
                    }
                ]
            },
            "doctorId": "64ef2f34d8b04ebe171c1ef0",
            "immunizations": [],
            "scans": [
                {
                    "name": "2.pdf",
                    "pdfLink": "http://localhost:8080/api/users/healthRecords/key/2.pdf",
                    "typeOf": "prescription",
                    "_id": "64f45b2ea646534241e3dabe"
                }
            ],
            "time": "2023-09-03T09:50:54.166Z",
            "_id": "64f45b2ea646534241e3daba"
        },
        {
            "diagnoses": {
                "data": "migraine",
                "problems": [
                    "mild migraine, and anxiety"
                ]
            },
            "medications": {
                "startDate": "2023-11-01T00:00:00.000Z",
                "endDate": "2023-12-01T00:00:00.000Z",
                "allMeds": [
                    {
                        "name": "Vasograin Tablet",
                        "dosage": 2,
                        "perDay": 2,
                        "gap": 0,
                        "timings": [
                            "12",
                            "16"
                        ],
                        "_id": "64f45e516d6391b971412432"
                    }
                ]
            },
            "doctorId": "64ef2f34d8b04ebe171c1ef0",
            "immunizations": [],
            "scans": [
                {
                    "name": "ff.pdf",
                    "pdfLink": "http://localhost:8080/api/users/healthRecords/key/ff.pdf",
                    "typeOf": "MRI",
                    "_id": "64f45e516d6391b971412433"
                }
            ],
            "time": "2023-09-03T10:15:13.178Z",
            "_id": "64f45e516d6391b971412431"
        }
    ],
    "email": "aayanamanirudh@gmail.com",
    "__v": 12
}"""
    val docData="""{
    "allDoc": [
        {
            "_id": "64ef25930205f8cc96bf2d99",
            "firstName": "Shreyas",
            "lastName": "P",
            "email": "shreyas@gmail.com",
            "phoneNumber": "7259066183",
            "bloodGroup": "A-",
            "dateOfBirth": "2002-03-11T18:30:00.000Z",
            "gender": "Male",
            "state": "Karnataka",
            "city": "Bengaluru",
            "pincode": "600001",
            "department": "Cardiology",
            "workingHourStart": "9:00",
            "workingHourEnd": "22:00",
            "qualification": [
                "[1,2,3,4]"
            ],
            "experience": "3 years",
            "currentHospitalWorkingName": "Manipal Hospitals",
            "registrationNumber": "17AB9K",
            "timeSlotsBooked": [],
            "avgRating": 1,
            "gradCollegeName": [
                "MSRMC"
            ],
            "createdAt": "2023-08-30T11:18:43.059Z",
            "updatedAt": "2023-09-03T15:13:26.467Z",
            "__v": 17
        },
        {
            "_id": "64ef2f34d8b04ebe171c1eed",
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
            "timeSlotsBooked": [],
            "avgRating": 1,
            "gradCollegeName": [
                "Grant Medical College",
                "KEM Hospital"
            ],
            "createdAt": "2023-08-30T11:59:48.244Z",
            "updatedAt": "2023-09-03T15:13:26.559Z",
            "__v": 5
        },
        {
            "_id": "64ef2f34d8b04ebe171c1ef0",
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
            "timeSlotsBooked": [],
            "avgRating": 1,
            "gradCollegeName": [
                "King George's Medical University",
                "GSVM Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.314Z",
            "updatedAt": "2023-09-03T15:13:26.619Z",
            "__v": 9
        },
        {
            "_id": "64ef2f34d8b04ebe171c1ef2",
            "firstName": "Dr. Arjun",
            "lastName": "Gupta",
            "email": "arjun.gupta@example.com",
            "phoneNumber": "9876543214",
            "bloodGroup": "B-",
            "dateOfBirth": "1982-11-29T18:30:00.000Z",
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
            "timeSlotsBooked": [],
            "avgRating": 1,
            "gradCollegeName": [
                "St. John's Medical College",
                "Mysore Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.381Z",
            "updatedAt": "2023-09-03T15:13:26.680Z",
            "__v": 10
        },
        {
            "_id": "64ef2f34d8b04ebe171c1ef4",
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
            "timeSlotsBooked": [
                "Mon Sep 04 2023 11:09:00 GMT+0530 (India Standard Time)"
            ],
            "avgRating": 1,
            "gradCollegeName": [
                "Government Medical College and Hospital, Chandigarh",
                "Dayanand Medical College and Hospital"
            ],
            "createdAt": "2023-08-30T11:59:48.383Z",
            "updatedAt": "2023-09-03T15:49:08.254Z",
            "__v": 4
        },
        {
            "_id": "64ef2f34d8b04ebe171c1ef9",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Dr. R. Ahmed Dental College & Hospital",
                "Guru Nanak Institute of Dental Sciences & Research"
            ],
            "createdAt": "2023-08-30T11:59:48.569Z",
            "updatedAt": "2023-08-30T11:59:48.569Z",
            "__v": 0
        },
        {
            "_id": "64ef2f34d8b04ebe171c1ef5",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Government Medical College, Kottayam",
                "Trivandrum Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.384Z",
            "updatedAt": "2023-08-30T11:59:48.384Z",
            "__v": 0
        },
        {
            "_id": "64ef2f34d8b04ebe171c1ef7",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Madras Medical College",
                "Stanley Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.566Z",
            "updatedAt": "2023-09-03T04:39:01.519Z",
            "__v": 2
        },
        {
            "_id": "64ef2f34d8b04ebe171c1ef8",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Pt. B.D. Sharma Post Graduate Institute of Medical Sciences",
                "PGIMS, Rohtak"
            ],
            "createdAt": "2023-08-30T11:59:48.568Z",
            "updatedAt": "2023-09-03T15:13:26.978Z",
            "__v": 7
        },
        {
            "_id": "64ef2f34d8b04ebe171c1efd",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Patna Medical College",
                "Darbhanga Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.747Z",
            "updatedAt": "2023-09-03T15:13:27.037Z",
            "__v": 2
        },
        {
            "_id": "64ef2f34d8b04ebe171c1efe",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Osmania Medical College",
                "Gandhi Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.748Z",
            "updatedAt": "2023-08-30T11:59:48.748Z",
            "__v": 0
        },
        {
            "_id": "64ef2f34d8b04ebe171c1f03",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Gandhi Medical College, Bhopal",
                "People's College of Medical Sciences & Research Centre"
            ],
            "createdAt": "2023-08-30T11:59:48.928Z",
            "updatedAt": "2023-08-30T11:59:48.928Z",
            "__v": 0
        },
        {
            "_id": "64ef2f34d8b04ebe171c1eff",
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
            "avgRating": 1,
            "gradCollegeName": [
                "SMS Medical College",
                "Jawaharlal Nehru Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.749Z",
            "updatedAt": "2023-09-03T07:39:03.865Z",
            "__v": 2
        },
        {
            "_id": "64ef2f34d8b04ebe171c1f04",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Institute of Medical Sciences, BHU",
                "Doon Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.929Z",
            "updatedAt": "2023-08-30T11:59:48.929Z",
            "__v": 0
        },
        {
            "_id": "64ef2f34d8b04ebe171c1f05",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Gauhati Medical College",
                "Silchar Medical College"
            ],
            "createdAt": "2023-08-30T11:59:48.930Z",
            "updatedAt": "2023-08-30T11:59:48.930Z",
            "__v": 0
        },
        {
            "_id": "64ef2f35d8b04ebe171c1f0a",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Rajendra Institute of Medical Sciences",
                "Patliputra Medical College"
            ],
            "createdAt": "2023-08-30T11:59:49.106Z",
            "updatedAt": "2023-09-02T15:15:21.869Z",
            "__v": 2
        },
        {
            "_id": "64ef2f35d8b04ebe171c1f0b",
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
            "avgRating": 1,
            "gradCollegeName": [
                "Pt. JNM Medical College",
                "Chhattisgarh Institute of Medical Sciences"
            ],
            "createdAt": "2023-08-30T11:59:49.107Z",
            "updatedAt": "2023-08-30T11:59:49.107Z",
            "__v": 0
        },
        {
            "_id": "64ef2f35d8b04ebe171c1f0f",
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
            "avgRating": 1,
            "gradCollegeName": [
                "BJ Medical College",
                "GCS Medical College"
            ],
            "createdAt": "2023-08-30T11:59:49.279Z",
            "updatedAt": "2023-08-30T11:59:49.279Z",
            "__v": 0
        },
        {
            "_id": "64ef2f35d8b04ebe171c1f09",
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
            "avgRating": 1,
            "gradCollegeName": [
                "AIIMS Delhi",
                "Maulana Azad Medical College"
            ],
            "createdAt": "2023-08-30T11:59:49.104Z",
            "updatedAt": "2023-08-30T11:59:49.104Z",
            "__v": 0
        },
        {
            "_id": "64ef2f35d8b04ebe171c1f14",
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
            "avgRating": 1,
            "gradCollegeName": [
                "SCB Medical College",
                "VSS Medical College & Hospital"
            ],
            "createdAt": "2023-08-30T11:59:49.435Z",
            "updatedAt": "2023-08-30T11:59:49.435Z",
            "__v": 0
        },
        {
            "_id": "64f40d23ae46d65d38b97f76",
            "firstName": "Saksham",
            "lastName": "S",
            "email": "saksham.8484@gmail.com",
            "phoneNumber": "7206209844",
            "bloodGroup": "O+",
            "dateOfBirth": "2002-07-27T00:00:00.000Z",
            "gender": "Male",
            "state": "Haryana",
            "city": "Sonipat",
            "pincode": "131001",
            "department": "Pshychology",
            "workingHourStart": "10:00",
            "workingHourEnd": "12:00",
            "qualification": [
                "Ph. D. Psychology"
            ],
            "experience": "5",
            "currentHospitalWorkingName": "AIIMS",
            "registrationNumber": "AJHF242",
            "timeSlotsBooked": [],
            "avgRating": 1,
            "gradCollegeName": [
                "AIIMS"
            ],
            "createdAt": "2023-09-03T04:35:47.599Z",
            "updatedAt": "2023-09-03T15:13:27.681Z",
            "__v": 4
        }
    ]
}"""
    val json= Json {ignoreUnknownKeys=true}
    val kotlinClass:healthRecordNew=json.decodeFromString(data);
    val kotlinDocClass:doctorClass=json.decodeFromString(docData)
    DynamicTheme() {
        Column {
            ExtendedHealthRecord(kotlinClass.history[0],kotlinDocClass)
        }
    }
}