package com.example.xhealth.homeScreen

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.Image
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.sharp.AccountCircle
import androidx.compose.material.icons.sharp.Event
import androidx.compose.material.icons.sharp.Home
import androidx.compose.material.icons.sharp.List
import androidx.compose.material.icons.sharp.PendingActions
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
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
import com.example.xhealth.navigatedHomeScreens.allAppointmentsScreen
//import com.example.xhealth.homePage.home
import com.example.xhealth.navigatedHomeScreens.medRemainderPreview
//import com.example.xhealth.navigatedHomeScreens.medReminderScreen
import com.example.xhealth.profileScreen.ProfileScreenPreview

import com.example.xhealth.viewModels.dataViewModel
import com.example.xhealth.viewModels.doctorViewModel
import com.example.xhealth.viewModels.healthRecordViewModel


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
    val healthRecordViewModel:healthRecordViewModel=healthRecordViewModel(dataViewModel)
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
                                navController.navigate("profile")
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
                        IconButton(onClick = { navController.navigate("home")}) {
                            Icon(
                                Icons.Sharp.Home, contentDescription = null, modifier = Modifier
                                    .fillMaxSize(0.8f)
                                    .padding(1.dp)
                            )
                        }
                        IconButton(onClick = { navController.navigate("remainder") }) {
                            Icon(
                                Icons.Sharp.PendingActions,
                                contentDescription = "home",
                                modifier = Modifier
                                    .fillMaxSize(0.8f)
                                    .padding(1.dp)
                            )
                        }
                        IconButton(onClick = { navController.navigate("appointment") }) {
                            Icon(
                                Icons.Sharp.Event, contentDescription = null, modifier = Modifier
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
                startDestination = "remainder",
                modifier = Modifier.padding(it),
            ) {
                composable(route="home"){
                    homeRecordPreview(dataViewModel,healthRecordViewModel)
                    if(!topAppBar)topAppBar=!topAppBar;
                }
                composable(route = "remainder") {
                    medRemainderPreview()
                    if(!topAppBar)topAppBar=!topAppBar;
                }
                composable(route = "appointment") {
                    AllAppointmentScreenPreview()
                    if(!topAppBar)topAppBar=!topAppBar;
                }

                composable(route = "profile") {

                    topAppBar=false;
                    bottomAppBar=false;
                    ProfileScreenPreview()
                }

            }
        }
    }
