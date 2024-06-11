import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
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
      const response = await fetch(
        "https://mern-api-backend-rho.vercel.app/api/auth/CreateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        props.showAlert("success", "Account created successfully!");
        navigate("/");
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

  return (
    <div className="container my-2 w-25 p-4 bg-info text-center">
      <div>
        <h2>Sign up</h2>
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
          <div className="mb-3">
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

          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
