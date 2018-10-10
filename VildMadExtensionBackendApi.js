var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Started on port ' + port);
});

app.get("/", function(req, res){
    res.send("Welcome to Vild Mad Extension Backend API");
});

app.get("/dummy", function(req, res){
    res.send("I am a dummy!!!");
});

app.get("*", function(req, res){
    res.send("This is the default route for Vild Mad Extension Backend API");
});