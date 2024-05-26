import React, { useState, useEffect } from 'react';
import AbilityList from "./components/AbilityList.tsx";
import AddAbility from "./components/AddAbility.tsx";

/*
  TODO
  - Add routing to other pages
  - Add Powers
  - Add Masteries
  - Add Feats
*/

const App = () => {
    const [abilities, setAbilities] = useState([]);

    const getAbilities = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/ability/all");
            const jsonData = await response.json();
            setAbilities(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAbilities();
    }, []);

    const handleNewAbility = () => {
        getAbilities();
    };

    const handleDelete = async (ability_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ability/${ability_id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                getAbilities();
            } else {
                console.error("Error deleting ability:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting ability:", error);
        }
    };

    const handleEdit = async (updatedAbility) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ability/${updatedAbility.ability_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAbility)
            });
            if (response.ok) {
                getAbilities();
            } else {
                console.error("Error editing ability:", response.statusText);
            }
        } catch (error) {
            console.error("Error editing ability:", error);
        }
    };

    return (
        <div>
            <h1>Abilities</h1>
            <AddAbility onNewAbility={handleNewAbility} />
            <AbilityList abilities={abilities} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );
}

export default App;