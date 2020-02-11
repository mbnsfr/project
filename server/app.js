
const express = require('express');
const { ParseServer } = require('parse-server');

const app = express();
const api = new ParseServer({
  databaseURI: 'mongodb://172.17.0.2:27017',
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse',
});
app.use('/parse', api);
app.listen(1337, () => {
  console.log('parse-server-example running on port 1337.');
});
