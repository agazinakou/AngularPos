// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:1337',
  cp: {
    api_key: '5579980505863a3f6aabd82.89189525',
    site_id: 659913,
    notify_url: 'https://YOUR_NOTIFY_URL',
    currency: 'CFA'
  },
  firebase : {
    apiKey: "AIzaSyAGFtnvDdtupogina4NVcGHzAMPzLpZcbc",
    authDomain: "angularpos-379cd.firebaseapp.com",
    databaseURL: "https://angularpos-379cd.firebaseio.com",
    projectId: "angularpos-379cd",
    storageBucket: "angularpos-379cd.appspot.com",
    messagingSenderId: "112372376465"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
