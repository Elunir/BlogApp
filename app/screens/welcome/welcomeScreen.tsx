/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, navigate } from "../../navigators"
import { Screen, Text } from "../../components"
import { SafeAreaView } from "react-native-safe-area-context"
import { Post } from "../../components/post/post"
import axios from "react-native-axios"
import auth from '@react-native-firebase/auth'
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
    function logout(){
      auth().signOut();
    }

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const [posts, setPosts] = useState([])

    useEffect(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          setPosts(res.data.slice(0, 20))
        })
        .catch((err) => {
          console.log(err)
        })
    }, [])

    function postDetail(data) {
      navigate("PostDetail", data)
    }

    return (
      <Screen preset="scroll">
        <SafeAreaView style={$root}>
          <View style={$header}>
            <Text text="My Posts" preset="heading" />
            <TouchableOpacity onPress={()=>{logout()}}>
              <Text style={{color:'red'}} text="Logout" preset="bold"/>
            </TouchableOpacity>
          </View>
          <View style={$postContainer}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <Post postTitle={item.title} onPress={() => postDetail(item)} />
              )}
              keyExtractor={(item) => item.id}
            />
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
const $header: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}