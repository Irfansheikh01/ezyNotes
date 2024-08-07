import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import './CSS/LoginSignupBg.css';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // set loading true so that spinner will show loading spinner
    const response = await fetch(`https://mern-api-backend-rho.vercel.app/api/auth/loginUser`, {
    // const response = await fetch(`http://localhost:5000/api/auth/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    setLoading(false); // set loading false after it fetches the data
    // console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("success", "Logged in successfully!");
      navigate("/home");
    } else {
      // alert("Invalid credentials!!");
      props.showAlert("danger", json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [eye, setEye] = useState("fa-eye-slash");
  const passShow = (e) => {
    e.preventDefault();
    var x = document.getElementById("password");
    if (x.type === "text") {
      x.type = "password";
      setEye("fa-eye-slash");
    } else if (x.type === "password") {
      x.type = "text";
      setEye("fa-eye");
    }
  };

  return (
    <div className="login-signup-bg">
      <div className="container my-2 p-4  text-center">
        <h2 className="my-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={onChange}
              value={credentials.email}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3 input-group relative d-flex align-items-center">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={credentials.password}
              onChange={onChange}
            />
            <div
              className="input-group-addon"
              onClick={passShow}
              style={{ position: "absolute", right: "15px", color:'black', zIndex:'10' }}
            >
              <i className={`fa ${eye} m-2`} aria-hidden="true"></i>
            </div>
          </div>
          {loading && <Spinner />}
         {!loading && <>
          <button type="submit" className="btn btn-dark border">
            Log In
          </button>
           </>}
        </form>
      </div>
    </div>
  );
};

export default Login;
