import React, { useState } from 'react';
import EditAbilityModal from './EditAbilityModal.tsx';
import "./AddAbility.css";

const AbilityList = ({ abilities, onDelete, onEdit }) => {
    const [selectedAbility, setSelectedAbility] = useState(null);

    const handleEditClick = (ability) => {
        setSelectedAbility(ability);
    };

    const handleModalClose = () => {
        setSelectedAbility(null);
    };

    return (
        <div>
            <table>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {abilities.map(ability => (
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
                            <td>
                                <button onClick={() => handleEditClick(ability)}>Edit</button>
                                <button onClick={() => onDelete(ability.ability_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedAbility && (
                <EditAbilityModal
                    ability={selectedAbility}
                    onClose={handleModalClose}
                    onEdit={onEdit}
                />
            )}
        </div>
    );
};

export default AbilityList;
