import React, { useEffect, useState } from "react";
import TraitList from "../components/trait/TraitList.tsx";
import AddTrait from "../components/trait/AddTrait.tsx";

const Trait = () => {
    const [traits, setTraits] = useState([]);

    const getTraits = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/trait/all");
            const jsonData = await response.json();
            setTraits(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getTraits();
    }, []);

    const handleNewTrait = () => {
        getTraits();
    };

    const handleDelete = async (trait_id) => {
      try {
          const response = await fetch(`http://localhost:5000/api/trait/`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ trait_id })
          });
          if (response.ok) {
              getTraits();
          } else {
              console.error("Error deleting trait:", response.statusText);
          }
      } catch (error) {
          console.error("Error deleting trait:", error);
      }
  };
  
    return (
        <>
            <h1>Traits</h1>
            <AddTrait onNewTrait={handleNewTrait} />
            <TraitList traits={traits} onDelete={handleDelete} /> 
        </>
        
    )
};
  
  export default Trait;