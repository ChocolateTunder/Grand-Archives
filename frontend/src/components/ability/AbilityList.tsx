import React, { useEffect, useState } from "react";
import './AbilityList.css'; // Ensure this path is correct

const AbilityList = ({ onDelete, abilities  }) => {
    const [sortBy, setSortBy] = useState<string>("ability_name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    // const sortedAbilities = abilities.sort((a, b) => {
    //     const aValue = sortBy === "action_cost" ? a[sortBy] : a[sortBy].toLowerCase();
    //     const bValue = sortBy === "action_cost" ? b[sortBy] : b[sortBy].toLowerCase();

    //     if (sortBy === "action_cost") {
    //         return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    //     } else {
    //         return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    //     }
    // });

  return (
    <table className="ability-table">
      <thead>
        <tr>
        <th onClick={() => handleSort("ability_name")}>Name</th>
        <th >Description</th>
        <th >Tags</th>
        <th >Attribute</th>
        <th >Character</th>
        <th >Traits</th>
        <th onClick={() => handleSort("damage")}>Damage</th>
        <th onClick={() => handleSort("damage_type")}>Damage Type</th>
        <th onClick={() => handleSort("range")}>Range</th>
        <th onClick={() => handleSort("duration")}>Duration</th>
        <th onClick={() => handleSort("action_type")}>Action Type</th>
        <th onClick={() => handleSort("action_cost")}>Action Cost</th>
        </tr>
      </thead>
      <tbody>
        {abilities.map((ability) => (
          <tr key={ability.ability_id}>
            <td>{ability.ability_name}</td>
            <td>{ability.description}</td>
            <td>{ability.tags.join(", ")}</td>
            <td>{ability.attribute.join(", ")}</td>
            <td>{ability.character_choice.join(", ")}</td>
            <td>{ability.trait.join(", ")}</td>
            <td>{ability.damage}</td>
            <td>{ability.damage_type}</td>
            <td>{ability.range}</td>
            <td>{ability.duration}</td>
            <td>{ability.action_type}</td>
            <td>{ability.action_cost}</td>
            <td>
              {/* <button onClick={() => onEdit(ability)}>Edit</button> */}
              <button onClick={() => onDelete(ability.ability_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AbilityList;
