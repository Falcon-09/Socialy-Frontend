import React, { useState,useEffect } from "react";
import "./Auth.css";
import Logo from "../../img/logo.svg";
import { logIn, signUp } from "../../actions/AuthActions.js";
import {UserRoute} from '../../Routes/UserRoutes'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { ResendOtpRoute } from "../../Routes/VerifyRoute";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    dragabble: true,
    theme: 'dark'
  }
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const ok = useSelector((state) => state.authReducer.authData,shallowEqual);
  const [data, setData] = useState(initialState);
  

  const [confirmPass, setConfirmPass] = useState(true);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };
  

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      handleValidation()?dispatch(signUp(data,navigate)):setConfirmPass(false)
      // data.password === data.confirmpass
      //   ? dispatch(signUp(data, navigate))
      //   : setConfirmPass(false);
    } else {
      const ok = await axios.post(UserRoute,{
        username: data.username
      })
     
      if(ok.data.verified){
        toast.success("Welcome Back!",toastOptions)
        setTimeout(() => {
          dispatch(logIn(data,navigate))
        }, 2000);
      }else{
        const getData = await axios.post(UserRoute,{
          username: data.username
        })
        const user = getData.data
        await axios.post(ResendOtpRoute,{
          userId: user._id,
          username: data.username
        })
        setTimeout(() => {
          toast.error("Please Verify Your Email",toastOptions)
        }, 500);
        navigate("../verify", { replace: true });
      }
    }
  };

  const handleValidation = () =>{
    const {username,password,confirmpass} = data
    if(password!==confirmpass) {
      toast.error("Passwords do not match",
      toastOptions
      )

      return false;
    }else if(username===""){
      toast.error(
        "Email is required",
        toastOptions
      )

      return false;
    }else if(!username.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      toast.error(
        "Please enter a valid email address",
        toastOptions
      )
      return false;
    }

    return true;
  }

  return (
    <>
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>Socialy</h1>
          <h6>Connect with people throughout the world</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Email"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          {/* <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span> */}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Auth;