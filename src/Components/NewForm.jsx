import React, { useState, useEffect } from "react";
import MultiText from "./MultiText";
import FormString from "./FormString";
import Cheked from "./Cheked";
import axios from "axios";
import FormNumber from "./ForrmNumber";
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchUsers from '../Hook/useUser'
import { API_BASE_URL } from "../config";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";

import "../Style/pagesStyle.css";

function NewForm() {
  const initQuestion = () => ({ type: "formString", id: Date.now() });
  const [open, setOpen] = useState();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([initQuestion()]);
  const [selectedElement, setSelectedElement] = useState({
    id: Date.now(),
    type: "formString",
    value: "",
  });
  const [discription, setDiscription] = useState("");
  const { users, loading, error: fetchError, refetchUsers } = useFetchUsers();

  const addNewQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, initQuestion()]);
  };

  const typeComponent = {
    formString: FormString,
    multiText: MultiText,
    checked: Cheked,
    formNumber: FormNumber,
  };
  console.log(users);
  const removeComponent = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((item) => item.id !== id));
  }



  const updateQuestion = (id, newAttributes) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => (question.id === id ? { ...question, ...newAttributes } : question))
    );
  };

  const handleSubmit = async () => {
    try {
      const formData = { title, description: discription, questions };
      const response = await axios.post(`${API_BASE_URL}/forms`, formData, { withCredentials: true });

      if (response.status === 201) {
        alert("Форма успешно создана!");
        setTitle("");
        setDiscription("");
        setQuestions([initQuestion()]);
      }
    } catch (error) {
      console.error("Ошибка создания формы:", error);
      alert("Ошибка создания формы");
    }
  };

  return (
    <div className="formAdd">
          <div className="titleForm">
          <div className="headerForm">
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Отправить форму
          </Button>
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

                  <div className="main-center">
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120, margin: "0" }}>
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
                  <TypeComponent />
                </div>
              </div>
            );
          })}
        </div>
        <Button onClick={addNewQuestion} sx={{marginBottom: '8ch'}}>
            <AddCommentIcon color="primary" />
        </Button>
    </div>
  );
}

export default NewForm;
