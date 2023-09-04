package com.example.xhealth.navigatedHomeScreens

import android.app.Application
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat.startActivity
import com.example.xhealth.MainActivity
import com.example.xhealth.homePage.convertTo12Hour
import com.example.xhealth.network.AndroidDownloder
import com.example.xhealth.network.doctorClass
import com.example.xhealth.network.healthRecordNew
import com.example.xhealth.theme.DynamicTheme
import com.example.xhealth.viewModels.dataViewModel
import com.example.xhealth.viewModels.doctorViewModel
import com.example.xhealth.viewModels.healthRecordViewModel
import kotlinx.serialization.json.Json


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ExtendedHealthRecord (history: healthRecordNew.History,doctorClass: doctorClass,downloder: AndroidDownloder,email:String,password:String){

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
                                Divider(modifier = Modifier
                                    .padding(horizontal = 17.dp)
                                    .fillMaxWidth())
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
                        Divider(modifier = Modifier
                            .padding(horizontal = 18.dp)
                            .fillMaxWidth()
                            .height(2.dp))
                    }
                    Text(text = "All related PDFs : ", fontSize = 18.sp)
                    LazyRow(
                        modifier = Modifier.padding(vertical = 2.dp)
                    ) {
                        items(history.scans) {
                            AssistChip(
                                onClick = {
                                          downloder.downloadFile("https://xhealth-git-jagnathreddy9-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/users/healthRecords/android/key/"+it.name, name = it.name, email = email,password=password)
                                },
                                label = { Text(text = it.name) },
                                modifier = Modifier
                                    .height(30.dp)
                                    .padding(horizontal = 2.dp),
                                shape = MaterialTheme.shapes.extraSmall,
                            )
                        }
                    }


                }
            }

        }

    }


}

@Composable
fun displayHealthRecords(
    dataViewModel: dataViewModel,
    healthRecordViewModel: healthRecordViewModel,
    doctorViewModel: doctorViewModel
){
    val downloder= AndroidDownloder(LocalContext.current)
    LazyColumn {
        healthRecordViewModel.data?.let { it ->
            items(it.history){record->
                doctorViewModel.allDoctors?.let { it1 ->
                    ExtendedHealthRecord(record,
                        it1,downloder,dataViewModel.email,dataViewModel.password)
                }
            }
        }
    }


}
