import React, { useState } from 'react';
import {TextField} from "@mui/material";

function ForrmNumber() {
    const [title, setTitle] = useState ("")
    return (
        <div> 
            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
                onChange={(e) => setTitle(e.target.value)}
                sx="width: 100%"
            />
        </div>
    )
}

export default ForrmNumber
