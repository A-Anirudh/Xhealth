    package com.example.xhealth.loginPage

    import android.content.res.Resources.Theme
    import androidx.compose.foundation.Image
    import androidx.compose.foundation.isSystemInDarkTheme
    import androidx.compose.foundation.layout.Arrangement
    import androidx.compose.foundation.layout.Column
    import androidx.compose.foundation.layout.IntrinsicSize
    import androidx.compose.foundation.layout.Spacer
    import androidx.compose.foundation.layout.fillMaxHeight
    import androidx.compose.foundation.layout.fillMaxSize
    import androidx.compose.foundation.layout.fillMaxWidth
    import androidx.compose.foundation.layout.height
    import androidx.compose.foundation.layout.width
    import androidx.compose.foundation.text.KeyboardActions
    import androidx.compose.foundation.text.KeyboardOptions
    import androidx.compose.material.icons.Icons.Sharp
    import androidx.compose.material.icons.materialIcon
    import androidx.compose.material.icons.sharp.*
    import androidx.compose.material3.Button
    import androidx.compose.material3.ButtonDefaults
    import androidx.compose.material3.Card
    import androidx.compose.material3.CardDefaults
    import androidx.compose.material3.CardElevation
    import androidx.compose.material3.ExperimentalMaterial3Api
    import androidx.compose.material3.Icon
    import androidx.compose.material3.IconButton
    import androidx.compose.material3.OutlinedTextField
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
    import androidx.compose.ui.graphics.RectangleShape
    import androidx.compose.ui.graphics.Shape
    import androidx.compose.ui.res.painterResource
    import androidx.compose.ui.semantics.semantics
    import androidx.compose.ui.text.font.FontFamily
    import androidx.compose.ui.text.input.KeyboardType
    import androidx.compose.ui.text.input.PasswordVisualTransformation
    import androidx.compose.ui.text.input.VisualTransformation
    import androidx.compose.ui.text.style.TextAlign
    import androidx.compose.ui.unit.dp
    import com.example.xhealth.R
    import com.example.xhealth.viewModels.dataViewModel
    import okhttp3.internal.wait

    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun LoginForm(
        viewModel:dataViewModel,
        OnSuccess:()->Unit,
        OnFailure:()->Unit,
        changeState:()->Unit
    ) {
        val passwordHidden = rememberSaveable { mutableStateOf(true) }
        val errorMessage = "Text input too long"
        var email by rememberSaveable { mutableStateOf("") }
        var isError by rememberSaveable { mutableStateOf(false) }



            Column(
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxHeight()
            ) {
                Image(painter = painterResource(id = if(isSystemInDarkTheme()) R.drawable.darkxhealthlogo else R.drawable.xhealthlogo), contentDescription =null )


                Spacer(modifier = Modifier.height(180.dp))


                OutlinedTextField(
                    value = email,
                    onValueChange = {
                        email = it
                    },
                    singleLine = true,
                    label = { Text(if (isError) "Email*" else "Email") },
                    isError = viewModel.LogInError,
                    modifier = Modifier
                        .semantics {
                            // Provide localized description of the error
                            if (isError) error("Wrong details")
                        }
                        .width(300.dp)
                )

                Spacer(modifier = Modifier.height(30.dp))

                OutlinedTextField(
                    value = viewModel.password,
                    onValueChange = {viewModel.password=it},
                    label = { Text(if (isError) "Password*" else "Password") },
                    visualTransformation =if (passwordHidden.value) PasswordVisualTransformation() else VisualTransformation.None,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    singleLine = true,
                    isError = viewModel.LogInError,
                    trailingIcon = {
                        IconButton(onClick = { passwordHidden.value = !passwordHidden.value }) {
                            val visibilityIcon =
                                if (passwordHidden.value) Sharp.Visibility else Sharp.VisibilityOff
                            // Please provide localized description for accessibility services
                            val description = if (passwordHidden.value) "Show password" else "Hide password"
                            Icon(imageVector = visibilityIcon, contentDescription = description)
                        }
                    },
                    modifier = Modifier.width(300.dp)
                )

                Spacer(modifier = Modifier.height(30.dp))

                Button(onClick = {
                    changeState()
                    viewModel.sendToken(
                        OnSuccess = OnSuccess,
                        OnFailure = OnFailure,
                        emailIn = email,
                    )},
                    modifier = Modifier.width(300.dp),
                    shape = RectangleShape
                ) {
                    Text(text = "Log in!")
                }
            }


    }