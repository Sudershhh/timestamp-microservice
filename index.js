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


//EMPTY DATE CHECK

// const inputDate = req.params.date
// if(inputDate.length==0)
//   {
//     res.json({
//       "unix":Date.now(),
//       "utc": new Date().getTime()
//     })
//   }


const parsedDate = new Date(req.params.date)
console.log("PARSED DATE : ", parsedDate)
//VALID DATE CHECK
if (Object.prototype.toString.call(parsedDate) === "[object Date]" && isNaN(parsedDate.getTime()) )
  {
      res.json({error:"Invalid Date"})
      return
}



const stringDate = new Date(req.params.date).toLocaleDateString()
console.log("STRING DATE : ", stringDate)

console.log("UTC DATE : ", parsedDate.toUTCString())

if(req.params.date.toString().includes("-"))
  {
    res.json({
      "unix":Date.now(parsedDate),
      "utc": parsedDate.toUTCString()
    })
  }
  else{
    
    res.json({
      "unix":req.params.date,
      "utc": new Date((+req.params.date)/1000).toUTCString()
    })
  }


})




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
