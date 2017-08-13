# HelloReactNative

Using

- React Native
- React Navigation
- Firebase Auth + DB

# Get started

- Prepare development environments
- Download this project
- Install `react-native-cli`
- Set up `/cred.json`
- Connect devices (Android, iOS or their simulators)
- run `react-native run-android` or `react-native run-ios`

## Prepare development environments

You have already prepared followings:

- Node.js
- Firebase project
- For Android, Android Studio and JDK
- For iOS, Xcode and watchman

## Download this project

```console
$ npm clone git@github.com:ginpei/HelloReactNative.git
$ cd HelloReactNative
$ npm install
```

You can use `yarn install` instead of `npm install`.

## Install `react-native-cli`

```console
$ npm install --global react-native-cli
```

Note that what you have to install is "CLI", not `react-native` itself.

## Set up `/cred.json`

Prepare your Firebase project and find "Project ID" and "Web API Key". You should see them from:

1. Access to Firebase console: https://console.firebase.google.com/
2. Open your Firebase project's overview
3. Open your app's Settings (from 3 dots)
4. Here you go!

Then copy `/cred.example.json` to `/cred.json` and write them down.

## Connect devices (Android, iOS or their simulators)

Connect your devices by USB or something and turn dev mode on.

## run `react-native run-android` or `react-native run-ios`

Yay!
