const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Add a power
router.post("/api/power", async(req, res) => {
    const {power_id, power_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, focus_cost} = req.body;
 
    try {
       const newPower = await db.query(
          "INSERT INTO powers (power_id, power_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, focus_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
          [power_id, power_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, focus_cost]);
          res.json(newPower.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get all powers
 router.get("/api/power/all", async(req, res) => {
    try {
       const allPowers = await db.query(
          "SELECT * FROM powers"
       );
       res.json(allPowers.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get specific abiities
 router.get("/api/power", async(req, res) =>{
    try {
       const {power_name} = req.body;
       const power = await db.query("SELECT * FROM powers WHERE power_name = $1", [power_name])
       res.json(power.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Search powers //TODO ADD MODULARITY FOR SEARCHING FOR POWERS/FEATS TOO SINCE THIS WILL FUNCTION FOR ALL
 router.get("/api/power/search", async(req, res) =>{   
    const {power_id, power_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, focus_cost} = req.body;
    let parameters = [power_id, power_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, focus_cost];
    let query = 'SELECT * FROM powers WHERE ';
 
    //Filer out all empty strings, 0, false and undefined in array
    parameters = parameters.filter(e => e);
    
    //Get all the parameter names from request
    let keys = Object.keys(req.body);
 
    //For each parameter add them to query
    for (let i = 0; i < parameters.length; i++){
       //check if parameter is an array to get tags, etc. and add them to query
       if(keys[i] === "tags" || keys[i] === "attribute" || keys[i] === "character_choice" || keys[i] === "trait"){
          query += `${keys[i]} @> '{${parameters[i]}}'`;
 
       }
       //Add straight forward text
       else{
          query += `${keys[i]} = '${parameters[i]}'`;
       }      
 
       if(i+1 < parameters.length){
          //Add AND to query
          query += ` AND `;
       }
    }
 
    try {
       const power = await db.query(query)
       res.json(power.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Update a power
 router.put('/api/power', async (req, res) => {
    const {power_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, power_id, focus_cost} = req.body;
    const values = [power_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, power_id, focus_cost];
    const query = `UPDATE powers SET power_name = $1, description = $2, tags = $3, attribute = $4, character_choice = $5, trait = $6, damage = $7, damage_type = $8, range = $9, duration = $10, action_type = $11, action_cost = $12, focus_cost = $13 WHERE power_id = $13 RETURNING *;`; 
    
    try {
      const updatePower = await db.query(query, values);
      res.json(updatePower.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
    }
  });
 
 //Delete a power
 router.delete("/api/power", async(req, res) =>{
    try {
       const {power_id} = req.body;
       const result = await db.query("DELETE FROM powers WHERE power_id = $1 RETURNING *", [power_id])
       res.json(result.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })

 module.exports = router;