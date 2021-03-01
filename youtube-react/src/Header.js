import React, { useState, useEffect } from "react";
import "./Header.css";
import VideoCallSharpIcon from "@material-ui/icons/VideoCallSharp";
import MenuSharpIcon from "@material-ui/icons/MenuSharp";
import SearchIcon from "@material-ui/icons/Search";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Ayush from "./ayush_pic.jpg";
import { Avatar, Modal, Button, Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { auth, provider, storage } from "./firebase";
import GoogleButton from "react-google-button";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Header() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openLogIn, setOpenLogin] = useState(false);
  const [openSignUp, setSignUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const login = () => {
    handleOpen();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        if (authUser.displayName) {
          //dont update username
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      //Perform some Cleanup actions.
      unsubscribe();
    };
  }, [user, username]);
  //SignUp Function
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        storage
          .ref(`images/${image.name}`)
          .put(image)
          .then(function () {
            console.log("Successfull..");
          });
        return authUser.user.updateProfile({
          displayName: username,
        });
        //Image Function
      })
      .catch((error) => alert(error.message));
    setEmail("");
    setUsername("");
    setPassword("");
    setSignUp(false);
    setOpen(false);
  };
  //Login Function
  const logIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenLogin(false);
    setEmail("");
    setUsername("");
    setPassword("");
    setOpen(false);
  };
  //Logout Function
  const logout = () => {
    auth.signOut();
    setOpen(false);
  };
  //Image Upload Function
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //SignUp with Google
  const signUp_Google = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {})
      .catch((error) => alert(error.message));
  };

  return (
    <div className="header">
      <Modal open={openSignUp} onClose={() => setSignUp(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img
                className="header_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
              ></img>
            </center>

            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h4 className="profile_pic_header">
              Choose a file for profile pic
            </h4>
            <Input onChange={handleChange} type="file" />

            <Button
              type="submit"
              disabled={!email}
              color="primary"
              variant="contained"
              onClick={signUp}
            >
              Sign-Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openLogIn} onClose={() => setOpenLogin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <center>
              <img
                className="header_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
              ></img>
            </center>

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!email}
              color="primary"
              variant="contained"
              onClick={logIn}
            >
              Login
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={open} onClose={handleClose} className="modal">
        <div style={modalStyle} className={classes.paper}>
          {user ? (
            <div>
              <center>
                <img
                  className="header_logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
                ></img>
              </center>
              <center>
                <img src={user.photoURL} style={{ borderRadius: 50 }} />
                <h3 className="user_displayName">{"Want to Logout?"}</h3>
                <Button color="secondary" variant="contained" onClick={logout}>
                  LOGOUT
                </Button>
              </center>
            </div>
          ) : (
            <div className="app_login">
              <Button onClick={() => setOpenLogin(true)} color="primary">
                Login
              </Button>

              <Button onClick={() => setSignUp(true)} color="primary">
                SignUp
              </Button>
              <GoogleButton onClick={signUp_Google} />
            </div>
          )}
        </div>
      </Modal>
      <div className="header_left">
        <MenuSharpIcon />
        <Link to="/">
          <img
            className="header_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="header_input">
        <input
          value={input}
          type="text"
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
        />
        <Link to={`/search/${input}`}>
          <SearchIcon className="header_searchIcon" />
        </Link>
      </div>
      <div className="header_right">
        <VideoCallSharpIcon className="header_icon" />
        <AppsIcon className="header_icon" />
        <NotificationsIcon className="header_icon" />
        {user ? (
          <Avatar src={user.photoURL} onClick={login} className="avatar_logo" />
        ) : (
          <Avatar src="" onClick={login} className="avatar_logo" />
        )}
      </div>
    </div>
  );
}

export default Header;
