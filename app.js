const express = require("express");
const https = require("https"); //native node module
const bodyParser = require("body-parser")
const path = require("path")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")))
app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  console.log(req.body.country+","+req.body.state+","+req.body.city);
  const country = req.body.country;
  const state = req.body.state;
  const city = req.body.city;
  const apiKey = "5f346452-3b80-4f90-b0a5-e981a63b9de0";
  const aqi = "https://api.airvisual.com/v2/city?city=" + city +"&state=" + state+ "&country="+country + "&key="+apiKey;

  https.get(aqi, function(response){
    console.log(response.statusCode);

    response.on("data", function(data)
  {
    const aqiData = JSON.parse(data);
    const aqindex = aqiData.data.current.pollution.aqius;
    console.log(aqindex);
    res.send("<h1>The air quality Index in "+city+" is "+aqindex + ". </h1>");

});

});

})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
