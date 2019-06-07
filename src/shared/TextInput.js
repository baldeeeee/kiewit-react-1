import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ id, label, name, onChange, value, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        className="form-control"
        id={id}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

TextInput.PropTypes = {};
