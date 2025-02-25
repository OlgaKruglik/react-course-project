import React, { useState, useEffect } from "react";
import MultiText from "./MultiText";
import FormString from "./FormString";
import Cheked from "./Cheked";
import axios from "axios";
import FormNumber from "./ForrmNumber";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchForm from '../Hook/useForm'
import { API_BASE_URL } from "../config";
import CloseIcon from "@mui/icons-material/Close";
import OutboxIcon from '@mui/icons-material/Outbox';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";



import "../Style/pagesStyle.css";

function NewForm() {
  const initQuestion = () => ({ type: "formString", id: Date.now(), options: [{ id: 1, checked: false, answer: "" }] });
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([initQuestion()]);
  const [discription, setDiscription] = useState("");
  const [message, setMessage] = useState('');
  const { forms, loadingTitle, errorTitle, getFormById } = useFetchForm();
  const navigate = useNavigate();
  const { formId } = useParams();
  const myForrm = localStorage.getItem('isMyFormPageOpen');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 10000);
      return () => clearTimeout(timer); 
    }
  }, [message]);


  useEffect(() => {
    if (forms.length > 0 && formId) {
      const form = getFormById(formId);
      if (form) {
        setTitle(form.title || "");
        setDiscription(form.descriptions || "");
        setQuestions(form.questions || [initQuestion()]);
      } else {
        console.error("Form not found for ID:", formId);
      }
    }
  }, [formId, forms]);

  if (loadingTitle) return <div style={{marginTop: '10ch',
      textAlign: 'center'}}> <CircularProgress color="success"/> 
      </div>;

  const outRezult = (str) => {
    setMessage(str); 
    console.log("Message set:", str);
  };

  const handleClose = () => {
    if (myForrm == 1) {
      navigate('/myforms');
      localStorage.removeItem("isMyFormPageOpen");
    } else {
      navigate('/');
    }
  };

  const addNewQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, initQuestion()]);
  };

  const typeComponent = {
    formString: FormString,
    multiText: MultiText,
    checked: Cheked,
    formNumber: FormNumber,
  };
  const removeComponent = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((item) => item.id !== id));
  }



  const updateQuestion = (id, newAttributes) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              ...newAttributes,
              options:
                newAttributes.type === "checked" && !question.options
                  ? [{ id: 1, checked: '', answer: "" }]
                  : question.options,
            }
          : question
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const currentUserId = localStorage.getItem("currentUserId");
      navigate('/myforms')
      if (!currentUserId) {
        outRezult("The user is not logged in.");
        return;
      }
  
      const formData = {
        title,
        description: discription,
        questions,
        userId: currentUserId, 
      };
  
      const response = await axios.post(`${API_BASE_URL}/forms`, formData, {
        withCredentials: true,
      });
  
      if (response.status === 201) {
        outRezult("The form has been created successfully!");
        setTitle("");
        setDiscription("");
        setQuestions([initQuestion()]);
        setTimeout(() => navigate('/myforms'), 2000);
      }
    } catch (error) {
      console.error("Form creation error:", error);
      outRezult("Form creation error");
    }
  };

  const handleSubmitAnswer = async () => {
    try {
      const currentUserId = localStorage.getItem("currentUserId");
      
      if (!currentUserId) {
        outRezult("The user is not logged in.");
        return;
      }
  
      const answers = questions.map((question) => {
        let answerValue = "";
        if (["formString", "multiText", "formNumber"].includes(question.type)) {
          answerValue = question.answer || "";
        } else if (question.type === "checked") {
          console.log(answerValue);
          const checkedOptions = question.answer?.filter(option => option.checked === "true");
            answerValue = checkedOptions.length > 0 ? "true" : "false";
        }
        return {
          questionId: question.id,
          answer: answerValue,
        };
      });
  
      const formData = {
        formId,
        title,
        description: discription,
        answers,
        userId: currentUserId,
      };      
  
      const response = await axios.post(`${API_BASE_URL}/answers`, formData, {
        withCredentials: true,
      });
  
      if (response.status === 201) {
        outRezult("Answers have been successfully submitted!");
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      outRezult(error.response?.data?.message || "Error submitting answers.");
    }
  };
  


  

  return (
    <div className="formAdd">
        <div className="titleForm">
          <div className="headerForm">
            <div className="formlist" 
            style={{ display: !formId ? 'none': null}}
            >
              <Button>
                <CloseIcon onClick={handleClose} color="primary" 
                />
              </Button>
            </div>
            <TextField
              sx={{ padding: "10px" }}
              variant="outlined"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              sx={{ padding: "10px" }}
              variant="outlined"
              required
              fullWidth
              id="discription"
              label="discription"
              name="discription"
              autoComplete="off"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </div>
          {questions.map((question) => {
            const TypeComponent = typeComponent[question.type];

            return (
              <div className="formMain" key={question.id}>
                <div className="main">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="ask"
                        label="ask"
                        name="ask"
                        autoComplete="off"
                        value={question.title}
                        onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  <div className="main-center" style={{ display: formId ? 'none':null}}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120, margin: "0"}}>
                      <InputLabel id="demo-simple-select-label"></InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={question.type}
                        label="Select Element"
                        onChange={(e) => updateQuestion(question.id, { type: e.target.value })}
                      >
                        <MenuItem value={"formString"}>Text</MenuItem>
                        <MenuItem value={"multiText"}>Multitext</MenuItem>
                        <MenuItem value={"checked"}>Checked</MenuItem>
                        <MenuItem value={"formNumber"}>Number</MenuItem>
                      </Select>
                    </FormControl>
                    <div>
                      <Button onClick={() => removeComponent(question.id)}>
                        <DeleteIcon color="primary" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="formStrings">
                <TypeComponent
                  value={question.answer || ""}
                  onChange={(newValue) => updateQuestion(question.id, { answer: newValue })}
                />
                </div>
              </div>
            );
          })}
          
          

          {!formId ? (
            <Button
              onClick={handleSubmit}
              sx={{
                marginBottom: '4ch',
                color: '#8bc34a',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                ':hover': {
                  backgroundColor: '#a2cf6e',
                  color: '#618833',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <SaveAltIcon color="green" /> Save
            </Button>
          ) : 
          <Button onClick={handleSubmitAnswer}>
            <OutboxIcon color="primary" /> Send 
          </Button>}

        </div>
        <div className="questionButton" style={{ display: formId ? 'none':null}}>
          <Button onClick={addNewQuestion} sx={{marginBottom: '4ch'}}>
              <AddCommentIcon color="primary" /> 
          </Button>
        </div>

        
    </div>
  );
}

export default NewForm;



