import React, { useEffect, useState } from "react";
import useFetchForm from "../Hook/useForm";
import { Button, CircularProgress, Alert, TextField } from "@mui/material";
import NewForm from '../Components/NewForm'
import { Link, useNavigate } from "react-router-dom";
import Links from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CloseIcon from "@mui/icons-material/Close";




function MyForm() {
  const { forms, loadingTitle, errorTitle, getFormById } = useFetchForm();
  const currentUserId = localStorage.getItem("currentUserId");
  const [openMyForm, setOpenMyForm] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    localStorage.setItem("isMyFormPageOpen", "1");
    console.log("isMyFormPageOpen set to 1");
  }, []);

  if (loadingTitle) return <CircularProgress color="primary" />;
  if (errorTitle) return <Alert severity="error">{errorTitle}</Alert>;

  const openNewForm = (id) => {
    if (!currentUserId) {
      setAlertMessage("Register, please!");
      return;
    }
    setSelectedFormId(id);
    setOpenMyForm(true);
    navigate(`/form/${id}`);
  };

 


  
  return (
    <div className="myForm">
      <div className="answerHeader"> 
        <Button variant="outlined" disabled={!currentUserId} color="primary" endIcon={<ControlPointIcon />} onClick={() => setOpenMyForm(true)}>
          Create a form
        </Button>
        <Button variant="outlined" startIcon={<HomeIcon />}  >
          <Links component={Link} to="/" variant="body2">
            Home
          </Links>
        </Button>
      </div>

        {openMyForm && (
        <div className="newForm">
          <div className="closeForm">
            <Button onClick={() => setOpenMyForm(false)} >
              <CloseIcon  color="primary" />
            </Button>
          </div>
          <NewForm formId={selectedFormId} />
        </div>
        )}
        {openMyForm || (<div className="storeFormHeader" 
        disabled={!loadingTitle && setOpenMyForm === 'false'} 
        style={{ display: "flex" 
        }} >
          <h1>My Forms</h1>
        <div className="storeFormMain">
        {forms
        .filter((form) => form.userId === Number(currentUserId)) 
        .map((form) =>
          currentUserId ? ( 
            <div key={form.id} className='saveTitle' onClick={() => openNewForm(form.id)}>
              <p>{form.user.username}</p>
              <h1>{form.title}</h1>
              <p>{form.descriptions}</p>
            </div>
          ) : null
          )}
        </div>
      </div>)}
    </div>
  );
}
export default MyForm
