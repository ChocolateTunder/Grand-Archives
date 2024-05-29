import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ability from './pages/ability.tsx';
import Power from './pages/power.tsx'
import Feat from './pages/feat.tsx'
import Trait from "./pages/trait.tsx";
import Mastery from "./pages/mastery.tsx";

/*
  TODO
  - Add routing to other pages
  - Add search
  - Add edit
  - Add Powers
  - Add Masteries
  - Add Feats
  - Add character fucntionality
  - Add DB password to env file
*/

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/ability" element={<Ability />} />
            <Route path="/power" element={<Power />} />
            <Route path='/feat' element={<Feat />} />
            <Route path='/mastery' element={<Mastery />} />
            <Route path='/trait' element={<Trait />} />
            {/* <Route path="/add" element={<AddAbility onNewAbility={handleNewAbility} />} /> */}
            </Routes>
        </Router>
    );
};
export default App;