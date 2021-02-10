'use strict'
const bent = require('bent')
const getJSON = bent('json')
const express = require('express')
const bodyParser = require('body-parser')

// Constants
const PORT = 8081
const HOST = '0.0.0.0'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'))
app.use(express.static(__dirname + '/node_modules/glightbox/dist'))
app.use(express.static(__dirname + '/node_modules/nanogallery2/dist'))
app.use(express.static(__dirname + '/node_modules/jquery/dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  getJSON('http://media-service:8080/media/')
    .then(response => {
      res.render('home', { media: response })
    })
    .catch(error => {
      console.log(error)
      res.render('error')
    })
})

app.get('/top10', (req, res) => {
  getJSON('http://media-service:8080/media/top10')
    .then(response => {
      res.render('home', { media: response })
    })
    .catch(error => {
      console.log(error)
      res.render('error')
    })
})

app.post('/rateMediaById', (req, res) => {
  const post = bent('http://media-service:8080/media/', 'POST', 200)
  post('updateRating?id=' + req.body.id + '&' + 'rating=' + req.body.rating)
    .then(response => {
      response.text().then(text => { console.log(text) })
      res.status(400).end()
    })
    .catch(error => {
      console.log(error)
      res.status(404).end()
    })
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
