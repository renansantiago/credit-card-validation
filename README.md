# React Native Credit Card Validation

This is a simple React Native App to validate a Form with credit card fields.

The project is using [Typescript](https://reactnative.dev/docs/typescript) as the main language, [React Native Material](https://www.react-native-material.com/) for Design UI, [Formik](https://formik.org/docs/guides/react-native) to handle the form fields Props, [react-native-mask-text](https://github.com/akinncar/react-native-mask-text) to handle the expiration date mask, and [Jest](https://jestjs.io/) for Unit Tests.

Running the App
---------------
1. Make sure you have your environment [setup](https://reactnative.dev/docs/environment-setup) properly to be able to run the application.
2. Clone the app and inside the app folder run on the terminal: ```npm install``` or ```yarn```
3. Open the ios folder inside the root folder of the app and run on terminal: ```pod install``` (iOS only)
4. To run the app on an emulator or a device run on terminal:
### Android (Emulator or Device)
```npm run android``` or ```yarn android```

### iOS (Emulator)
```npm run ios``` or ```yarn ios```
### iOS (Device)
```npm run ios --device``` or ```yarn ios --device```

To run the app on an iPhone device you may need additional [configuration](https://reactnative.dev/docs/running-on-device).

5. To run the unit tests run on terminal: ```npm test``` or ```yarn test```
