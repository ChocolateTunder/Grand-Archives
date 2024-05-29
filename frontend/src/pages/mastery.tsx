import React, { useEffect, useState } from "react";
import MasteryList from "../components/mastery/MasteryList.tsx";
import AddMastery from "../components/mastery/AddMastery.tsx";

const Mastery = () => {
    const [masteries, setMasteries] = useState([]);

    const getMasteries = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/mastery/all");
            const jsonData = await response.json();
            setMasteries(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getMasteries();
    }, []);

    const handleNewMastery = () => {
        getMasteries();
    };

    const handleDelete = async (mastery_id) => {
      try {
          const response = await fetch(`http://localhost:5000/api/mastery/`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ mastery_id })
          });
          if (response.ok) {
              getMasteries();
          } else {
              console.error("Error deleting mastery:", response.statusText);
          }
      } catch (error) {
          console.error("Error deleting mastery:", error);
      }
  };
  
    return (
        <>
            <h1>Masteries</h1>
            <AddMastery onNewMastery={handleNewMastery} />
            <MasteryList masteries={masteries} onDelete={handleDelete} /> 
        </>
        
    )
};
  
  export default Mastery;