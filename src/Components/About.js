import React from 'react'

const About = () => {
 
  return (
    <div className="bg-light" style={{ minHeight: "90vh" }}>
      <div className="container">
        <h4 className="">About Us</h4>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <strong>Access your notes from anywhere</strong>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              You can simply login to ezyNotes from any devices like mobile, tablet, laptop, etc. and access your notes.
              Just you need to have internet connection to use ezynotes.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <strong>Safe and Secure notes</strong>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Your notes will be stored securely on cloud and will be safe under your login. 
                Nobody else can access your notes except you.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <strong>Free and easy to use</strong>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                ezyNotes is available for free to use. You don't have to pay anything to use it.
                 It has user friendly layouts that makes it easy to use.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default About
