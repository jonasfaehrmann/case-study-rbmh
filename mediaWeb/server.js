'use strict'
const bent = require('bent')
const getJSON = bent('json')
const express = require('express')

// Constants
const PORT = 8081
const HOST = '0.0.0.0'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'))
app.use(express.static(__dirname + '/node_modules/glightbox/dist'))

app.get('/', (req, res) => {
  // getJSON('http://media-service:8080/media/')
  getJSON('http://localhost:8080/media/')
    .then(response => {
      res.render('home', { media: response })
    })
    .catch(error => {
      console.log(error)
      res.render('error')
    })
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
