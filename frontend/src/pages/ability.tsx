import React, { useEffect, useState } from "react";
import AbilityList from "../components/ability/AbilityList.tsx";
import AddAbility from "../components/ability/AddAbility.tsx";

const Ability = () => {
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
          const response = await fetch(`http://localhost:5000/api/ability/`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ ability_id })
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
  
    return (
        <>
            <h1>Abilities</h1>
            <AddAbility onNewAbility={handleNewAbility} />
            <AbilityList abilities={abilities} onDelete={handleDelete} /> 
        </>
        
    )
};
  
  export default Ability;