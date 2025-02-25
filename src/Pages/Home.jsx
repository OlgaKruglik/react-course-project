import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import NewForm from "../Components/NewForm";
import useFetchForm from "../Hook/useForm"
import { Button, CircularProgress, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { styled } from "@mui/material/styles";
import { API_BASE_URL } from "../config";
import "../Style/pagesStyle.css";

const ButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: theme.spacing(3),
  gap: "1ch",
  "@media (max-width: 465px)": {
    flexDirection: "column",
  },
}));

const FormStyled = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  paddingRight: "5ch"
}));

function Home() {
  const currentUserId = localStorage.getItem('currentUserId');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMyForm, setOpenMyForm] = useState(false);
  const { forms, loadingTitle, errorTitle, getFormById } = useFetchForm();
  const [isRegisteredUser, setIsRegisteredUser] = useState(!!currentUserId);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  localStorage.removeItem("isMyFormPageOpen");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
          withCredentials: true, 
        });

        if (response.headers["content-type"]?.includes("application/json")) {
          setUsers(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Ошибка при загрузке пользователей");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loadingTitle) return <div style={{marginTop: '10ch',
      textAlign: 'center'}}> <CircularProgress color="success"/> 
      </div>;
    if (error) return <div>Error: {error}</div>;

  const handleClose = () => {
    setOpen(false);
    setSelectedFormId(null);
    navigate('/');

  };
  const handleExit = () => {
    localStorage.removeItem('currentUserId');
    setIsRegisteredUser(false);
  }
  const openMyForms = () => {
    if (!isRegisteredUser) {
      setAlertMessage("Please sign in to view your forms.");
      return;
    }
    navigate(`/myforms/`);
  };

  const openNewForm = (id) => {
    if (!isRegisteredUser) {
      setAlertMessage("Register, please!");
      return;
    }
    setSelectedFormId(id);
    setOpen(true);
    navigate(`/form/${id}`);
  };

  return (
    <div>
      <ButtonWrapper>
        <Button variant="outlined" disabled={!isRegisteredUser}  color="primary" endIcon={<ListIcon />} onClick={openMyForms}>
          My forms
        </Button>

        <Button variant="outlined" color="primary" endIcon={<SendIcon />} component={RouterLink} to="/login"
          sx={{display: isRegisteredUser ? 'none':null}}
        >
          Sign In
        </Button>

        <Button variant="outlined" disabled={!isRegisteredUser} color="primary" endIcon={<QuestionAnswerIcon />} component={RouterLink} to="/answers"
        >
          Answers
        </Button>
        <Button>
          <ExitToAppIcon onClick={handleExit} color="primary" />
        </Button>
      </ButtonWrapper>
      {alertMessage && (
        <Alert
          variant="filled"
          severity="info"
          onClose={() => setAlertMessage("")} 
          sx={{ zIndex: "2", marginBottom: "1rem" }}
        >
          {alertMessage}
        </Alert>
      )}
      {open  && (<div className="newForm" style={{ display: "flex" }}>
        <div className="formlist">
          <FormStyled>
            <Button>
              <CloseIcon onClick={handleClose} color="primary" />
            </Button>
          </FormStyled>
          <NewForm formId={selectedFormId} />
        </div>
      </div>)}
      {open || (<div className="storeFormHeader" 
        disabled={!loadingTitle && setOpen === 'false'} 
        style={{ display: "flex" 
        }} > 
        <h1>All Forms</h1>
        <div className="storeFormMain">
        {!openMyForm ? (      
          forms.map((form) => (
            <div key={form.id} className='saveTitle' onClick={() => openNewForm(form.id)}>
              <h1>{form.title}</h1>
              <p>Autor: {form.user.username}</p>
              <p>{form.descriptions}</p>
            </div>
          ))
        ) : null
      } </div>
      </div>)}
    </div>
  );
}

export default Home;
