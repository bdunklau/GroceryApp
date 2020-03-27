
const express = require('express')
const groceryService  = require('./services/groceryService')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))


app.post('/api/addGrocery', function (req, res) {
  let groceryServiceObj = new groceryService(req, res)
  groceryServiceObj.getGrocery()
})

app.get('/api/getGrocery', function (req, res) {
  let groceryServiceObj = new groceryService(req, res)
  groceryServiceObj.addGrocery()
})

app.listen(3000, function () {
  console.log('Grocery Web app service listening on port 3000!')
})
