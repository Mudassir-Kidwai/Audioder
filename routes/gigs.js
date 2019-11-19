const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../model/Gigs')

router.get('/gigs', (req, res) => res.send("FIRST PAGE"))
router.get('/gigs2', (req, res) => res.send("SECOND PAGE"))

module.exports =   router;


/*
router.get('/gigs', (req, res, next) => 
Gig.findAll()
.then(gigs => {
    console.log(gigs);
    res.sendStatus(200);
})
.catch(err => console.log(err) )
);
*/
