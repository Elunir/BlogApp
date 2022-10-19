/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen, Text } from "../../components"
import { SafeAreaView } from "react-native-safe-area-context"
import { Post } from "../../components/post/post"
import axios from 'axios';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Welcome: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Welcome" component={WelcomeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const WelcomeScreen: FC<StackScreenProps<AppStackScreenProps, "Welcome">> = observer(
  function WelcomeScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
    //   axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
    //     setPosts(res.data.slice(0, 10));
    //     console.log(posts);
    // })
    }, [])

    return (
      <Screen preset="scroll">
        <SafeAreaView style={$root}>
          <Text text="My Posts" preset="heading" />
          <View style={$postContainer}>
            <Post postTitle="post1" />
          </View>
        </SafeAreaView>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  margin: 16,
}
const $postContainer: ViewStyle = {
  marginTop: 20,
}