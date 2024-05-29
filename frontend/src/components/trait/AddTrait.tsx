import React, { useState } from "react";
import './AddTrait.css';

const AddTrait = ({ onNewTrait }) => {
    const [traitData, setTraitData] = useState({
        trait_name: "",
        description: "",
        tags: "",
        attribute: "",
        character_choice: "",
        trait_id: ""
    });

    /*
        TODO check trait name to see if it'll make unique id    
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedTraitData = {
            trait_name: formData.get("trait_name"),
            description: formData.get("description"),
            tags: formData.get("tags").split(',').map(tag => tag.trim()),
            attribute: formData.get("attribute").split(',').map(attr => attr.trim()),
            character_choice: formData.get("character_choice").split(',').map(choice => choice.trim()),
            trait_id: formData.get("trait_name")?.toString().toLowerCase().replace(/\s/g, '')
        };
        setTraitData(updatedTraitData);
        //console.log(JSON.stringify(updatedTraitData));
        
        try {
            const response = await fetch("http://localhost:5000/api/trait", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(updatedTraitData)});

            if (response.ok) {
                // Trait created successfully, perform any necessary actions (e.g., display a success message)
                onNewTrait();
            } else {
                // Trait creation failed, handle error (e.g., display an error message)
            }
            } catch (error) {
                console.error("Error creating trait:", error);
                // Handle error (e.g., display an error message)
            }
    };

    return (
        <div>
            <form id="traitForm" className="form" onSubmit={handleSubmit}>
                <div className="rowNbutton">
                    <div className="input-row">
                        <input type="text" placeholder="Trait Name" name="trait_name" required />
                        <input type="text" placeholder="Tags" name="tags" required />
                        <input type="text" placeholder="Attribute Requirement" name="attribute" required />
                        <input type="text" placeholder="Discipline/Affinity/Calling" name="character_choice" required />
                    </div>
                    <button className="button" type="submit">Submit</button>
                </div>
                <textarea placeholder="Description" name="description" className="description-input" required />
            </form>
        </div>
    );
};

export default AddTrait;