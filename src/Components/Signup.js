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
    <div className="container my-2">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              minLength={3}
              onChange={onChange}
              value={credentials.name}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              onChange={onChange}
              value={credentials.email}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              minLength={3}
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confrim Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              required
              minLength={3}
              value={credentials.cpassword}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
