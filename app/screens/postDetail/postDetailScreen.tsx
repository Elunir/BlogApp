import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../../navigators"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `PostDetail: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="PostDetail" component={PostDetailScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PostDetailScreen: FC<StackScreenProps<AppStackScreenProps, "PostDetail">> = observer(
  function PostDetailScreen({ route }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    console.log("postdetail", route.params)
    const { id, title, body } = route.params
    return (
      <Screen style={$root} preset="scroll">
        <SafeAreaView>
          <Text text={id} />
          <Text text={title} preset="heading" />
          <Text text={body} preset="subheading"/>
          <Button 
          text="Go Back"
          style={$button}
          onPress={()=>goBack()}
          />
        </SafeAreaView>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  padding: 16
}

const $button: ViewStyle = {
  marginTop: 30
}