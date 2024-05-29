const express = require("express");
const cors = require("cors");
const abilityAPI = require('./API/abilities.js');
const powerAPI = require('./API/powers.js');
const masteryAPI = require('./API/mastery.js')
const featAPI = require('./API/feat.js');
const traitAPI = require('./API/trait.js');

require('dotenv').config();

const PORT = process.env.PORT;

//MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());

//ROUTES
//ABILITY//
app.use(abilityAPI);

//POWER//
app.use(powerAPI)
//MASTERY//
app.use(masteryAPI)
//FEATS//
app.use(featAPI)
//TRAITS//
app.use(traitAPI)
//Server start
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
 });

 //Say hello
 app.get("/", (req, res) => {
   res.json({ message: "Welcome, friend." });
 });