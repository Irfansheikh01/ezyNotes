import React, {useContext} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Navbar = () => {
    const context = useContext(noteContext);
    const { user, setUser } = context;

    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem('token');
      setUser('');
      navigate('/login')
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            EzyNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/'?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about'?"active":""}`} to="/about">
                  About
                </Link>
              </li>
              {user!='' ? <li className="nav-item">
                <Link className='nav-link active' to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                  &nbsp;<i>{user.name} </i>
                </Link>
              </li>: ''}
            </ul>
            {!localStorage.getItem('token')? <div>
            <Link className="btn btn-outline-light mx-2" to="/Login" role="button">Login</Link>
            <Link className="btn btn-outline-light mx-2" to="/Signup" role="button">Signup</Link> 
            </div>: <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
