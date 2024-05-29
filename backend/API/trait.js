const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Add a trait
router.post("/api/trait", async(req, res) => {
    const {trait_id, trait_name, description, ancestry, story, character_choice} = req.body;
 
    try {
       const newTrait = await db.query(
          "INSERT INTO traits (trait_id, trait_name, description, ancestry, story, character_choice) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [trait_id, trait_name, description, ancestry, story, character_choice]);
          res.json(newTrait.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get all traits
 router.get("/api/trait/all", async(req, res) => {
    try {
       const allTraits = await db.query(
          "SELECT * FROM traits"
       );
       res.json(allTraits.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get specific abiities
 router.get("/api/trait", async(req, res) =>{
    try {
       const {trait_name} = req.body;
       const trait = await db.query("SELECT * FROM traits WHERE trait_name = $1", [trait_name])
       res.json(trait.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Search traits //TODO ADD MODULARITY FOR SEARCHING FOR POWERS/FEATS TOO SINCE THIS WILL FUNCTION FOR ALL
 router.get("/api/trait/search", async(req, res) =>{   
    const {trait_id, trait_name, description, ancestry, story, character_choice} = req.body;
    let parameters = [trait_id, trait_name, description, ancestry, story, character_choice];
    let query = 'SELECT * FROM traits WHERE ';
 
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
       const trait = await db.query(query)
       res.json(trait.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Update a trait
 router.put('/api/trait', async (req, res) => {
    const {trait_id, trait_name, description, ancestry, story, character_choice} = req.body;
    const values = [trait_id, trait_name, description, ancestry, story, character_choice];
    const query = `UPDATE traits SET trait_name = $1, description = $2, ancestry = $3, story = $4, character_choice = $5 WHERE trait_id = $13 RETURNING *;`; 
    
    try {
      const updateTrait = await db.query(query, values);
      res.json(updateTrait.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
    }
  });
 
 //Delete a trait
 router.delete("/api/trait", async(req, res) =>{
    try {
       const {trait_id} = req.body;
       const result = await db.query("DELETE FROM traits WHERE trait_id = $1 RETURNING *", [trait_id])
       res.json(result.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })

 module.exports = router;