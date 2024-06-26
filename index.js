// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/",function(req,res)
{

  console.log("EMPTY DATE")
    res.json({
      "unix":Date.now(),
      "utc": new Date().getTime()
    })

})

app.get("/api/:date", function(req,res){



const parsedDate = new Date(req.params.date)
console.log("PARSED DATE : ", parsedDate)


if(new Date(parseInt(req.params.date)).toString() === "Invalid Date")
  {
    res.json({error:"Invalid Date"})
    return;
  }



if((new Date(parseInt(req.params.date)).getTime() === parseInt(req.params.date) && req.params.date.indexOf("-") === -1 && req.params.date.indexOf(" ") === -1 ))
  {
    res.json({
      "unix":parseInt(req.params.date),
      "utc": new Date(parseInt(req.params.date)).toUTCString()
    })
  }
  else{
    res.json({
      "unix":parsedDate.getTime(),
      "utc": new Date(parseInt(parsedDate.getTime())).toUTCString()
    })

  }


})




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
