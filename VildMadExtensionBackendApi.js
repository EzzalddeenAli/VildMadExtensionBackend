var express = require('express');

var app = express();

app.listen(3000, () => {
    console.log('Started on port 3000');
});

app.get("/", function(req, res){
    res.send("Welcome to Vild Mad Extension Backend API");
});

app.get("/", function(req, res){
    res.send("This is the default route for Vild Mad Extension Backend API");
});