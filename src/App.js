import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Alert";
import { useState } from "react";
import Footer from "./Components/Footer";

function App() {
  const[alert, setAlert] = useState(null)
  const showAlert = (type, msg) => {
    setAlert({
      type:type,
      msg:msg
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/about" element={<About showAlert={showAlert}/>} />
          <Route path="/Login" element={<Login showAlert={showAlert} />} />
          <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
        <Footer />
      </Router>
    </NoteState>
  );
}

export default App;
