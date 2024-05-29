import React, { useEffect, useState } from "react";
import AddPower from "../components/power/AddPower.tsx";
import PowerList from "../components/power/PowerList.tsx";

const Ability = () => {
    const [powers, setPowers] = useState([]);

    const getPowers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/power/all");
            const jsonData = await response.json();
            setPowers(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getPowers();
    }, []);

    const handleNewPower = () => {
        getPowers();
    };

    const handleDelete = async (power_id) => {
      try {
          const response = await fetch(`http://localhost:5000/api/power/`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ power_id })
          });
          if (response.ok) {
              getPowers();
          } else {
              console.error("Error deleting power:", response.statusText);
          }
      } catch (error) {
          console.error("Error deleting power:", error);
      }
  };
  
    return (
        <>
            <h1>Powers</h1>
            <AddPower onNewPower={handleNewPower} />
            <PowerList powers={powers} onDelete={handleDelete} /> 
        </>
        
    )
};
  
  export default Ability;