import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Alert } from "@mui/material";
import Links from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { API_BASE_URL, API_BASE_URLODOO, apiToken } from "../config";
import useFetchForm from "../Hook/useForm";

function Answer() {
  const { forms, loadingTitle, errorTitle, getFormById } = useFetchForm();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  const [errorAnswers, setErrorAnswers] = useState(null);
  const [open, setOpen] = useState(false);
  const currentUserId = localStorage.getItem("currentUserId");
  const navigate = useNavigate();

  const answerForm = async (formId) => {
    setOpen(true);
    setLoadingAnswers(true);
    try {
      const answersResponse = await axios.get(`${API_BASE_URL}/answers?formId=${formId}`);
      setSelectedAnswers(answersResponse.data); 
    } catch (error) {
      console.error("Ошибка загрузки ответов:", error);
      setErrorAnswers("Ошибка загрузки ответов");
    } finally {
      setLoadingAnswers(false);
    }
    navigate(`/answer/${formId}`);
  };

  const createSurveyInOdoo = async (form, answers) => {
    console.log(form, answers);
    try {
      const response = await axios.post(`${API_BASE_URLODOO}`, {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "survey.survey",
          method: "create",
          args: [{
            title: form.title,
            description: form.descriptions,
            answers: answers
          }],
          kwargs: {}
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${apiToken}`
        }
      });
  
      console.log("Odoo response:", response.data); // Выводим полный ответ от Odoo
  
      if (response.data.result) {
        console.log("Survey created in Odoo:", response.data.result);
        return response.data.result;
      } else {
        console.log("Error in Odoo response:", response.data.error); // Если ошибка в ответе
      }
    } catch (err) {
      console.error('Error creating survey in Odoo:', err);
    }
  };
  const handleCreateSurvey = (formId) => {
    console.log(formId);
    const form = getFormById(formId); // Get form by its ID
    if (form) {
      createSurveyInOdoo(form, selectedAnswers); // Send form and answers to Odoo
    }
  };

  if (loadingTitle) {
    return (
      <div style={{ marginTop: "10ch", textAlign: "center" }}>
        <CircularProgress color="success" />
      </div>
    );
  }

  if (errorTitle) return <Alert severity="error">Ошибка: {errorTitle}</Alert>;

  return (
    <div className="myFormAnswer">
      <div className="answerHeader">
        <Button variant="outlined" onClick={() => setOpen(false)} 
          sx={{ width: "30%", display: !open ? 'none' : null }}>
          Back to the list of forms
        </Button>
        <Button variant="outlined" startIcon={<HomeIcon />} 
          sx={{ width: "20%" }}>
          <Links component={Link} to="/" variant="body2">
            Home
          </Links>
        </Button>
      </div>

      {!open ? (
        <div className="storeFormHeader" style={{ display: "flex" }}>
          <h1>My Forms</h1>
          <div className="storeFormMain">
            {forms
            .filter((form) => form.userId === Number(currentUserId))
            .map((form) => (
              <div
                key={form.id}
                className="saveTitle"
                onClick={() => answerForm(form.id)} 
              >
                <p>{form.user?.username}</p>
                <h1>{form.title}</h1>
                <p>{form.descriptions}</p>
                <div>
                  <Button variant="outlined" color="primary" onClick={() => handleCreateSurvey(form.id)}>
                  Send to Odoo
                </Button></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="answerUsers">
          <h2>User Responses</h2>
          {loadingAnswers && <CircularProgress color="success" />}
          {errorAnswers && <Alert severity="error">{errorAnswers}</Alert>}
          {!loadingAnswers && selectedAnswers.length > 0 && (
            <ul>
              {selectedAnswers.map((answer) => (
                <li key={answer.id}>
                  <strong>Username: {answer.user?.username || "Unknown"}</strong>
                  <br />
                  <strong>{answer.question?.title}:</strong> {answer.question?.type === "checked" 
                  ? (answer.answer === "true" ? "Yes" : "No") : answer.answer}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Answer;
