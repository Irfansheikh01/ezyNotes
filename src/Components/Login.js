import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://mern-api-backend-rho.vercel.app/api/auth/loginUser`, {
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
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("success","Logged in successfully!");
      navigate("/");
    } else {
      // alert("Invalid credentials!!");
      props.showAlert("danger",json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    
    <div className="container my-2 w-25 p-4 bg-info text-center">
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
        <div className="mb-3">
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
        </div>
        
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
        
      </form>
      </div>

    
   
    
 
  );
};

export default Login;
