var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./strategies/user');
var session = require('express-session');
var register = require('./routes/register');
var user = require('./routes/user');
var index = require('./routes/index');


// App Set //
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


//initiate Passport session config
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 600}
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/register', register);
app.use('/', index);

// Mongo Connection //
var mongoURI = "mongodb://localhost:27017/user_passport_session";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
   if(err) console.log("Mongo Error: ", err);
});

mongoDB.once('open', function(){
   console.log("connected to mongo, meow!");
});


// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});