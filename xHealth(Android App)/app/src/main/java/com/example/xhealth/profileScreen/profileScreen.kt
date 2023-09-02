package com.example.xhealth.profileScreen

import android.app.Application
import android.content.ContentValues.TAG
import android.content.res.Configuration
import android.util.Log
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideIn
import androidx.compose.animation.slideOut
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.xhealth.R
import com.example.xhealth.network.profileDetails
import com.example.xhealth.theme.DynamicTheme
import com.example.xhealth.ui.theme.XHealthTheme
import kotlinx.serialization.json.Json
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.requiredHeight
import androidx.compose.material3.Shapes
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import com.example.xhealth.alarm.AndroidAlarmScheduler
import com.example.xhealth.viewModels.profileDetailsViewModel


@Composable
fun ProfileScreen(
    user:profileDetails
){
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(5.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
       Surface(color = MaterialTheme.colorScheme.primaryContainer) {
           Row(
               Modifier
                   .fillMaxWidth()
                   .padding(vertical = 30.dp),
               horizontalArrangement = Arrangement.Center,
               verticalAlignment = Alignment.CenterVertically
           ){
               Image(painterResource(id =R.drawable.profile), contentDescription = null,modifier=Modifier.size(100.dp), colorFilter = ColorFilter.tint(color = MaterialTheme.colorScheme.onSecondaryContainer))
               Spacer(modifier = Modifier.width(10.dp))
               Column(
                   Modifier.padding(10.dp)
               ) {
                   Text(text = user.firstName, fontSize = 45.sp)
                   Text(text = user.lastName,fontSize=35.sp)
               }
           }
       }
        Spacer(modifier = Modifier.height(100.dp))
        Card(
            modifier= Modifier
                .padding(5.dp)
                .fillMaxWidth()
                .wrapContentHeight()
                .padding(5.dp),
            elevation = CardDefaults.elevatedCardElevation(
                defaultElevation = 4.dp
            ),
            shape = CardDefaults.outlinedShape,
            colors = CardDefaults.elevatedCardColors(
                containerColor = MaterialTheme.colorScheme.tertiaryContainer,
                contentColor = MaterialTheme.colorScheme.onTertiaryContainer
            )
        ){
            Text(text = "Personal Information", fontSize = 20.sp, modifier = Modifier.padding(top = 10.dp, start = 10.dp))
            Divider(thickness = 3.dp, modifier = Modifier
                .fillMaxWidth()
                .padding(5.dp))
            Row(
                modifier= Modifier
                    .fillMaxWidth()
                    .wrapContentHeight()
                    .padding(10.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column(
                ) {
                    Text(text ="Date of Birth : ${user.dateOfBirth.split("T")[0]}")
                    Text(text = "Gender : ${user.gender}",Modifier.padding(vertical = 3.dp))
                }
                Column() {
                    Text(text="Blood Group : ${user.bloodGroup}")
                }
            }
        }

        Card(
            modifier= Modifier
                .padding(5.dp)
                .fillMaxWidth()
                .wrapContentHeight()
                .padding(5.dp),
            elevation = CardDefaults.elevatedCardElevation(
                defaultElevation = 4.dp
            ),
            shape = CardDefaults.outlinedShape,
            colors = CardDefaults.elevatedCardColors(
                containerColor = MaterialTheme.colorScheme.tertiaryContainer,
                contentColor = MaterialTheme.colorScheme.onTertiaryContainer
            )

        ){
            Text(text = "Contact Information", fontSize = 20.sp, modifier = Modifier.padding(top = 10.dp, start = 10.dp))
            Divider(thickness = 3.dp, modifier = Modifier
                .fillMaxWidth()
                .padding(5.dp))
            Text(text ="Email : ${user.email}", Modifier.padding(start = 7.dp, bottom = 3.dp))
            Text(text = "Phone : ${user.phoneNumber}",Modifier.padding(start = 7.dp, bottom = 3.dp))

            Row(
                Modifier
                    .fillMaxWidth(0.7f)
                    .padding(start = 7.dp, bottom = 3.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                    Text(text="State : ${user.state}")
                    Text(text = "City : ${user.city}")
            }
            Text(text="Pin code : ${user.pincode}",Modifier.padding(start = 7.dp, bottom = 8.dp))

        }
    }
}

//@Preview(
//    showSystemUi = false, showBackground = true,
//    uiMode = Configuration.UI_MODE_NIGHT_YES or Configuration.UI_MODE_TYPE_NORMAL
//)
@Composable
fun ProfileScreenPreview(
    profileDetailsViewModel: profileDetailsViewModel
){
    profileDetailsViewModel.user?.let { ProfileScreen(user = it) }

}
