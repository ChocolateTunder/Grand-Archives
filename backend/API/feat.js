const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Add a feat
router.post("/api/feat", async(req, res) => {
    const {feat_id, feat_name, description, attribute, character_choice, trait} = req.body;
 
    try {
       const newFeat = await db.query(
          "INSERT INTO feats (feat_id, feat_name, description, attribute, character_choice, trait) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [feat_id, feat_name, description, attribute, character_choice, trait]);
          res.json(newFeat.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get all feats
 router.get("/api/feat/all", async(req, res) => {
    try {
       const allFeats = await db.query(
          "SELECT * FROM feats"
       );
       res.json(allFeats.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Get specific abiities
 router.get("/api/feat", async(req, res) =>{
    try {
       const {feat_name} = req.body;
       const feat = await db.query("SELECT * FROM feats WHERE feat_name = $1", [feat_name])
       res.json(feat.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Search feats //TODO ADD MODULARITY FOR SEARCHING FOR POWERS/FEATS TOO SINCE THIS WILL FUNCTION FOR ALL
 router.get("/api/feat/search", async(req, res) =>{   
    const {feat_id, feat_name, description, attribute, character_choice, trait} = req.body;
    let parameters = [feat_id, feat_name, description, attribute, character_choice, trait];
    let query = 'SELECT * FROM feats WHERE ';
 
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
       const feat = await db.query(query)
       res.json(feat.rows);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })
 
 //Update a feat
 router.put('/api/feat', async (req, res) => {
    const {feat_name, description, attribute, character_choice, trait} = req.body;
    const values = [feat_name, description, , attribute, character_choice, trait];
    const query = `UPDATE feats SET feat_name = $1, description = $2, attribute = $3, character_choice = $4, trait = $5 WHERE feat_id = $13 RETURNING *;`; 
    
    try {
      const updateFeat = await db.query(query, values);
      res.json(updateFeat.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
    }
  });
 
 //Delete a feat
 router.delete("/api/feat", async(req, res) =>{
    try {
       const {feat_id} = req.body;
       const result = await db.query("DELETE FROM feats WHERE feat_id = $1 RETURNING *", [feat_id])
       res.json(result.rows[0]);
    } catch (error) {
       console.error('Error executing query', error);
       res.status(500).send('Server Error');
    }
 })

 module.exports = router;