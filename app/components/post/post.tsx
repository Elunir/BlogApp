import * as React from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../Text"

export interface PostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  postTitle: string
  onPress?: ()=>void
}

/**
 * Describe your component here
 */
export const Post = observer(function Post(props: PostProps) {
  const { style, postTitle, onPress } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity style={$styles} onPress={onPress}>
      <Text text={postTitle} preset="subheading"/>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  padding: 16,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  marginVertical: 8,
  backgroundColor: 'white'
}
