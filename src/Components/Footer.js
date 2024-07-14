import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'  // Optional: smooth scrolling behavior
        });
      };

  return (
      
  
  <footer>
  <div className='footer-main'>
    <div className='footer-div'>
          <h5 className='mb-2'>TOP SECTIONS</h5>
          <ul>
              <li className='py-1'> <Link to="/" aria-current="page" onClick={scrollToTop}> HOMEPAGE</Link></li>
              <li className='py-1'><Link to="/home" onClick={scrollToTop}>NOTES</Link></li>
              <li className='py-1'><Link to="/expense" onClick={scrollToTop}>EXPENSE</Link></li>
              <li className='py-1'><Link to="/about" onClick={scrollToTop}>ABOUT</Link></li>
          </ul>
      </div>
      <div className='footer-div'>
          <h5 className='mb-2'>QUICK LINKS</h5>
          <ul>
              <li className='py-1'><Link to="/about" onClick={scrollToTop}>ABOUT US</Link></li>
              <li className='py-1'><Link to="#" onClick={scrollToTop}>FEEDBACKS/QUERIES</Link></li>
              <li className='py-1'><Link to="/signup" onClick={scrollToTop}>SIGN UP</Link></li>
          </ul>
      </div>
      <div className='footer-div'>
          <h5 className='mb-2'>CONTACT US</h5>
          <ul>
              <li className='py-1' style={{color:'#d1d5db'}}><i className="fa-solid fa-location-dot"></i> &nbsp; Whitefield, Bangalore</li>
              <li className='py-1' style={{color:'#d1d5db'}}><i className="fa-solid fa-phone"></i> &nbsp; <a href="tel:8411031956">+91 8411031956</a></li>
              <li className='py-1' style={{color:'#d1d5db'}}><i className="fa-regular fa-envelope"></i> &nbsp; ezynotes@gmail.com</li>
          </ul>
      </div>
  </div>
    <div className='text-center bg-dark text-white-50'>
        <small>Copyright © 2024. All rights reserved by ezyNotes.</small>
    </div>
  </footer>
  )
}

export default Footer
