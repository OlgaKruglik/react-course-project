import React, { useState } from 'react';
import {Grid, TextField, IconButton} from "@mui/material";


function FormString({ value, onChange }) {

    

    
    return (
        <div>
            <TextField
                variant="standard"
                fullWidth
                label="answer"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            
        </div>
    )
}

export default FormString
