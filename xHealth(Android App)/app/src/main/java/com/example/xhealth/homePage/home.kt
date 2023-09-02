package com.example.xhealth.homePage

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.content.res.Resources.Theme
import android.util.Log
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.CardColors
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.currentCompositionLocalContext
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.modifier.modifierLocalConsumer
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.compose.md_theme_dark_primaryContainer
import com.example.compose.md_theme_dark_surface
import com.example.xhealth.alarm.setAlarm
import com.example.xhealth.network.healthRecordNew
//import com.example.xhealth.network.healthRecordRes
import com.example.xhealth.theme.DynamicTheme
import com.example.xhealth.utils.ProgressArc
import com.example.xhealth.viewModels.dataViewModel
import com.example.xhealth.viewModels.healthRecordViewModel
import com.google.api.ResourceDescriptor.History
import kotlinx.serialization.json.Json
import org.intellij.lang.annotations.JdkConstants.HorizontalAlignment
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter
import java.util.Calendar
import java.util.Date


@Composable
fun UpComingRemainders(
    medications:List<healthRecordNew.History.Medications>
    ) {
    val time = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
    Log.d(TAG,time.toString())
    var sortedMedication: MutableList<healthRecordNew.History.Medications.AllMed> = mutableListOf()
    val currentTime = LocalTime.now()


    for (i in medications) {
        for (j in i.allMeds) {
            j.timings = j.timings.sortedBy{
                if(time<it.toInt()) it.toInt()-time else 24+it.toInt()-time
            }

            sortedMedication.add(j)
        }
    }

    sortedMedication.sortBy {
        if(time<it.timings[0].toInt()) it.timings[0].toInt()-time else 24+it.timings[0].toInt()-time
    }

    Surface() {
        Card(
            shape = CardDefaults.shape,
            elevation = CardDefaults.elevatedCardElevation(
                defaultElevation = 4.dp,
                pressedElevation = 2.dp
            ),
            colors = CardDefaults.outlinedCardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            ),
            modifier = Modifier
                .padding(5.dp)
                .fillMaxWidth()
                .wrapContentHeight(),

            ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .fillMaxWidth(1f)
                    .heightIn(max = 300.dp)
            ) {
                Row(
                    modifier = Modifier
                        .padding(6.dp)
                        .fillMaxWidth(),
                    horizontalArrangement = Arrangement.Start
                ) {
                    Text(text = "Upcoming Remainders", fontSize = 20.sp)
                }
                Divider(Modifier.fillMaxWidth(0.9f))
                LazyColumn(
                    modifier=Modifier.heightIn(max=300.dp)
                ) {
                    items(sortedMedication) {
                        Row(
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(5.dp)
                        ) {
                            Text(text = it.name)
                            Text(text = it.dosage.toString() + "mg")
                            Text(text = convertTo12Hour(it.timings[0].toInt()))
                        }
                    }
                }
            }
        }
    }
}





@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun homeRecord(
    history: healthRecordNew.History
    ) {

    // Assume start and end are date strings in the format "dd-MM-yyyy"
    val formatter = SimpleDateFormat("yyyy-MM-dd")
    val startDate = formatter.parse(history.medications.startDate)
    val endDate = formatter.parse(history.medications.endDate)
    val today= formatter.format(Date())
    formatter.parse(today)
    Log.d(TAG,today)
// Get the difference in milliseconds
    val diff = (endDate?.time ?: 0) - (startDate?.time ?: 0)

    val overDiff = (Date().time ?: 0) - (startDate?.time ?: 0)
// Convert to days

    var overDays=overDiff/(24 * 60 * 60 * 1000)
    val days = diff / (24 * 60 * 60 * 1000)
    overDays= overDays.coerceAtMost(days);
//    val overDays=LocalDateTime.now().minusDays((startDate?.time ?: 0) /24 * 60 * 60 * 1000)
    Log.d(TAG,days.toString());
    Log.d(TAG,(overDays.toFloat()/days.toFloat()).toString())

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
            modifier= Modifier
                .wrapContentHeight()
                .padding(horizontal = 5.dp)
        ) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth(0.3f)
                    .wrapContentHeight()
                    .height(intrinsicSize = IntrinsicSize.Max)
                    .padding(1.dp),
                color = Color.Transparent
            ) {
                ProgressArc(limit = overDays.toFloat()/days.toFloat(), bgColor = MaterialTheme.colorScheme.tertiaryContainer, arcColor = MaterialTheme.colorScheme.primary, modifier = Modifier.padding(10.dp))
                Text(text = "${overDays}/${days}", textAlign = TextAlign.Center , modifier= Modifier
                    .fillMaxSize()
                    .wrapContentHeight())
            }
            Column(
                modifier = Modifier.padding(4.dp)
            ) {
                Text(
                    text = history.diagnoses.data.substring(
                        0,
                        history.diagnoses.data.length.coerceAtMost(50)
                    ) + "..."
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
//                    Divider(modifier = Modifier.padding(1.dp), thickness = 2.dp, color = MaterialTheme.colorScheme.scrim )
                Column(
                    modifier=Modifier.heightIn(max=300.dp)
                ) {
                    Text(text = "Medication : ")
                    for( i in 0 until Math.min(3,history.medications.allMeds.size)){
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(text = history.medications.allMeds[i].name+"")
                            Text(text = history.medications.allMeds[i].dosage.toString() + "mgs")
                        }

                    }
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(text = ".......")
                        Text(text = "....")
                    }
                }
            }

        }
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 7.dp),
        ){
            Text(text = "Doctor : ${history.doctorId}", fontFamily = FontFamily.Monospace)
            Text("15/8/2023")
        }

    }
}




@Composable
fun homeRecordPreview(dataViewModel: dataViewModel,healthRecordViewModel: healthRecordViewModel){
    //use healthrecordviewmodel for data from db
    val json="""[{
        "_id": "fdf",
        "time": "hello",
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
                "_id": "64ef29d00205f8cc96bf2e84"
            },
            {
                "name": "Lisinopril",
                "dosage": 10,
                "perDay": 1,
                "gap": 0,
                "timings": ["14","15","22"],
                        "_id": "64ef29d00205f8cc96bf2e84"
            }
        ]
    },
    "immunizations": [
        {
            "name": "Influenza",
            "dosage": 5,
                        "_id": "64ef29d00205f8cc96bf2e84"
        }
    ],
    "scans": [
        {
            "name":"Chest X-Ray",
            "pdfLink":"https://www.example.com/chest-xray.pdf",
            "typeOf":"X-Ray",
                        "_id": "64ef29d00205f8cc96bf2e84"
        }
    ]
},{
    "_id": "abc",
        "time": "hello",
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
                        "_id": "64ef29d00205f8cc96bf2e84"
            },
            {
                "name": "Cetirizine",
                "dosage": 10,
                "perDay": 1,
                "gap": 0,
                "timings": ["01","15","20"],
                        "_id": "64ef29d00205f8cc96bf2e84"
            }
        ]
    },
    "immunizations": [
        {
            "name": "Tdap",
            "dosage": 1,
                        "_id": "64ef29d00205f8cc96bf2e84"
        }
    ],
    "scans": [
        {
            "name":"Lung CT Scan",
            "pdfLink":"https://www.example.com/lung-ct-scan.pdf",
            "typeOf":"CT Scan",
                        "_id": "64ef29d00205f8cc96bf2e84"
        }
    ]
}
]
"""
    val dataInternet=healthRecordViewModel.data
    val history= Json{ignoreUnknownKeys=true}.decodeFromString<List<healthRecordNew.History>>(json)
    val listOfMeds= mutableListOf<healthRecordNew.History.Medications>();
    for(i in history){
        listOfMeds.add(i.medications);
    }
//    if(!dataViewModel.alarmSet) {
//        setAlarm(listOfMeds, context = LocalContext.current)
//        dataViewModel.setAlarm()
//    }
    Log.d(TAG,history.toString())
    Surface(
        modifier = Modifier.fillMaxSize()
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .heightIn(min = 100.dp, max = 700.dp)
                .verticalScroll(rememberScrollState())
        ) {
            UpComingRemainders(medications = listOfMeds)
            if(dataInternet!=null){
                LazyColumn(
                    modifier=Modifier.heightIn(max=600.dp)
                ){
                    items(dataInternet.history){
                        homeRecord(history = it)
                    }
                }
            }else{
                Text(text = "Oops looks like the internet is weak or you have no health records!")
            }
//            if(dataInternet!=null){
//                homeRecord(history = dataInternet.history[0])
//            }
//            for(i in history){
//                homeRecord(history = i)
//            }
        }
    }
}

fun convertTo12Hour(time:Int):String{
    return if(time<=12){
        "$time AM";
    }else{
        "${time-12} PM"
    }
}