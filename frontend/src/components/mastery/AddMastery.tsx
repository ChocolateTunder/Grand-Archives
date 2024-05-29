import React, { useState } from "react";
import './AddMastery.css';

const AddMastery = ({ onNewMastery }) => {
    const [masteryData, setMasteryData] = useState({
        mastery_name: "",
        description: "",
        attribute: "",
        character_choice: "",
        trait: "",
        mastery_id: ""
    });

    /*
        TODO check mastery name to see if it'll make unique id    
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedMasteryData = {
            mastery_name: formData.get("mastery_name"),
            description: formData.get("description"),
            attribute: formData.get("attribute").split(',').map(attr => attr.trim()),
            character_choice: formData.get("character_choice").split(',').map(choice => choice.trim()),
            trait: formData.get("trait").split(',').map(trait => trait.trim()),
            mastery_id: formData.get("mastery_name")?.toString().toLowerCase().replace(/\s/g, '')
        };
        setMasteryData(updatedMasteryData);
        //console.log(JSON.stringify(updatedMasteryData));
        
        try {
            const response = await fetch("http://localhost:5000/api/mastery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(updatedMasteryData)});

            if (response.ok) {
                // Mastery created successfully, perform any necessary actions (e.g., display a success message)
                onNewMastery();
            } else {
                // Mastery creation failed, handle error (e.g., display an error message)
            }
            } catch (error) {
                console.error("Error creating mastery:", error);
                // Handle error (e.g., display an error message)
            }
    };

    return (
        <div>
            <form id="masteryForm" className="form" onSubmit={handleSubmit}>
                <div className="rowNbutton">
                    <div className="input-row">
                        <input type="text" placeholder="Mastery Name" name="mastery_name" required />
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

export default AddMastery;