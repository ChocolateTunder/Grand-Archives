const express = require("express");
const cors = require("cors");
const db = require("./db/knex_db");
const { Query } = require("pg");

const PORT = process.env.PORT || 5000;

//MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());

//ROUTES
//ABILITY//
// Function to parse comma-separated values into arrays
const parseArrayFields = (queryParams, arrayFields) => {
   arrayFields.forEach(field => {
      if (queryParams[field]) {
         queryParams[field] = queryParams[field].split(',').map(item => item.trim());
      }});
 };

//Add an ability
app.post("/api/ability/new", async(req, res) => {
   const {ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost} = req.body;

   try {
      const ability = await db("abilities").insert(
         {ability_name, description, tags, attribute, character_choice, trait, damage, damage_type, range, duration, action_type, action_cost});
         res.status(201).send(ability);
   } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
   }
})

//Get all abilities
app.get("/api/ability", async(req, res) => {
   try {
      const allAbilities = await db.select("*").from("abilities");
      res.json(allAbilities);
   } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
   }
})

//Get specific abiities
app.get('/api/ability/search', async (req, res) => {
   try {
      const queryParams = req.query;
      const query = db('abilities');
  
      // Array fields in the abilities table
      const arrayFields = ['tags', 'attribute', 'character_choice', 'trait'];
  
      // Parse array fields
      parseArrayFields(queryParams, arrayFields);
  
      Object.keys(queryParams).forEach((key) => {
         const value = queryParams[key];

         if (Array.isArray(value) && value.length > 0) {
            //query.where(key, '@>', value); // Using PostgreSQL array containment operator
            //query.where(key, '=', value);
            query.whereRaw(`"${key}" @> ?`, [value[0]]);
         } else if (value) {
            query.where(key, value);
         }
      });
      
      const sql = query.toSQL().toNative();
      console.log('Generated SQL query:', sql.sql);
      console.log('Bindings:', sql.bindings);

      const results = await query;
      res.json(results);
      } catch (error) {
         console.error('Error executing query', error);
         res.status(500).send('Server Error');
      }
 });

//Update an ability
app.put("api/ability/update", async (req, res) => {
   try {
      
   } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server Error');
   }
})
//Delete an ability


//Server start
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
 });

 //Say hello
 app.get("/", (req, res) => {
   res.json({ message: "Welcome, friend." });
 });