import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, navigate } from "../../navigators"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components"
import { colors, spacing } from "../../theme"
import auth from '@react-native-firebase/auth'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Register: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Register" component={RegisterScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RegisterScreen: FC<StackScreenProps<AppStackScreenProps, "register">> = observer(
  function RegisterScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState('')

    const passwordInput = useRef<TextInput>()
    const confirmPasswordInput = useRef<TextInput>()


    const PasswordRightAccessory = useMemo(
      () =>
        function PasswordRightAccessory(props: TextFieldAccessoryProps) {
          return (
            <Icon
              icon={visiblePassword ? "view" : "hidden"}
              color={colors.palette.neutral800}
              containerStyle={props.style}
              onPress={() => setVisiblePassword(!visiblePassword)}
            />
          )
        },
      [visiblePassword],
    )

    const ConfirmPasswordRightAccessory = useMemo(
      () =>
        function PasswordRightAccessory(props: TextFieldAccessoryProps) {
          return (
            <Icon
              icon={visibleConfirmPassword ? "view" : "hidden"}
              color={colors.palette.neutral800}
              containerStyle={props.style}
              onPress={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
            />
          )
        },
      [visibleConfirmPassword],
    )

    const register = () => {
      if (email.length === 0) setEmailError("can't be blank")
      if (email.length < 6) setEmailError("must be at least 6 characters")
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setEmailError("must be a valid email address")
      if (password.length === 0) setPasswordError("can't be blank")
      if (password.length < 6) setPasswordError("must be longer than 6 characters")
      if (password !== confirmPassword) setPasswordError("password must match")
      auth().createUserWithEmailAndPassword(email,password).catch(err => console.log(err));
    }

    const login = () => {
      navigate("login")
    }

    return (
      <Screen preset="auto" contentContainerStyle={$root} safeAreaEdges={["top", "bottom"]}>
        <Text testID="login-heading" text="Register" preset="heading" style={$registerHeading} />
        <Text text="Enter your details below" preset="subheading" style={$enterDetails} />
        <TextField
          value={email}
          onChangeText={setEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          label="Email"
          placeholder="Enter your email address"
          onSubmitEditing={() => passwordInput.current?.focus()}
        />
        {emailError !== "" ? <Text style={$errorText} text={emailError} /> : null}
        <TextField
          ref={passwordInput}
          value={password}
          onChangeText={setPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={!visiblePassword}
          label="Password"
          placeholder="Enter your password"
          RightAccessory={PasswordRightAccessory}
          onSubmitEditing={() => confirmPasswordInput.current?.focus()}
        />
        <TextField
          ref={confirmPasswordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={!visibleConfirmPassword}
          label="Confirm Password"
          placeholder="Confirm your password"
          RightAccessory={ConfirmPasswordRightAccessory}
        />
        {passwordError !== "" ? <Text style={$errorText} text={passwordError} /> : null}

        <Button
          testID="login-button"
          text="Register"
          style={$tapButton}
          preset="reversed"
          onPress={register}
        />
        <Button
          testID="register-button"
          text="Back to Login"
          style={[$tapButton, $loginButton]}
          preset="reversed"
          onPress={login}
          textStyle={$loginText}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $registerHeading: TextStyle = {
  marginBottom: spacing.small,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.medium,
}

const $loginButton: ViewStyle = {
  backgroundColor: "white",
  borderWidth: 2,
  borderColor: "black",
}
const $loginText: TextStyle = {
  color: "black",
}
const $errorText: TextStyle = {
  color: "red",
  marginTop: -8,
  marginBottom: 16,
}
