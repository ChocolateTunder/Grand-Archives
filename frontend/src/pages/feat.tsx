import React, { useEffect, useState } from "react";
import FeatList from "../components/feat/FeatList.tsx";
import AddFeat from "../components/feat/AddFeat.tsx";

const Feat = () => {
    const [feats, setFeats] = useState([]);

    const getFeats = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/feat/all");
            const jsonData = await response.json();
            setFeats(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getFeats();
    }, []);

    const handleNewFeat = () => {
        getFeats();
    };

    const handleDelete = async (feat_id) => {
      try {
          const response = await fetch(`http://localhost:5000/api/feat/`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ feat_id })
          });
          if (response.ok) {
              getFeats();
          } else {
              console.error("Error deleting feat:", response.statusText);
          }
      } catch (error) {
          console.error("Error deleting feat:", error);
      }
  };
  
    return (
        <>
            <h1>Feats</h1>
            <AddFeat onNewFeat={handleNewFeat} />
            <FeatList feats={feats} onDelete={handleDelete} /> 
        </>
        
    )
};
  
  export default Feat;