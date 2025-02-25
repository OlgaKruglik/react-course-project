import React, { useState } from 'react';
import {Checkbox, TextField} from "@mui/material";

function Cheked({ options = [], onChange }) {
  const [localOptions, setLocalOptions] = useState(
    options.length ? options : [{ id: Date.now(), checked: 'false' }]
  );
  
  const handleCheckboxChange = (id) => {
    const updatedOptions = localOptions.map((option) =>
      option.id === id
        ? { ...option, checked: option.checked === 'true' ? 'false' : 'true' }
        : option
    );

    setLocalOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const handleTextChange = (id, value) => {
    const updatedOptions = localOptions.map((option) =>
      option.id === id ? { ...option, answer: value } : option
    );

    setLocalOptions(updatedOptions);
    onChange(updatedOptions);
  };
  

    return (
        <div className="cheked">
      {localOptions.map((option) => (
      <div key={option.id} className="chekedInput">
        <Checkbox
          checked={option.checked === 'true'}
          onChange={() => handleCheckboxChange(option.id)}
          inputProps={{ "aria-label": "controlled" }}
        />
          <TextField
            variant="standard"
            required
            fullWidth
            id={`answer-${option.id}`}
            name={`answer-${option.id}`}
            autoComplete="off"
            value={option.checked === 'true' ? 'yes' : 'no'}
            onChange={(e) => handleTextChange(option.id, e.target.value)}
          />
        </div>
      ))}
    </div>
    );
}

export default Cheked







