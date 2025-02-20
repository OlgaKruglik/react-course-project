import React, { useState } from 'react';
import {TextField} from "@mui/material";

function ForrmNumber({ value, onChange }) {
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
                value={value}
                onChange={(e) => onChange(e.target.value)}
                sx="width: 100%"
            />
        </div>
    )
}

export default ForrmNumber
