import React, { useState } from 'react';
import {Checkbox, TextField} from "@mui/material";

function Cheked() {
    const [options, setOptions] = useState([
        { id: 1, checked: false, answer: "" },
    ]);
    const handleCheckboxChange = (id) => {
        setOptions(options.map(option => 
            option.id === id ? { ...option, checked: !option.checked } : option
        ));
    };

    const handleTextChange = (id, value) => {
        setOptions(options.map(option => 
            option.id === id ? { ...option, answer: value } : option
        ));
    };

    return (
        <div className='cheked'>
            {options.map(option => (
                <div key={option.id} className='chekedInput'>
                    <Checkbox
                        checked={option.checked}
                        onChange={() => handleCheckboxChange(option.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        id={`answer-${option.id}`}
                        label="answer"
                        name={`answer-${option.id}`}
                        autoComplete="off"
                        value={option.answer}
                        onChange={(e) => handleTextChange(option.id, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

export default Cheked
