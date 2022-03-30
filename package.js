Package.describe({
  name: 'nudelta2015:push',
  // version: '0.0.0-semantic-release',
  version: "1.0.1",
  summary: 'Isomorphic Push notifications for APN and GCM',
  git: 'https://github.com/NUDelta/push.git'
});

// Server-side push deps
Npm.depends({
  'apn' : '2.2.0', // '1.7.4', // working: 1.6.2
  'node-gcm' : '0.14.4', // previously: 0.9.6
});

Cordova.depends({
  '@havesource/cordova-plugin-push': 'https://github.com/havesource/cordova-plugin-push.git#a1df480db66821e29bd3c7a432e2e2fa2ba18bd4', // 3.0.0 , using github URL due to issues with the '@' in the plugin name
  'cordova-plugin-device': '2.0.3', // previously 1.1.1
});

Package.onUse(function(api) {
  api.versionsFrom('2.6.1');
  api.use(['ecmascript']);


  api.use([
    'tracker', // Push.id() is reactive
  ], 'client');

  // Keep track of users in the appCollection
  api.use([
    'accounts-base'
  ], ['client', 'server'], { weak: true });

  api.use([
    'raix:eventstate@0.0.4',
    'check',
    'mongo',
    'underscore',
    'ejson',
    'random',   // The push it is created with Random.id()
  ], ['client', 'server']);

  api.use('mongo', 'server');

  // API
  api.addFiles('lib/client/cordova.js', 'web.cordova');

  // Common api
  api.addFiles([
    'lib/common/main.js',
  ], ['web.browser', 'server']);

  // Common api
  api.addFiles([
    'lib/common/notifications.js'
  ], ['client', 'server']);

  // API's
  api.addFiles('lib/client/browser.js', 'web.browser');
  api.addFiles('lib/server/push.api.js', 'server');

  // // Unified api
  api.addFiles('lib/client/client.js', 'client');
  api.addFiles('lib/server/server.js', 'server');

  api.export('Push');

  api.export('_matchToken', { testOnly: true });
  api.export('checkClientSecurity', { testOnly: true });
  api.export('initPushUpdates', { testOnly: true });
  api.export('_replaceToken', { testOnly: true });
  api.export('_removeToken', { testOnly: true });

});
