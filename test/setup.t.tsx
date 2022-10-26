// we always make sure 'react-native' gets included first
import * as ReactNative from "react-native"
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock"
import mockFile from "./mockFile"
import 'react-native-gesture-handler/jestSetup'

require('jest-fetch-mock').enableMocks()

jest.mock('@react-navigation/native');
jest.mock('@react-navigation/stack');
jest.mock('@react-navigation/native-stack');

// libraries to mock
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn(
          (
            uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  )
})

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage)

jest.mock("i18n-js", () => ({
  currentLocale: () => "en",
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

declare const tron // eslint-disable-line @typescript-eslint/no-unused-vars

jest.useFakeTimers()
declare global {
  let __TEST__
}

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {
    //
  }

  return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')