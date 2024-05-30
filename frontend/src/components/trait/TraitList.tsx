import React, { useEffect, useState } from "react";
import '../style.css';

const TraitList = ({ onDelete, traits  }) => {
    const [sortBy, setSortBy] = useState<string>("trait_name");
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
    <table className="content-table">
      <thead>
        <tr>
        <th onClick={() => handleSort("trait_name")}>Name</th>
        <th >Description</th>
        <th >Ancestry</th>
        <th >Character</th>
        <th >Story</th>
        </tr>
      </thead>
      <tbody>
        {traits.map((trait) => (
          <tr key={trait.trait_id}>
            <td>{trait.trait_name}</td>
            <td>{trait.description}</td>
            <td>{trait.ancestry.join(", ")}</td>
            <td>{trait.character_choice.join(", ")}</td>
            <td>{trait.story.join(", ")}</td>
            <td>
              {/* <button onClick={() => onEdit(trait)}>Edit</button> */}
              <button onClick={() => onDelete(trait.trait_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TraitList;
