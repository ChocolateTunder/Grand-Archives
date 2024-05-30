import React, { useEffect, useState } from "react";
import '../style.css';

const FeatList = ({ onDelete, feats  }) => {
    const [sortBy, setSortBy] = useState<string>("feat_name");
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
        <th onClick={() => handleSort("feat_name")}>Name</th>
        <th >Description</th>
        <th >Attribute</th>
        <th >Character</th>
        <th >Traits</th>
        </tr>
      </thead>
      <tbody>
        {feats.map((feat) => (
          <tr key={feat.feat_id}>
            <td>{feat.feat_name}</td>
            <td>{feat.description}</td>
            <td>{feat.attribute.join(", ")}</td>
            <td>{feat.character_choice.join(", ")}</td>
            <td>{feat.trait.join(", ")}</td>
            <td>
              {/* <button onClick={() => onEdit(feat)}>Edit</button> */}
              <button onClick={() => onDelete(feat.feat_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeatList;
