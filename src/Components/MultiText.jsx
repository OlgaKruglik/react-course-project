import React, { useState } from 'react';
import {Grid, TextField, IconButton} from "@mui/material";

function MultiText() {
    const [answer, setAnswer] = useState("");
    return (
        <div className='multiText'>
        <TextField
            id="answer"
            multiline
            rows={4}
            value={answer}
            variant="standard" sx = {{width: '100%'}}
            onChange={(e) => setAnswer(e.target.value)}
        />
        </div>
    )
}

export default MultiText
