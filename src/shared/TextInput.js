import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ id, label, name, onChange, value }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

TextInput;
