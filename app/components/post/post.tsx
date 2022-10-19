import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../Text"

export interface PostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  postTitle: string
}

/**
 * Describe your component here
 */
export const Post = observer(function Post(props: PostProps) {
  const { style, postTitle } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text text={postTitle} preset="subheading"/>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  padding: 16,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10
}
