import React, { useState } from 'react';
import {Grid, TextField, IconButton} from "@mui/material";


function FormString() {
    const [answer, setAnswer] = useState("");
    

    
    return (
        <div>
            <TextField
                    variant="standard"
                    required
                    fullWidth
                    id="answer"
                    label="answer"
                    name="answer"
                    autoComplete="off"
                    value={answer} 
                    onChange={(e) => setAnswer(e.target.value)}
                />
            
        </div>
    )
}

export default FormString
