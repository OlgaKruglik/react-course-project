import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import NewForm from "../Components/NewForm";
import SaveForm from "../Components/SaveForm";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
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
  const [savedForm, setSavedForm] = useState(null);

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

//   const handleSaveForm = (formData) => {
//     setSavedForm(formData);
//     console.log(formData);
//   };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonWrapper>
        <Button variant="outlined" color="primary" endIcon={<ControlPointIcon />} onClick={handleOpen}>
          Create a form
        </Button>

        <Button variant="outlined" color="primary" endIcon={<SendIcon />} component={RouterLink} to="/login">
          Sign In
        </Button>
      </ButtonWrapper>
      {open && (<div className="newForm" style={{ display: "flex" }}>
        <div className="formlist">
          <FormStyled>
            <Button>
              <CloseIcon onClick={handleClose} color="primary" />
            </Button>
          </FormStyled>
          <NewForm />
        </div>
        {/* <div className="headerForm">
          <SaveForm savedForm={savedForm} />
        </div> */}
      </div>)}
    </div>
  );
}

export default Home;
