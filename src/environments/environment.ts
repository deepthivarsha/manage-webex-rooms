// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: 'C5ec2fbf8a225ef46e5fadc3f17c944b761468efcf30f965f7c2b5ca6b5495b0b',
  client_secret: 'cbd8fa39a42a90992bf8024dadf6e5176a6463132fb0e4ac02581194462266ca',
  redirect_uri: 'http://localhost:4200/roomcontrol',
  scope: 'spark:all spark:kms',
  TIMEOUT: 3600
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
