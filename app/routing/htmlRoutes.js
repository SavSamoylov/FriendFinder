const path = require("path")

module.exports = function(app){

// Survey
app.get("/Survey", (req, res)=>{
  res.sendFile(path.join(__dirname, "../public/survey.html"))
})

// If no matching path is found use home.html
app.use((req, res)=>{
  res.sendFile(path.join(__dirname, "../public/home.html"))
})


}
