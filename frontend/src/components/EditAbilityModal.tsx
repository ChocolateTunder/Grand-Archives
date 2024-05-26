import React, { useState } from 'react';
import './EditAbilityModal.css';

const EditAbilityModal = ({ isOpen, onClose, ability, onSubmit }) => {
    const [formData, setFormData] = useState(ability);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };
    
    //if (!isOpen) return null;

    return (
        <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ability_name">Ability Name</label>
              <input
              type="text"
              id="ability_name"
              name="ability_name"
              value={formData.ability_name}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <textarea
              id="tags"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="attribute">Attribute</label>
            <textarea
              id="attribute"
              name="attribute"
              value={formData.attribute.join(', ')}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="character_choice">Discipline/Affinity/Calling</label>
            <textarea
              id="character_choice"
              name="character_choice"
              value={formData.character_choice.join(', ')}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="trait">Traits</label>
            <textarea
              id="trait"
              name="trait"
              value={formData.trait.join(', ')}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="damage">Damage</label>
            <textarea
              id="damage"
              name="damage"
              value={formData.damage}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="damage">Damage</label>
            <textarea
              id="damage"
              name="damage"
              value={formData.damage}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="damage_type">Damage Type</label>
            <textarea
              id="damage_type"
              name="damage_type"
              value={formData.damage_type}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="range">Range/AoE</label>
            <textarea
              id="range"
              name="range"
              value={formData.range}
              onChange={handleChange}
              required
            />

            </div>
            <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <textarea
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="action_type">Action Type</label>
            <textarea
              id="action_type"
              name="action_type"
              value={formData.action_type}
              onChange={handleChange}
              required
            />
            </div>
            <div className="form-group">
            <label htmlFor="action_cost">Action Cost</label>
            <textarea
              id="action_cost"
              name="action_cost"
              value={formData.action_cost}
              onChange={handleChange}
              required
            />
            </div>
            <div className="button-group">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save
            </button>
            </div>
        </form>
      </div>
    </div>
    );
};
export default EditAbilityModal;