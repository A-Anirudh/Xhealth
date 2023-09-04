package com.example.xhealth.homeScreen

import android.content.ContentValues.TAG
import android.media.Image
import android.util.Log
import androidx.compose.animation.graphics.ExperimentalAnimationGraphicsApi
import androidx.compose.animation.graphics.res.animatedVectorResource
import androidx.compose.animation.graphics.res.rememberAnimatedVectorPainter
import androidx.compose.animation.graphics.vector.AnimatedImageVector
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role.Companion.Image
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.xhealth.R
import com.example.xhealth.loginPage.LogInScreen
import com.example.xhealth.viewModels.dataViewModel
import kotlinx.coroutines.delay


@OptIn(ExperimentalAnimationGraphicsApi::class)
@Composable
fun startScreen(
    model: dataViewModel
) {
    val shouldNavigate = remember { mutableStateOf(false) }
    if(!shouldNavigate.value){
        animated()
    }else{
        LogInScreen(viewModel = model)
    }
    LaunchedEffect(shouldNavigate.value) {
        delay(2000) // 2 seconds delay
        shouldNavigate.value = true
    }
    


    }

@OptIn(ExperimentalAnimationGraphicsApi::class)
@Composable
fun animated(){
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.fillMaxWidth(0.6f)
    ) {

        val image = AnimatedImageVector.animatedVectorResource(R.drawable.avd_anim)
        var atEnd by remember { mutableStateOf(false) }
        Image(
            painter = rememberAnimatedVectorPainter(image, atEnd),
            contentDescription = "Timer",
            modifier = Modifier
                .fillMaxWidth(0.6f),
            contentScale = ContentScale.Crop
        )
        atEnd=true;

    }
}