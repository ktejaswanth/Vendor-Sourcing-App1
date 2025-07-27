import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UserHome.css';
import image1 from './image1.png';

function UserHome() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="navbar">
        <h1>🍽️ Vendor Sourcing App</h1>
        <nav className="nav-links">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => {
            const section = document.querySelector('.about');
            section && section.scrollIntoView({ behavior: 'smooth' });
          }}>About Us</button>
          <button onClick={() => {
            const section = document.querySelector('.contact');
            section && section.scrollIntoView({ behavior: 'smooth' });
          }}>Contact</button>
          <button onClick={() => {
            const section = document.querySelector('.feedback');
            section && section.scrollIntoView({ behavior: 'smooth' });
          }}>Feedback</button>
        </nav>
      </header>

      <section className="image-banner">
  <img src={image1} alt="Banner" />
</section>

      <section className="about">
        <h2>About Us </h2>
        <p>We bridge the gap between local farmers and street food vendors for fair pricing, better sourcing, and a sustainable ecosystem.</p>
      </section>

      <section className="contact">
        <h2>CONTACT US && TEAM - PAVANI'S</h2>
      
         <p>
    <strong>KODLI PAVANI</strong> - 2300033843@kluniversity.in <br />
    <a href="https://www.linkedin.com/in/kodalipavani22/" target="_blank" rel="noopener noreferrer">
      LinkedIn Profile
    </a>
  </p>

  <p>
    <strong>KONDAVETI TEJASWANTH</strong> - 2300031638@kluniversity.in <br />
    <a href="https://www.linkedin.com/in/ktejaswanth" target="_blank" rel="noopener noreferrer">
      LinkedIn Profile
    </a>
  </p>

  <p>
    <strong>NALLAPANENI LAKSHMI SOWJANYA</strong> - 2300031099@kluniversity.in <br />
    <a href="https://www.linkedin.com/in/nallapaneni-lakshmi-sowjanya-1b224a2b0/" target="_blank" rel="noopener noreferrer">
      LinkedIn Profile
    </a>
  </p>
      </section>

      <section className="feedback">
        <h2>Feedback</h2>
        <textarea placeholder="Tell us what you think..." rows="4"></textarea>
        <br />
        <button>Submit</button>
      </section>

      <footer>
        <p>© 2025 Vendor Sourcing Platform | Built for Hackathon</p>
      </footer>
    </div>
  );
}

export default UserHome;
