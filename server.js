// Dependencies
// ==========================================
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')


let htmlRout = require(path.join(__dirname, "app/routing", "htmlRoutes.js" ))
let apiRout = require(path.join(__dirname, "app/routing", "apiRoutes.js" ))

// Server Init
// ==========================================
let PORT = process.env.PORT || 8705
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("app/public"));

// NOTE: apiRout has to be called first or else it wouldn't work.

apiRout(app)
htmlRout(app)



app.listen(PORT, ()=>{
  console.log("Server started on PORT: %s", PORT)
})
