import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import NewForm from "../Components/NewForm";
import useFetchForm from "../Hook/useForm"
import { Button, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useFetchUsers from '../Hook/useUser'
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { styled } from "@mui/material/styles";
import { API_BASE_URL } from "../config";
import "../Style/pagesStyle.css";

const ButtonWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: theme.spacing(3),
}));

const FormStyled = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const { forms, loadingTitle, errorTitle, getFormById } = useFetchForm();
  const [isRegisteredUser, setIsRegisteredUser] = useState(Boolean(localStorage.getItem('currentUserId')));
  const [selectedFormId, setSelectedFormId] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
          withCredentials: true, // 🔹 Важно для CORS
        });

        console.log("API Response:", response.data);

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
      textAlign: 'center'}}> <CircularProgress color="success"/> </div>;
    if (error) return <div>Error: {error}</div>;

  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedFormId(null);

  };
  const handleExit = () => {
    localStorage.removeItem('currentUserId');
    setIsRegisteredUser(false);
  }

  const openNewForm = (id) => {
    setSelectedFormId(id); 
    setOpen(true); 
  };

  return (
    <div>
      <ButtonWrapper>
      <Button variant="outlined" disabled={!isRegisteredUser}  color="primary" endIcon={<ControlPointIcon />} onClick={handleOpen}>
          Create a form
        </Button>

        <Button variant="outlined" color="primary" endIcon={<SendIcon />} component={RouterLink} to="/login"
          sx={{display: isRegisteredUser ? 'none':null}}
        >
          Sign In
        </Button>
        <Button>
          <ExitToAppIcon onClick={handleExit} color="primary" />
        </Button>
      </ButtonWrapper>
      {open && (<div className="newForm" style={{ display: "flex" }}>
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
        {forms.map((form) =>
          form.userId == isRegisteredUser ? ( 
            <div key={form.id} className='saveTitle'
            onClick={() => openNewForm(form.id)}
            >
              <h1>{form.title}</h1>
              <p>{form.descriptions}</p>
            </div>
          ) : null
        )}
      </div>)}
    </div>
  );
}

export default Home;

