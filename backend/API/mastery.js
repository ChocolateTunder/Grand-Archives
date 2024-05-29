const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Add a mastery
router.post("/api/mastery", async(req, res) => {
    const {mastery_id, mastery_name, description, attribute, character_choice, trait} = req.body;
 
    try {
       const newMastery = await db.query(
          "INSERT INTO masterys (mastery_id, mastery_name, description, attribute, character_choice, trait) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [mastery_id, mastery_name, description, attribute, character_choice, trait]);
          res.json(newMastery.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get all masterys
 router.get("/api/mastery/all", async(req, res) => {
    try {
       const allMasterys = await db.query(
          "SELECT * FROM masterys"
       );
       res.json(allMasterys.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get specific abiities
 router.get("/api/mastery", async(req, res) =>{
    try {
       const {mastery_name} = req.body;
       const mastery = await db.query("SELECT * FROM masterys WHERE mastery_name = $1", [mastery_name])
       res.json(mastery.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Search masterys //TODO ADD MODULARITY FOR SEARCHING FOR POWERS/FEATS TOO SINCE THIS WILL FUNCTION FOR ALL
 router.get("/api/mastery/search", async(req, res) =>{   
    const {mastery_id, mastery_name, description, attribute, character_choice, trait} = req.body;
    let parameters = [mastery_id, mastery_name, description, attribute, character_choice, trait];
    let query = 'SELECT * FROM masterys WHERE ';
 
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
       const mastery = await db.query(query)
       res.json(mastery.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Update a mastery
 router.put('/api/mastery', async (req, res) => {
    const {mastery_name, description, attribute, character_choice, trait} = req.body;
    const values = [mastery_name, description, attribute, character_choice, trait];
    const query = `UPDATE masterys SET mastery_name = $1, description = $2, attribute = $3, character_choice = $4, trait = $5WHERE mastery_id = $13 RETURNING *;`; 
    
    try {
      const updateMastery = await db.query(query, values);
      res.json(updateMastery.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
    }
  });
 
 //Delete a mastery
 router.delete("/api/mastery", async(req, res) =>{
    try {
       const {mastery_id} = req.body;
       const result = await db.query("DELETE FROM masterys WHERE mastery_id = $1 RETURNING *", [mastery_id])
       res.json(result.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })

 module.exports = router;