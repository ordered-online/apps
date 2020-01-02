<p align="center">
  <a href="https://ordered.online/">
    <img alt="ordered.online" src="https://raw.githubusercontent.com/ordered-online/apps/master/logo.png" width="980">
  </a>
</p>

<h1 align="center">ordered.online apps</h1>

<h3 align="center">
  Just order food and drinks online.
</h3>

<p align="center">
    <a href="https://github.com/ordered-online/apps/actions"><img alt="Github Actions" src="https://github.com/ordered-online/apps/workflows/Node%20CI/badge.svg"></a>
    <a href="https://travis-ci.org/ordered-online/apps"><img alt="Travis Status" src="https://travis-ci.org/ordered-online/apps.svg?branch=master"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Issues" src="https://img.shields.io/github/issues/ordered-online/client"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Forks" src="https://img.shields.io/github/forks/ordered-online/client"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Followers" src="https://img.shields.io/github/followers/ordered-online?label=Follow"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Watchers" src="https://img.shields.io/github/watchers/ordered-online/client"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Stars" src="https://img.shields.io/github/stars/ordered-online/client"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Repo Size" src="https://img.shields.io/github/repo-size/ordered-online/client"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Releases" src="https://img.shields.io/github/v/release/ordered-online/client?sort=semver"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Tags" src="https://img.shields.io/github/v/tag/ordered-online/client"></a>
    <a href="https://ordered.online"><img alt="ordered.online" src="https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=soon&url=https%3A%2F%2Fordered.online"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Github Commits" src="https://img.shields.io/github/last-commit/ordered-online/client"></a>
    <a href="https://github.com/ordered-online/apps"><img alt="Keywoards" src="https://img.shields.io/github/package-json/keywoards/ordered-online/client"></a>
</p>

These hybrid mobile and web apps provide a shared interface to use the `ordered.online` application. This repository is organized as a `monorepo` to allow for efficient module sharing and reuse of components between applications. This `State of the Art` approach will enable use to abstract different applications by using modularized reusable components. We utilize the `JAMSTACK` which is a new way of writing modern and secure web and mobile applications. Somehow this will also help with `SEO` (No futher questions). Other `BUZZWORDS` will be added soon...

## Technology Stack

- [React](https://github.com/facebook/react)
- [React Native](https://github.com/facebook/react-native)
- [React Native for Web](https://github.com/necolas/react-native-web)
- [Expo](https://github.com/expo/expo)
- [Redux](https://github.com/reduxjs/redux)
- [Babel](https://github.com/babel/babel)
- [Prettier](https://github.com/prettier/prettier)

## Packages

This monorepo is organized by [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). This way we can abstract different applications by using modularized reusable components. All the packages will share one common `node_modules` directory located in the root of this repository. Inside each package directory the respective `package.json` will hold all configuration needed for the individual package. A package directory will have a node_modules directory consisting of symlinks. All packages provided will share the prefix `@ordered.online/`.

| Package                    | Explanation                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| @ordered.online/api        | Ready-to-use api callbacks to the ordered.online service api. (works as stand-alone)          |
| @ordered.online/components | React components reused throughout the ordered.online applications (works as stand-alone)     |
| @ordered.online/app        | Hybrid mobile and web app for ordering through a customer                                     |
| @ordered.online/manager    | Hybrid mobile and web app for location managers to organize their locations and handle orders |

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

3. Bootstrap all applications with lerna. This will create symlinks inside the `node_modules` directory to the individual `packages/*` directories.

   Simply run `$ yarn run bootstrap` OR `$ npm run bootstrap`

4. To start the manager app, just execute the respective command with the package manager of choice:

   ```bash
   $ yarn run start:manager
   # OR
   $ npm run start:manager
   ```

5. To start the customer app, just execute the respective command with the package manager of choice:

   ```bash
   $ yarn run start:manager
   # OR
   $ npm run start:manager
   ```

6. To run either the customer or manager application on the plattform of your choice, switch in to the directory of the specific app with
   either `cd packages/app` or `cd packages/manager`.
   Then execute the respective command for your desired platform with the package manager of choice:

   - Web : `$ yarn run web` OR `$ npm run web`
   - Android : `$ yarn run android` OR `$ npm run android`
   - iOS : `$ yarn run ios` OR `$ npm run ios`

7. If you wish to test one of the apps natively on your phone, install the [Expo Client](https://expo.io/tools) on your device. You can get it from the following links for [iOS](https://apps.apple.com/us/app/expo-client/id982107779) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)

Then connect your phone to the same wireless network as your computer. On Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, open the camera and point it at the QR Code. You will be provided with a pop-up link to open the application in the expo app.

## Development

The following refer to the development of either the customer or manager application. First, you will have to switch in to the directory of the specific app with either `cd packages/app` or `cd packages/manager`.

### Web

Run the app in development mode with hot module replacement via Webpack Dev Server

Simply run `$ yarn run web` OR `$ npm run web` to run Expo for Web. This will open Expo in your browser and redirect you to the web application.

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
