import React, { useState } from "react";
import './AddAbility.css';

const AddAbility = ({ onNewAbility }) => {
    const [abilityData, setAbilityData] = useState({
        ability_name: "",
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
        ability_id: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedAbilityData = {
            ability_name: formData.get("ability_name"),
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
            ability_id: formData.get("ability_name")?.toString().toLowerCase().replace(/\s/g, '')
        };
        setAbilityData(updatedAbilityData);
        console.log(JSON.stringify(updatedAbilityData));
        
        try {
            const response = await fetch("http://localhost:5000/api/ability", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(updatedAbilityData)});

            if (response.ok) {
                // Ability created successfully, perform any necessary actions (e.g., display a success message)
                onNewAbility();
            } else {
                // Ability creation failed, handle error (e.g., display an error message)
            }
            } catch (error) {
                console.error("Error creating ability:", error);
                // Handle error (e.g., display an error message)
            }
    };

    return (
        <div>
            <form id="abilityForm" className="form" onSubmit={handleSubmit}>
                <div className="rowNbutton">
                    <div className="input-row">
                        <input type="text" placeholder="Ability Name" name="ability_name" required />
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
                    </div>
                    <button className="button" type="submit">Submit</button>
                </div>
                <textarea placeholder="Description" name="description" className="description-input" required />
            </form>
        </div>
    );
};

export default AddAbility;