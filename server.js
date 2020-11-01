const express = require('express');
const http = require('http');
const proxy = require('http-proxy-middleware');

const app = express();
//running the app by serving the static files
//from dist folder
app.use(express.static(__dirname + '/dist/cit-ui'));

// Add middleware for http proxying 
const DEVELOPMENT_BACKEND_SERVER = 'http://192.168.29.45:8080';

const LOCAL_BACKEND_SERVER = 'http://localhost:8080';

//app.use('/mppkvvcl/nextgenbilling/', proxy({target: '', changeOrigin: true}));
app.use('/mppkvvcl/cit/', proxy({
  target: process.env.PRODUCTION_BACKEND_SERVER || DEVELOPMENT_BACKEND_SERVER || LOCAL_BACKEND_SERVER,
  xfwd:true,
}));


//for local testing
//app.use('/mppkvvcl/nextgenbilling/', proxy({target: LOCAL_BACKEND_SERVER, changeOrigin: true}));

const path = require('path');
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  console.log("Server request on process Id " + process.pid);
  res.sendFile(path.join(__dirname));
});


console.log("Requiring http ");
var https = require('http');
var httpsServer = http.createServer(app);
console.log("Created http server");

console.log("Starting Node Server with ngb frontend application");

let port = process.env.PORT ||4200;

httpsServer.listen(port, () => {
    if(process.env.PRODUCTION_BACKEND_SERVER){
      console.log("using production backend server as " + process.env.PRODUCTION_BACKEND_SERVER );
    }else if(LOCAL_BACKEND_SERVER){
      console.log("using development backend server as " + LOCAL_BACKEND_SERVER);
    }else {
      console.log("Unknown Backend Server url");
    }
    console.log("Started Server at port " + port + " with process Id " + process.pid);
});
