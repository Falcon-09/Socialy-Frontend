import React, {useState,useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import Logo from '../../img/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { VerifyRoute } from "../../Routes/VerifyRoute";
import './Verify.css'
import { UserRoute } from "../../Routes/UserRoutes";

const Verify = () => {
  const initialState = {
    username: "",
    otp: ""
  };

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    dragabble: true,
    theme: 'dark'
  }
  // const user = useSelector((state) => state.authReducer.authData);
  const [data, setData] = useState(initialState);
  
  

  const handleChange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

  const getData = await axios.post(UserRoute,{
    username: data.username
  })

  const user = getData.data

  console.log(user._id)
    
  const chk = await axios.post(VerifyRoute,{
      userId: user._id,
      otp: data.otp
  })
  
    if(!chk.data.verified){
      toast.error("Otp Invalid",toastOptions)
    }else{
      toast.success("Email has been verified",toastOptions)
      setTimeout(() => {
        window.location.href = '/home'
      }, 2000);
    }
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
            <h3>Verify Your Email</h3>
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
                type="text"
                placeholder="Otp"
                className="infoInput"
                name="otp"
                value={data.otp}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <button
                className="button infoButton"
                type="submit"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Verify;
