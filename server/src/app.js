const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/events');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});

// Fetch all events
app.get('/events', (req, res) => {
  Event.find({}, 'title start allDay', function (error, events) {
    if (error) { console.error(error); }
    res.send({
      events: events
    })
  }).sort({_id:-1})
})

var Event = require("../models/event");

// Add new event
app.post('/events', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var start = req.body.start;
  var allDay= req.body.allDay;
  var new_event = new Event({
    title: title,
    start: start,
    allDay: allDay
  })

  new_event.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Event saved successfully!'
    })
  })
})

app.listen(console.log("Up and Running!") + process.env.PORT || 8081)