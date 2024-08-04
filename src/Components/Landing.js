import React from 'react'
import { useNavigate } from 'react-router-dom';
import './CSS/Landing.css'
import pen from './Images/pen2.png'

const Landing = () => {
    let navigate = useNavigate();
    return (
      <div className='landing-main'>
         
          <div className='div-left'>
              <div className='div-left-inner'>EzyNotes <img src={pen} width={'70px'} height={'70px'} alt={'pen'}></img> <span className='div-left-span' >Your Notes on cloud </span></div>
          </div>
          
          <div className='div-right' >
              <p> A user-friendly note-taking utility that offers seamless cloud storage capabilities. Users can create, edit, and organize their notes directly within the app, which securely syncs all data to the cloud in real-time. <br/><br/>This ensures that notes are always up-to-date and accessible whether on a smartphone, tablet, or computer. Users can access their notes on their login.
              </p> 
              <p>Explore more <button onClick={()=>{navigate('/home')}}>Try it.</button></p>
              
          </div>
      </div>
    )
}

export default Landing
