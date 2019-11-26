# ordered online web and mobile app

This hybrid mobile and web app provides a shared interface to use the `ordered.online` application.

## Technology Stack

- [React](https://github.com/facebook/react)
- [React Native](https://github.com/facebook/react-native)
- [React Native for Web](https://github.com/necolas/react-native-web)
- [Redux](https://github.com/reduxjs/redux)
- [Babel](https://github.com/babel/babel)
- [Expo](https://github.com/expo/expo)
- [Prettier](https://github.com/prettier/prettier)

## Quickstart

To start a local development environment you will have to:

1. Install all dependencies with your your package manager of choice. We prefer [yarn](https://github.com/yarnpkg/yarn).

   Simply run `$ yarn install` OR `$ npm install`

2. Run a security audit to check for known security issues with the installed packages ! This step is optional but can be an important step to ensure there are no vulnerabilities with transitive dependencies.

   Simply run `$ yarn audit` OR `$ npm audit`

If for some reasons, there are vulnerabilities that were found, you can run `$ yarn audit --json > audit.json` or `$ npm audit --json > audit.json` to save a detailed report in a json file. Inspect on the packages to see the security issues. Then fix those issues by either running `$ npm audit fix` (only available for npm) or setting an specific version for transitive dependencies by including a `resolutions` key in the package.json. For example:

```json
    "resolutions": { "**/**/lodash": "^4.17.12" }
```

3. Run the application on the plattform of your choice. Just execute the respective command for your desired platform with the package manager of choice:

   - Web : `$ yarn run web` OR `$ npm run web`
   - Native : `$ yarn run native` OR `$ npm run native`
   - Android : `$ yarn run android` OR `$ npm run android`
   - iOS : `$ yarn run ios` OR `$ npm run ios`

4. If you wish to test the app natively on your phone, install the [Expo Client](https://expo.io/tools) on your device. You can get it from the following links for [iOS](https://apps.apple.com/us/app/expo-client/id982107779) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)

Then connect your phone to the same wireless network as your computer. On Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, follow on-screen instructions to get a link.

## Development

### Web

Run the app in development mode with hot module replacement via Webpack Dev Server

Simply run `$ yarn run web` OR `$ npm run web` to run Expo for Web. This will open Expo in your browser and redirect you to the web application.

Alternatively you can run `$ yarn run scripts:start` OR `$ npm run scripts:start` to start the dev server from react scripts and open your browser at `localhost:3000`.

### Android

Run the app via Expo in a simulator for android devices.

Simply run `$ yarn run android` OR `$ npm run android`

### iOS

Run the app via Expo in a simulator for iOS devices.

Simply run `$ yarn run ios` OR `$ npm run ios`

## Deployment

The ordered.online application can be bundled to be served on the web or published on the app stores with the following commands

### Web

We bundle the application with Webpack and run it in production mode.

Simply run `$ yarn run build:web` OR `$ npm run build:web`

This will produce a `build` directory which can be served via a simple web server. In our case we will serve it via [NGINX](https://github.com/nginx/nginx). For details on the exact deployment to web, see our [infrastructure repository](https://github.com/ordered-online/infrastructure)

### Android

We bundle the application and generate a native android app via Expo.
We can build a standalone app following the [Expo Documentation for Building Standalone Apps](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)

Simply run `$ yarn run build:android` OR `$ npm run build:android`

This will produce a Android Application which we can deploy the Play Store by following the [Expo Documentation on Deploying to App Stores](https://docs.expo.io/versions/latest/distribution/app-stores/). To get a summary of the deployment process, we refer to the [Expo Documentation on Publishing](https://docs.expo.io/versions/latest/workflow/publishing/)

### iOS

We bundle the application and generate a native ios app via Expo.
We can build a standalone app following the [Expo Documentation for Building Standalone Apps](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)

Simply run `$ yarn run build:ios` OR `$ npm run build:ios`

This will produce a iOS Application which we can deploy the App Store by following the [Expo Documentation on Deploying to App Stores](https://docs.expo.io/versions/latest/distribution/app-stores/). To get a summary of the deployment process, we refer to the [Expo Documentation on Publishing](https://docs.expo.io/versions/latest/workflow/publishing/)
