import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import NewForm from "../Components/NewForm";
import useUser from "../Hook/useUser"
import useFetchForm from "../Hook/useForm"
import { Button, CircularProgress, Alert, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Help from "@mui/icons-material/Help"
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
  },
}));

const FormStyled = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  paddingRight: "5ch"
}));
const Overlay = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
}));

const Modal = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: "8px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

function Home() {
  const currentUserId = localStorage.getItem('currentUserId');
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMyForm, setOpenMyForm] = useState(false);
  const { forms, loadingTitle, errorTitle, getFormById } = useFetchForm();
  const {users, refetchUsers: fetchUsers, findUserByEmail} = useUser();
  const [isRegisteredUser, setIsRegisteredUser] = useState(!!currentUserId);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [ticketUrl, setTicketUrl] = useState("");
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [openTicketForm, setOpenTicketForm] = useState(false);

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

  const handleSubmitTicket = async () => {
    setLoadingTicket(true);
    try {
      const response = await axios.post("https://course-project-jddk.vercel.app/api/jira/create-ticket", {
        summary,
        priority,
        link: window.location.href,
        template: "Survey Template",
        userEmail: "olyakrug88@gmail.com",
      });
      setTicketUrl(response.data.jiraTicketUrl);
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoadingTicket(false);
    }
  };

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
        <Button variant="outlined" color="primary" endIcon={<Help />} onClick={() => setOpenTicketForm(true)}>
        Help
      </Button>
      {openTicketForm && (
        <Overlay onClick={() => setOpenTicketForm(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h2>Create Support Ticket</h2>
            <TextField
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter issue summary"
              label="Summary"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitTicket}
              disabled={loadingTicket}
              endIcon={loadingTicket ? <CircularProgress size={24} /> : <SendIcon />}
            >
              Submit
            </Button>
            {ticketUrl && (
              <p>
                Ticket created: <a href={ticketUrl} target="_blank" rel="noopener noreferrer">{ticketUrl}</a>
              </p>
            )}
          </Modal>
        </Overlay>
      )}

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
