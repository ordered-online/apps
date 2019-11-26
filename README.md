<p align="center">
  <a href="https://ordered.online/">
    <img alt="ordered.online" src="logo.png" width="980">
  </a>
</p>

<h1 align="center">ordered.online apps</h1>

<h3 align="center">
  Just order food and drinks online.
</h3>

<p align="center">
    <a href="https://travis-ci.org/ordered-online/client.svg?branch=master"><img alt="Travis Status" src="https://img.shields.io/travis/ordered-online/client"></a>
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

   Simply run `$ yarn bootstrap` OR `$ npm run bootstrap`

4. Run both applications in parallel. Just execute the respective command with the package manager of choice:

```bash
$ yarn run start
# OR
$ npm run start
```

4. If you wish to test the app natively on your phone, install the [Expo Client](https://expo.io/tools) on your device. You can get it from the following links for [iOS](https://apps.apple.com/us/app/expo-client/id982107779) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)

Then connect your phone to the same wireless network as your computer. On Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, open the camera and point it at the QR Code. You will be provided with a pop-up link to open the application in the expo app.
