package com.example.xhealth.utils

import android.content.res.Resources
import android.media.Image
import android.util.Size
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.VectorConverter
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.animateValue
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.progressSemantics
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ProgressIndicatorDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PaintingStyle.Companion.Stroke
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.compose.md_theme_light_primary
import com.example.xhealth.R
import kotlinx.coroutines.delay

@Preview
@Composable
fun LoadingScreen(){
    Column(verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxSize()) {
        Image(painter = painterResource(id = if(isSystemInDarkTheme())R.drawable.darkxhealthlogo else R.drawable.xhealthlogo) , contentDescription = "loading" , modifier = Modifier.width(180.dp))
        Spacer(modifier = Modifier.height(50.dp))
        RotatingCircle()
    }
}
@Composable
fun RotatingCircle(
    size: Dp = 60.dp, // indicator size
    sweepAngle: Float = 90f, // angle (length) of indicator arc
    color: Color = md_theme_light_primary, // color of indicator arc line
    strokeWidth: Dp = 6.dp // width of circle and arc lines
) {
    // animation
    val transition = rememberInfiniteTransition()
    val currentArcStartAngle by transition.animateValue(
        0,
        360,
        Int.VectorConverter,
        infiniteRepeatable(
            animation = tween(
                durationMillis = 1100,
                easing = LinearEasing
            )
        )
    )

    // define stroke with given width and arc ends type considering device DPI
    val stroke = with(LocalDensity.current) {
        Stroke(width = strokeWidth.toPx(), cap = StrokeCap.Square)
    }

    // draw on canvas
    Canvas(
        Modifier
            .progressSemantics() // (optional) for Accessibility services
            .size(size) // canvas size
            .padding(strokeWidth / 2) // padding. otherwise, not the whole circle will fit in the canvas
    ) {
        // draw "background" (gray) circle with defined stroke.
        drawCircle(Color.LightGray, style = stroke)

        // draw arc with the same stroke
        drawArc(
            color,
            startAngle = currentArcStartAngle.toFloat()-90,
            sweepAngle = sweepAngle,
            useCenter = false,
            style = stroke
        )
    }
}







@Composable
fun ProgressArc(
    modifier: Modifier = Modifier,
    limit: Float,   //0=0, 1=270 ,0.5=(0.5/1)*270
    thickness: Dp = 8.dp,
    bgColor: Color,
    arcColor: Color
) {
    val limitAngle=limit*270
    // Create a state variable for the progress value
    var progress by remember { mutableStateOf(0f) }
    // Animate the progress value from 0 to 1
    val animatedProgress by animateFloatAsState(
        targetValue = progress,
        animationSpec = tween(durationMillis = 50)
    )
    // Calculate the sweep angle based on the progress value
    val sweepAngle = animatedProgress * limitAngle
    // Draw a canvas that will draw the arc
    Canvas(
        modifier = modifier
            .fillMaxWidth()
            .aspectRatio(1f),

    ) {
        // Draw a background arc with a light gray color
        drawArc(
            color = bgColor,
            startAngle = 0f+135,
            sweepAngle = 270f,
            useCenter = false,
            style = Stroke(thickness.toPx(), cap = StrokeCap.Round),
            size = androidx.compose.ui.geometry.Size(size.width, size.height)
        )
        // Draw a foreground arc with a green color
        drawArc(
            color = arcColor,
            startAngle = 0f+135,
            sweepAngle = sweepAngle,
            useCenter = false,
            style = Stroke(thickness.toPx(), cap = StrokeCap.Round),
            size = androidx.compose.ui.geometry.Size(size.width, size.height)
        )
    }
    // Launch a coroutine that will update the progress value over time
    LaunchedEffect(Unit) {
        // Loop from 0 to 100
        for (i in 0..100) {
            // Set the progress value to i / 100f
            progress = i / 100f
            // Delay for 50 milliseconds
            delay(10)
        }
    }
}
