import React, { useEffect, useState } from "react";
import './MasteryList.css'; // Ensure this path is correct

const MasteryList = ({ onDelete, masteries  }) => {
    const [sortBy, setSortBy] = useState<string>("mastery_name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

  return (
    <table className="mastery-table">
      <thead>
        <tr>
        <th onClick={() => handleSort("mastery_name")}>Name</th>
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
        {masteries.map((mastery) => (
          <tr key={mastery.mastery_id}>
            <td>{mastery.mastery_name}</td>
            <td>{mastery.description}</td>
            <td>{mastery.tags.join(", ")}</td>
            <td>{mastery.attribute.join(", ")}</td>
            <td>{mastery.character_choice.join(", ")}</td>
            <td>{mastery.trait.join(", ")}</td>
            <td>
              {/* <button onClick={() => onEdit(mastery)}>Edit</button> */}
              <button onClick={() => onDelete(mastery.mastery_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MasteryList;
