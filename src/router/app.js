var express = require('express')
var app = express()
app.get('/test', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
