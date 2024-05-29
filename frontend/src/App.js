import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ability from './pages/ability.tsx';

/*
  TODO
  - Add routing to other pages
  - Add edit
  - Add Powers
  - Add Masteries
  - Add Feats
  - Add character fucntionality
*/

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/ability" element={<Ability />} />
            {/* <Route path="/add" element={<AddAbility onNewAbility={handleNewAbility} />} /> */}
            </Routes>
        </Router>
    );
};
export default App;