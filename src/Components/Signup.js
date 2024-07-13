import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { name, email, password, cpassword } = credentials;
    e.preventDefault();
    
    if (password === cpassword) {
      setLoading(true); // set loading true so that spinner will show loading spinner
      const response = await fetch(
        "https://mern-api-backend-rho.vercel.app/api/auth/CreateUser",
        // "http://localhost:5000/api/auth/CreateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      setLoading(false); // set loading false after it get responses from server
      console.log(json);
      if (json.success) {
        //save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        props.showAlert("success", "Account created successfully!");
        navigate("/home");
      } else {
        //alert("Could not sign up!! Try again!");
        props.showAlert("danger", json.error);
      }
    } else {
      props.showAlert("danger", "Password and Confirm password doesn't match!");
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
    <div className="container my-2 p-4 text-center">
      <div>
        <h2 className="my-4">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              required
              minLength={3}
              onChange={onChange}
              value={credentials.name}
            />
          </div>
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
              minLength={3}
              value={credentials.password}
              onChange={onChange}
            />
            <div className="input-group-addon" onClick={passShow} style={{position:'absolute', right:'15px', color:'black', zIndex:'10'}}>
            <i className={`fa ${eye}`} aria-hidden="true"></i>
          </div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              required
              minLength={3}
              value={credentials.cpassword}
              onChange={onChange}
            />
          </div>
          {loading && <Spinner />}
         {!loading && <>
          <button type="submit" className="btn btn-dark border">
            Sign up
          </button>
          </>}
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
