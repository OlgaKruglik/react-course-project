import React, { useState, useContext } from 'react';
import {Button, Grid, Container, TextField, IconButton} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useFetchForm from "../Hook/useForm"
import MultiText from '../Components/MultiText'
import FormString from '../Components/FormString'
import Cheked from '../Components/Cheked'
import FormNumber from '../Components/ForrmNumber'
import HomeIcon from "@mui/icons-material/Home";
import Links from "@mui/material/Link";
import "../Style/pagesStyle.css";

function SaveForm() {
    const [title, setTitle] = useState("");
    const [titleHeader, setTitleHeader] = useState("");
    const { forms, loading, error, getFormById } = useFetchForm();
    const navigate = useNavigate();

    const hahdleNavigate = () => {
        navigate('/')
    }
    const store = localStorage.getItem("currentUserId")

    const typeComponentMap = {
        formString: FormString,
        multiText: MultiText,
        checked: Cheked,
        formNumber: FormNumber,
      };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!Array.isArray(forms)) {
        console.error('Forms is not an array:', forms);
        return <div>Error: Invalid forms data</div>;
    }
    
    return (
        <div className="storeFormHeader" disabled={!loading} >
            <div>
                <Button variant="outlined" startIcon={<HomeIcon />} onClick={hahdleNavigate}>
                        Home
                </Button>
            </div>
         <div className="storeForm">
            {forms.map((form) =>
            form.userId == store ? (
                <div key={form.id} className='saveTitle'>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id={`form-title-${form.id}`}
                    label="Title"
                    name="title"
                    autoComplete="off"
                    value={form.title}
                    onChange={(e) => setTitle(e.form.title.value)}
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id={`form-description-${form.id}`}
                    label="Description"
                    name="description"
                    autoComplete="off"
                    value={form.descriptions}
                    onChange={(e) => setTitleHeader(e.form.descriptions.value)}
                />
    
                {Array.isArray(form.questions) &&
                    form.questions.map((q) => {
                    const QuestionComponent = typeComponentMap[q.type] || null;
                    return (
                        <div key={q.id} className='saveQuestion'>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id={`question-title-${q.id}`}
                            label="Question Title"
                            name={`question-title-${q.id}`}
                            autoComplete="off"
                            value={q.title}
                        />
                        {QuestionComponent ? (
                            <QuestionComponent question={q} />
                        ) : (
                            <p>Unknown question type: {q.type}</p>
                        )}
                        </div>
                    );
                    })}
                </div>
            ) : null
            )}
        </div>
      </div>
    );
  }

export default SaveForm
