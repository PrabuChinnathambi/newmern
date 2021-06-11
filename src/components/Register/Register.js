import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [open, setOpen] = React.useState(false);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignup = () => {

    if(email === ""){
      setEmailError("Email ID is Required")
      toast("Email ID is Required")
    }
    if(fullname === ""){
      setFullnameError("Your User Name is Required")
      toast("Your User Name is Required")
    }
    if(password === ""){
      setPasswordError("Password is Required")
      toast("Password is Required")
    }

    if(email !== "" & password !== "" & fullname !== ""){

      const payloads = {
        email: email,
        fullname: fullname,
        password: password
      }

      Axios.post('https://instagramtrends.herokuapp.com/register', payloads)
        .then((response) => {
          console.log(response.data);
          setOpen(false);
        })
    }

  }


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To share your Trendings to this website, please enter the below fields here.
          </DialogContentText>
          <TextField
            
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            helperText = {emailError}
            onChange={e => setEmail(e.target.value)}

            fullWidth
          />
          <TextField

            margin="dense"
            id="name"
            label="User Name"
            type="name"
            helperText = {fullnameError}
            onChange={e => setFullname(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            helperText = {passwordError}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignup} color="primary">
            Sign Up
          </Button>
          <ToastContainer />
        </DialogActions>
      </Dialog>
    </div>
  );
}
