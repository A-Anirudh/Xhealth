package com.example.xhealth.loginPage

import android.content.ContentValues.TAG
import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldColors
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import com.example.xhealth.homeScreen.HomeScreen
import com.example.xhealth.utils.LoadingScreen
import com.example.xhealth.viewModels.dataViewModel
import com.example.xhealth.viewModels.helper.getToken
import org.w3c.dom.Text

object states {
    val loggedOut = "loggedOut"
    val loggingIn = "loggingIn"
    val loggedIn = "loggedIn"
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LogInScreen(
    viewModel: dataViewModel
) {
    var curState: String by rememberSaveable { mutableStateOf(states.loggedOut) }
    var email by rememberSaveable { mutableStateOf("") }
    getToken(viewModel)
    if (viewModel.email != "") {
        Log.d(TAG, viewModel.email)
        HomeScreen(dataViewModel=viewModel)
    } else if (curState == states.loggedOut) {
        LoginForm(
            viewModel = viewModel,
            OnSuccess = { curState = states.loggedIn },
            OnFailure = { curState = states.loggedOut },
            changeState = { curState = states.loggingIn }
        )
    } else if (curState == states.loggingIn) {
        LoadingScreen()
    }

}