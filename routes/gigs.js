const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
var cors= require('cors');
const db = require('../config/database');
const Gig = require('../model/Gigs');

//router.get('/convertToaudio', (req, res) => res.send("FIRST PAGE"))\
//router.get('/gigs2', (req, res) => res.send("SECOND PAGE"))

app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  
  app.use(bodyParser.json())
  
  app.get("/test", (req,res)=>{
      return res.json({
          message: "hello",
      })
  })
  app.post('/convertToaudio', (req, res) => {
      let test=req.body;
    console.log(test);
    return res.json({
        message: "hello",
    })
  })

module.exports =   router;
