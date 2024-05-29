import React, { useEffect, useState } from "react";
import './PowerList.css'; // Ensure this path is correct

const PowerList = ({ onDelete, powers  }) => {
    const [sortBy, setSortBy] = useState<string>("power_name");
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
    <table className="power-table">
      <thead>
        <tr>
        <th onClick={() => handleSort("power_name")}>Name</th>
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
        <th onClick={() => handleSort("focus_cost")}>Focus Cost</th>
        </tr>
      </thead>
      <tbody>
        {powers.map((power) => (
          <tr key={power.power_id}>
            <td>{power.power_name}</td>
            <td>{power.description}</td>
            <td>{power.tags.join(", ")}</td>
            <td>{power.attribute.join(", ")}</td>
            <td>{power.character_choice.join(", ")}</td>
            <td>{power.trait.join(", ")}</td>
            <td>{power.damage}</td>
            <td>{power.damage_type}</td>
            <td>{power.range}</td>
            <td>{power.duration}</td>
            <td>{power.action_type}</td>
            <td>{power.action_cost}</td>
            <td>{power.focus_cost}</td>
            <td>
              {/* <button onClick={() => onEdit(power)}>Edit</button> */}
              <button onClick={() => onDelete(power.power_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PowerList;
