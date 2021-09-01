// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
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
    messagingSenderId: "112372376465",
    appId: "1:112372376465:web:e4e9f2240c18eeabeb7030"  
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
