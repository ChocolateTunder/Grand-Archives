import React, { useEffect, useState } from "react";
import './AbilityList.css';

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
    const [abilities, setAbilities] = useState<Ability[]>([]);
    const [sortBy, setSortBy] = useState<string>("ability_name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const getAbilities = async () => {
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

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    const sortedAbilities = abilities.sort((a, b) => {
        const aValue = sortBy === "action_cost" ? a[sortBy] : a[sortBy].toLowerCase();
        const bValue = sortBy === "action_cost" ? b[sortBy] : b[sortBy].toLowerCase();
        
        if (sortBy === "action_cost") {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else {
            return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => handleSort("ability_name")}>Name</th>
                    <th>Description</th>
                    <th>Tags</th>
                    <th>Attribute</th>
                    <th>Character</th>
                    <th>Traits</th>
                    <th onClick={() => handleSort("damage")}>Damage</th>
                    <th onClick={() => handleSort("damage_type")}>Damage Type</th>
                    <th onClick={() => handleSort("range")}>Range</th>
                    <th onClick={() => handleSort("duration")}>Duration</th>
                    <th onClick={() => handleSort("action_type")}>Action Type</th>
                    <th onClick={() => handleSort("action_cost")}>Action Cost</th>
                </tr>
            </thead>
            <tbody>
                {sortedAbilities.map(ability => (
                    <tr key={ability.ability_id}>
                        <td>{ability.ability_name}</td>
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