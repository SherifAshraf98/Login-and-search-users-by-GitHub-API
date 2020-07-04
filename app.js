require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');


// Root Route, renders login page
app.get("/", function(req, res) {
  res.render("index",{showAlert: false});
});


// Redirect Route, callback to complete authentication by github api
app.get("/user/signin/callback", function(req, res) {
  // Receiving sent Request Token from API
  const requestToken = req.query.code;

  if (!requestToken) {
    console.log("Error, No Access Token received");
    res.redirect("/unauthorized");
    // res.render("index",{showAlert: true, alertState: 'danger', alertMessage: 'Unauthorized access! No such Token.'});
  } else {
  //making post request  to get Access Token
    axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }

  }).then((response) => {
    // If response was suucessfully done and there is access token received from API
    if((response.status === 200) && response.data.access_token){
      // const accessToken = response.data.access_token;
      // Then render home pacge to search for users
      res.render('home');
    } else {
      // If there is error and no token received
      // then render login page with alert indicating that error
      res.redirect("/unauthorized");
      // res.render("index",{showAlert: true, alertState: 'danger', alertMessage: 'Unauthorized access! No such Token.'});
    }

  })
  }
});

// When the entered access token is not authenticated
app.post("/unauthorized",function(req,res){
  // then render login page with alert indicating that error
  res.render("index",{showAlert: true, alertState: 'danger', alertMessage: 'Unauthorized access! No such Token.'});
});
// When the entered access token is not authenticated
app.get("/unauthorized",function(req,res){
  // then render login page with alert indicating that error
  res.render("index",{showAlert: true, alertState: 'danger', alertMessage: 'Unauthorized access! No such Token.'});
});

// When the entered access token is authenticated
app.post("/accessTokenLogin",function(req,res){
  // Then render home pacge to search for users
  res.render("home");
});

app.listen(3000, function() {
  console.log("Server started at port 3000.");
});
