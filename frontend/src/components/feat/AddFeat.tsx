import React, { useState } from "react";
import './AddFeat.css';

const AddFeat = ({ onNewFeat }) => {
    const [featData, setFeatData] = useState({
        feat_name: "",
        description: "",
        attribute: "",
        character_choice: "",
        trait: "",
        feat_id: ""
    });

    /*
        TODO check feat name to see if it'll make unique id    
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedFeatData = {
            feat_name: formData.get("feat_name"),
            description: formData.get("description"),
            attribute: formData.get("attribute").split(',').map(attr => attr.trim()),
            character_choice: formData.get("character_choice").split(',').map(choice => choice.trim()),
            trait: formData.get("trait").split(',').map(trait => trait.trim()),
            feat_id: formData.get("feat_name")?.toString().toLowerCase().replace(/\s/g, '')
        };
        setFeatData(updatedFeatData);
        //console.log(JSON.stringify(updatedFeatData));
        
        try {
            const response = await fetch("http://localhost:5000/api/feat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(updatedFeatData)});

            if (response.ok) {
                // feat created successfully, perform any necessary actions (e.g., display a success message)
                onNewFeat();
            } else {
                // feat creation failed, handle error (e.g., display an error message)
            }
            } catch (error) {
                console.error("Error creating feat:", error);
                // Handle error (e.g., display an error message)
            }
    };

    return (
        <div>
            <form id="featForm" className="form" onSubmit={handleSubmit}>
                <div className="rowNbutton">
                    <div className="input-row">
                        <input type="text" placeholder="Feat Name" name="feat_name" required />
                        <input type="text" placeholder="Attribute Requirement" name="attribute" required />
                        <input type="text" placeholder="Discipline/Affinity/Calling" name="character_choice" required />
                        <input type="text" placeholder="Trait Requirement" name="trait" required />
                    </div>
                    <button className="button" type="submit">Submit</button>
                </div>
                <textarea placeholder="Description" name="description" className="description-input" required />
            </form>
        </div>
    );
};

export default AddFeat;