## Demo example: Integrating Perfect-Live Web SDK into a React Native App

To integrate the Perfect-Live Web SDK into your React Native application, set the `webViewUrl` value to the address of your demo stand, and set `validSessionToken` to a valid session token. Optionally, you can also provide localization and/or theme parameters as query params on `webViewUrl`.

### Configuration:

If you have your own sandbox, you can configure the access to point to your actual address in [App.tsx](App.tsx) by changing the `webViewUrl` variable.

If the user does not exist yet, you need to create it first using the [Create User](https://perfectlive.readme.io/reference/post_users) API method.

After that, obtain an up-to-date session token using the [Start Session](https://perfectlive.readme.io/reference/post_session) API method and set it as the value of the `validSessionToken` variable.

```
const validSessionToken = 'BnHBKWqwi_Ojh3MkhmJMiHbyn66kTwFj';
const webViewUrl = 'https://demo.dev.perfect.live/sdk/webview'
```

> **Note:** The values above are for demo purposes only. This session works in read-only mode, so sending messages will not work.

### Running the project:

Install dependencies:

```
npm install
```

#### iOS

Install CocoaPods dependencies (only needed the first time or after updating native dependencies):

```
cd ios && pod install && cd ..
```

Start the Metro bundler:

```
npm start
```

In a separate terminal, run the app on iOS:

```
npm run ios
```

#### Android

Start the Metro bundler:

```
npm start
```

In a separate terminal, run the app on Android:

```
npm run android
```
