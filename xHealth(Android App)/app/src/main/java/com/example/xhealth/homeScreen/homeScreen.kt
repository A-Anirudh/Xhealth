package com.example.xhealth.homeScreen


import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.Image
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.sharp.AccountCircle
import androidx.compose.material.icons.sharp.DoubleArrow
import androidx.compose.material.icons.sharp.Event
import androidx.compose.material.icons.sharp.Expand
import androidx.compose.material.icons.sharp.ExpandMore
import androidx.compose.material.icons.sharp.Home
import androidx.compose.material.icons.sharp.PendingActions
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.xhealth.R
import com.example.xhealth.homePage.homeRecordPreview
import com.example.xhealth.navigatedHomeScreens.AllAppointmentScreenPreview
import com.example.xhealth.navigatedHomeScreens.displayHealthRecords
import com.example.xhealth.navigatedHomeScreens.medRemainderPreview
import com.example.xhealth.profileScreen.ProfileScreenPreview
import com.example.xhealth.utils.LoadingScreen
import com.example.xhealth.viewModels.appointmentViewModel
import com.example.xhealth.viewModels.dataViewModel
import com.example.xhealth.viewModels.doctorViewModel
import com.example.xhealth.viewModels.healthRecordViewModel
import com.example.xhealth.viewModels.profileDetailsViewModel
import kotlinx.coroutines.delay


data class screens(
    var remainders: String ="remainders",
    var appointment:String="appointment",
    var other:String="other"
)


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    navController: NavHostController =rememberNavController(),
    dataViewModel: dataViewModel
) {
    var topAppBar by rememberSaveable { mutableStateOf(true) }
    var bottomAppBar by rememberSaveable { mutableStateOf(true) }
    val doctorModel : doctorViewModel= doctorViewModel()
    val profileDetail:profileDetailsViewModel= profileDetailsViewModel(dataViewModel)
    val healthRecordViewModel:healthRecordViewModel=healthRecordViewModel(dataViewModel)
    val appointmentViewModel:appointmentViewModel= appointmentViewModel(dataViewModel)
    Scaffold(
        topBar = {
            AnimatedVisibility(
                visible = topAppBar
            ) {
                TopAppBar(
                    title = {
                        Image(
                            painter = painterResource(if (isSystemInDarkTheme()) R.drawable.darkxhealthlogo else R.drawable.xhealthlogo),
                            contentDescription = "logo",
                            modifier = Modifier
                                .size(140.dp)
                                .padding(0.dp)
                                .offset((-5).dp)
                        )
                    },
                    actions = {
                        IconButton(onClick = {
                            navController.navigate("profile"){
                                popUpTo(route = "profile")
                                restoreState=true
                            }

                        }) {
                            Icon(
                                Icons.Sharp.AccountCircle,
                                contentDescription = "account",
                                modifier = Modifier.size(340.dp)
                            )
                        }
                    },
                    modifier = Modifier.padding(0.dp)
                )
            }

        },
        bottomBar = {
            BottomAppBar(
                modifier = Modifier.height(60.dp),
                tonalElevation = 11.dp
            ) {
                Row(
                    horizontalArrangement = Arrangement.SpaceAround,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxSize()
                ) {
                    IconButton(onClick = { navController.navigate("home"){
                        popUpTo(route = "home")
                        restoreState=true
                    } }) {
                        Icon(
                            Icons.Sharp.Home, contentDescription = null, modifier = Modifier
                                .fillMaxSize(0.8f)
                                .padding(1.dp)
                        )
                    }
                    IconButton(onClick = { navController.navigate("remainder") {
                        popUpTo(route = "remainder")
                        restoreState=true
                    } }) {
                        Icon(
                            Icons.Sharp.PendingActions,
                            contentDescription = "home",
                            modifier = Modifier
                                .fillMaxSize(0.8f)
                                .padding(1.dp)
                        )
                    }
                    IconButton(onClick = { navController.navigate("appointment"){
                        popUpTo(route = "appointment")
                        restoreState=true
                    }  }) {
                        Icon(
                            Icons.Sharp.Event, contentDescription = null, modifier = Modifier
                                .fillMaxSize(0.8f)
                                .padding(1.dp)
                        )
                    }
                    IconButton(onClick = { navController.navigate("extendedHealthRecord"){
                        popUpTo(route = "extendedHealthRecord")
                        restoreState=true;
                    } }) {
                        Icon(
                            Icons.Sharp.Expand, contentDescription = null, modifier = Modifier
                                .fillMaxSize(0.8f)
                                .padding(1.dp)
                        )
                    }
                }
            }
        },
        modifier = Modifier.padding(0.dp)
    ) {
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(it),
        ) {
            composable(route="home"){
                if(healthRecordViewModel.dataReady){
                    homeRecordPreview(dataViewModel,healthRecordViewModel)
                }else{
                    loading(dataName = "Health Record")
                }
                if(!topAppBar)topAppBar=!topAppBar;
            }
            composable(route = "remainder") {
                if(healthRecordViewModel.dataReady){
                    medRemainderPreview(healthRecordViewModel)
                }else{
                    loading(dataName = "medicines")
                }
                if(!topAppBar)topAppBar=!topAppBar;
            }
            composable(route = "appointment") {
                if(appointmentViewModel.dataReady&&doctorModel.dataReady){
                    AllAppointmentScreenPreview(appointmentViewModel,doctorModel)
                }else{
                    loading(dataName = "Appointments")
                }
                if(!topAppBar)topAppBar=!topAppBar;
            }

            composable(route = "profile") {

                topAppBar=false;
                bottomAppBar=false;
                ProfileScreenPreview(profileDetail)
            }
            composable(route = "extendedHealthRecord") {
                if(healthRecordViewModel.dataReady){
                    displayHealthRecords(dataViewModel,healthRecordViewModel,doctorModel)
                }else{
                    loading(dataName = "Health Record And Doctor Data")
                }
                if(!topAppBar)topAppBar=!topAppBar;
            }


        }
    }
}
@Composable
fun loading(dataName:String){
    Column(modifier=Modifier.fillMaxSize(),Arrangement.Center,Alignment.CenterHorizontally) {
        Surface(modifier = Modifier.fillMaxSize(0.5f)) {
            LoadingScreen()
        }
        Text(text="Please wait while we load your $dataName")
    }
}
