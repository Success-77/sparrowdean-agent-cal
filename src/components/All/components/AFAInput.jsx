import React from "react";
import "./AFAInput.css";

const AFAInput = ({
  inputValue,
  handleInputChange,
  handleInputBlur,
  inputError,
}) => {
  return (
    <div className="input-sales">
      <p className="small-text guide">
        Enter the total number of registrations
      </p>
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          id="floatingInput"
          placeholder="10"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <label htmlFor="floatingInput">AFA Registrations</label>
      </div>
      {inputError && <p className="error guide">{inputError}</p>}
    </div>
  );
};

export default AFAInput;
