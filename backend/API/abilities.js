const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Add an ability
router.post("/api/ability", async(req, res) => {
    const {ability_id, ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost} = req.body;
 
    try {
       const newAbility = await db.query(
          "INSERT INTO abilities (ability_id, ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
          [ability_id, ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost]);
          res.json(newAbility.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get all abilities
 router.get("/api/ability/all", async(req, res) => {
    try {
       const allAbilities = await db.query(
          "SELECT * FROM abilities"
       );
       res.json(allAbilities.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get specific abiities
 router.get("/api/ability", async(req, res) =>{
    try {
       const {ability_name} = req.body;
       const ability = await db.query("SELECT * FROM abilities WHERE ability_name = $1", [ability_name])
       res.json(ability.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Search abilities //TODO ADD MODULARITY FOR SEARCHING FOR POWERS/FEATS TOO SINCE THIS WILL FUNCTION FOR ALL
 router.get("/api/ability/search", async(req, res) =>{   
    const {ability_id, ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost} = req.body;
    let parameters = [ability_id, ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost];
    let query = 'SELECT * FROM abilities WHERE ';
 
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
       const ability = await db.query(query)
       res.json(ability.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Update an ability
 router.put('/api/ability', async (req, res) => {
    const {ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, ability_id} = req.body;
    const values = [ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost, ability_id];
    const query = `UPDATE abilities SET ability_name = $1, description = $2, tags = $3, attribute = $4, character_choice = $5, trait = $6, damage = $7, damage_type = $8, range = $9, duration = $10, action_type = $11, action_cost = $12 WHERE ability_id = $13 RETURNING *;`; 
    
    try {
      const updateAbility = await db.query(query, values);
      res.json(updateAbility.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
    }
  });
 
 //Delete an ability
 router.delete("/api/ability", async(req, res) =>{
    try {
       const {ability_id} = req.body;
       const result = await db.query("DELETE FROM abilities WHERE ability_id = $1 RETURNING *", [ability_id])
       res.json(result.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })

 module.exports = router;