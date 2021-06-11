import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router";
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/action/current_user_action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login(props) {
  const dispatch = useDispatch()
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userData, setUserData] = useState([]);
  // const notify = () => toast("You are successfully logged in");


  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleLogin = () => {

    if (userName === "") {
      setEmailError("Email ID is Required")
      toast("Email ID is Required")
    }

    if (password === "") {
      setPasswordError("Password is Required")
      toast("Password is Required")
    }

    if (userName !== "" & password !== "") {
      localStorage.setItem('username', userName);
      const payloads = {
        fullname: userName,
        password: password
      }

      Axios.post('https://instagramtrends.herokuapp.com/login', payloads)
        .then((data) => {
          setOpen(false);
          history.push('/home');
          dispatch(setCurrentUser(userName));
        }).catch((error) => {
          toast(error.response.data)
        })

    }

  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Log In
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="email"
            helperText={emailError}
            onChange={e => setUserName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Password"
            type="password"
            helperText={passwordError}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            log in
          </Button>
          <ToastContainer />
        </DialogActions>
      </Dialog>
    </div>
  );
}
