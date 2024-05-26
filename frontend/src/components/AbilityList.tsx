import React, {useEffect, useState} from "react";
import "./AbilityList.css";

interface Ability {
    ability_id: string;
    ability_name: string;
    description: string;
    tags: string[];
    attribute: string[];
    character_choice: string[];
    trait: string[];
    damage: string;
    damage_type: string;
    range: string;
    duration: string;
    action_type: string;
    action_cost: number;
}

const AbilityList = () => {
    const[abilities, setAbilities] = useState<Ability[]>([]);

    const getAbilities = async() => {
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

    return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Attribute</th>
              <th>Character</th>
              <th>Traits</th>
              <th>Damage</th>
              <th>Damage Type</th>
              <th>Range</th>
              <th>Duration</th>
              <th>Action Type</th>
              <th>Action Cost</th>
            </tr>
          </thead>
          <tbody>
            {abilities.map(ability => (
              <tr key={ability.ability_id}>
                <td>{ability.description}</td>
                <td>{ability.tags.join(', ')}</td>
                <td>{ability.attribute.join(', ')}</td>
                <td>{ability.character_choice.join(', ')}</td>
                <td>{ability.trait.join(', ')}</td>
                <td>{ability.damage}</td>
                <td>{ability.damage_type}</td>
                <td>{ability.range}</td>
                <td>{ability.duration}</td>
                <td>{ability.action_type}</td>
                <td>{ability.action_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
}

export default AbilityList;