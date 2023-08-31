package com.example.xhealth.navigatedHomeScreens

import android.content.ContentValues.TAG
import android.graphics.drawable.shapes.Shape
import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.AbsoluteCutCornerShape
import androidx.compose.foundation.shape.AbsoluteRoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardColors
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CardElevation
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.xhealth.homePage.convertTo12Hour
import com.example.xhealth.network.healthRecordNew
import kotlinx.serialization.json.Json
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.Date
import java.util.Formatter


@Composable
fun medReminderScreen(history: List<healthRecordNew.History>) {

    val sortedMedication:MutableList<healthRecordNew.History.Medications.AllMed> = mutableListOf();
    val formatter = SimpleDateFormat("yyyy-MM-dd")
    for(i in history){
        val end=formatter.parse(i.medications.endDate);
        val tt=formatter.format(Date())
        Log.d(TAG,tt)
        val today=formatter.parse(tt);

        if(end.after(today)) {
            sortedMedication.addAll(i.medications.allMeds)
        }
    }
    sortedMedication.sortWith(
        Comparator { t, t2 -> (
                t.timings[0].toInt()-t2.timings[0].toInt()
                ) })
    Surface() {
        Card(
            shape = CardDefaults.outlinedShape,
            elevation = CardDefaults.elevatedCardElevation(defaultElevation = 4.dp, pressedElevation = 2.dp),
            colors = CardDefaults.outlinedCardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer,
                contentColor = MaterialTheme.colorScheme.onPrimaryContainer
            ),
            modifier = Modifier
                .padding(5.dp)
                .fillMaxWidth()
                .wrapContentHeight(),

            ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth(1f)
            ) {
                Row(
                    modifier = Modifier
                        .padding(6.dp)
                        .fillMaxWidth(),
                    horizontalArrangement = Arrangement.Start
                ) {
                    Text(text = "All Upcoming Medications", fontSize = 25.sp)
                }
                Divider(Modifier.fillMaxWidth(0.9f))
                LazyColumn(
                    horizontalAlignment = Alignment.CenterHorizontally
                ){
                    items(sortedMedication){
                        Card(
                            colors = CardDefaults.outlinedCardColors(
                                containerColor  = MaterialTheme.colorScheme.primaryContainer
                            ),
                            modifier = Modifier.padding(5.dp),
                        ) {
                            Row(
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(horizontal = 8.dp, vertical = 7.dp)
                            ) {
                                Text(text = it.name, fontSize = 20.sp)
                                Text(text = it.dosage.toString()+"mg")
                            }
                            val timingString= it.timings.joinToString(" , ") {
                                convertTo12Hour(it.toInt())
                            }
                            Text(text = "time : $timingString",Modifier.padding(horizontal = 8.dp).padding(top = 3.dp, bottom = 5.dp))
                        }

                        Divider(Modifier.fillMaxWidth(0.9f),color=MaterialTheme.colorScheme.tertiary)


                    }
                }
            }
        }
    }



}

@Preview(showSystemUi = true, showBackground = true)
@Composable
fun medRemainderPreview(){
    val json="""[{
        "_id": "fdf",
    "doctorId": "Dr. A. Kumar",
    "appointmentId": "60d21b5a6f434e3d8c1f4e6d",
    "diagnoses": {
        "data": "Patient has been diagnosed with Type 2 Diabetes and Hypertension.",
        "problems": ["Type 2 Diabetes", "Hypertension"]
    },
    "medications": {
        "startDate": "2023-07-20",
        "endDate": "2023-09-16",
        "allMeds": [
            {
                "name": "Metformin",
                "dosage": 500,
                "perDay": 2,
                "gap": 0,
                "timings": ["07","12", "16"],
                "_id": "string"
            },
            {
                "name": "Lisinopril",
                "dosage": 10,
                "perDay": 1,
                "gap": 0,
                "timings": ["14","15","22"],
                "_id": "string"
            }
        ]
    },
    "immunizations": [
        {
            "name": "Influenza",
            "dosage": 5,
                "_id": "string"
        }
    ],
    "scans": [
        {
            "name":"Chest X-Ray",
            "pdfLink":"https://www.example.com/chest-xray.pdf",
            "typeOf":"X-Ray",
                "_id": "string"
        }
    ],
    "time": "dfs"
},{
    "_id": "abc",
    "doctorId": "Dr. B. Singh",
    "appointmentId": "60d21b5a6f434e3d8c1f4e6e",
    "diagnoses": {
        "data": "Patient has been diagnosed with Asthma and Allergies.",
        "problems": ["Asthma", "Allergies"]
    },
    "medications": {
        "startDate": "2023-08-01",
        "endDate": "2023-10-01",
        "allMeds": [
            {
                "name": "Albuterol",
                "dosage": 90,
                "perDay": 2,
                "gap": 0,
                "timings": ["08", "15","21"],
                "_id": "string"
            },
            {
                "name": "Cetirizine",
                "dosage": 10,
                "perDay": 1,
                "gap": 0,
                "timings": ["01","15","20"],
                
                "_id": "string"
            }
        ]
    },
    "immunizations": [
        {
            "name": "Tdap",
            "dosage": 1,
            
                "_id": "string"
        }
    ],
    "scans": [
        {
            "name":"Lung CT Scan",
            "pdfLink":"https://www.example.com/lung-ct-scan.pdf",
            "typeOf":"CT Scan",
            
                "_id": "string"
        }
    ],
    "time": "fdsffds"
}]
"""


    val history= Json{ignoreUnknownKeys=true}.decodeFromString<List<healthRecordNew.History>>(json)
    medReminderScreen(history = history)
}