import React, { useState } from 'react';
import {Button, Grid, Container, TextField, IconButton} from "@mui/material";
import MultiText from './MultiText'
import FormString from './FormString'
import Cheked from './Cheked'
import FormNumber from './ForrmNumber'

function SaveForm({savedForm }) {
    const [title, setTitle] = useState("");
    const [titleHeader, setTitleHeader] = useState("");

    const renderComponent = (element) => {
        switch (element.type) {
            case "multiText":
                return <MultiText key={element.id} data={element} />;
            case "formString":
                return <FormString key={element.id} data={element} />;
            case "checked":
                return <Cheked key={element.id} data={element} />;
            case "formNumber":
                return <FormNumber key={element.id} data={element} />;
            default:
                return null; 
        }
    };
    
    return (
        <div className='saveForm' style={{ display: savedForm?.save ? "flex" : "none" }}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="off"
                value={savedForm?.title || ""} 
                onChange={(e) => setTitleHeader(e.target.value)}
            />
            <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                name="title"
                autoComplete="off"
                value={savedForm?.ask || ""} 
                onChange={(e) => setTitle(e.target.value)}
            />
    {       savedForm?.elements?.map((element) => renderComponent(element))}
        </div>
        
);
}

export default SaveForm
