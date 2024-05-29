import React, { useState } from "react";
import './AddPower.css';

const AddPower = ({ onNewPower }) => {
    const [powerData, setPowerData] = useState({
        power_name: "",
        description: "",
        tags: "",
        attribute: "",
        character_choice: "",
        trait: "",
        damage: "",
        damage_type: "",
        range: "",
        duration: "",
        action_type: "",
        action_cost: 0,
        focus_cost: 0,
        power_id: ""
    });

    /*
        TODO check power name to see if it'll make unique id    
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedPowerData = {
            power_name: formData.get("power_name"),
            description: formData.get("description"),
            tags: formData.get("tags").split(',').map(tag => tag.trim()),
            attribute: formData.get("attribute").split(',').map(attr => attr.trim()),
            character_choice: formData.get("character_choice").split(',').map(choice => choice.trim()),
            trait: formData.get("trait").split(',').map(trait => trait.trim()),
            damage: formData.get("damage"),
            damage_type: formData.get("damage_type"),
            range: formData.get("range"),
            duration: formData.get("duration"),
            action_type: formData.get("action_type"),
            action_cost: parseInt(formData.get("action_cost"), 10),
            focus_cost: parseInt(formData.get("focus_cost"), 10),
            power_id: formData.get("power_name")?.toString().toLowerCase().replace(/\s/g, '')
        };
        setPowerData(updatedPowerData);
        
        try {
            const response = await fetch("http://localhost:5000/api/power", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(updatedPowerData)});

            if (response.ok) {
                // Power created successfully, perform any necessary actions (e.g., display a success message)
                onNewPower();
            } else {
                // Power creation failed, handle error (e.g., display an error message)
            }
            } catch (error) {
                console.error("Error creating power:", error);
                // Handle error (e.g., display an error message)
            }
    };

    return (
        <div>
            <form id="powerForm" className="form" onSubmit={handleSubmit}>
                <div className="rowNbutton">
                    <div className="input-row">
                        <input type="text" placeholder="Power Name" name="power_name" required />
                        <input type="text" placeholder="Tags" name="tags" required />
                        <input type="text" placeholder="Attribute Requirement" name="attribute" required />
                        <input type="text" placeholder="Discipline/Affinity/Calling" name="character_choice" required />
                        <input type="text" placeholder="Trait Requirement" name="trait" required />
                        <input type="text" placeholder="Damage" name="damage" required />
                        <input type="text" placeholder="Damage Type" name="damage_type" required />
                        <input type="text" placeholder="Range/AoE" name="range" required />
                        <input type="text" placeholder="Duration" name="duration" required />
                        <input type="text" placeholder="Type of Action" name="action_type" required />
                        <input type="number" placeholder="Action Point Cost" name="action_cost" required />
                        <input type="number" placeholder="Focus Point Cost" name="focus_cost" required />
                    </div>
                    <button className="button" type="submit">Submit</button>
                </div>
                <textarea placeholder="Description" name="description" className="description-input" required />
            </form>
        </div>
    );
};

export default AddPower;