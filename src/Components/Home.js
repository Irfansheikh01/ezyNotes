import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <div className="bg-light">
      <div className="container">
        <Notes showAlert={props.showAlert} />
      </div>
    </div>
  );
};

export default Home;
