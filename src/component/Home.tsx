import React, { useEffect } from 'react';
import BHI from '../assets/BHIlogo-removebg-preview.png';
import gsap from 'gsap';
import Loginbox from './Loginbox';
import Signupbox from './Signupbox';

const Home: React.FC = () => {
  useEffect(() => {
    const letchatbtn = document.querySelector(".letchat-button") as HTMLButtonElement | null;
    const navlogbtn = document.querySelector(".nav-login-btn") as HTMLButtonElement | null;

    const navsignbtn = document.querySelector(".nav-Signup-btn") as HTMLButtonElement | null;
    const boxsignbtn = document.querySelector(".signlink") as HTMLButtonElement | null;
    
    if (letchatbtn || navlogbtn ) {
      const log = gsap.timeline();
      const wel = gsap.timeline();

      wel.fromTo(
        ".welcome-container",
        {
          x: 0, // Start from the centre
        },
        {
          x: -450, // Move to left
          opacity:0,
          duration: 1,
        }
      );

      log.fromTo(
        ".login-box",
        {
          y: 500, // Start from the left side
          opacity: 0, // Start with no opacity
        },
        {
          y: 0, // Move to center
          opacity: 1, // Fade in
          duration: 1,
        }
      );

      log.pause();
      wel.pause()

      letchatbtn?.addEventListener("click", function () {
        log.play();
        log.restart();
        wel.play();
      });

      navlogbtn?.addEventListener("click", function () {
        log.play();
        log.restart();
        wel.play();
      });

      navsignbtn?.addEventListener("click", function () {
        wel.play();
      });
   }

    if (navsignbtn||boxsignbtn) {
      const sign = gsap.timeline();
    

      sign.fromTo(
      ".signup-box",
      {
        y: -500, // Start from the left side
        opacity: 0, // Start with no opacity
      },
      {
        y: 0, // Move to center
        opacity: 1, // Fade in
        duration: 1,
      }
    );

    sign.pause();

    navsignbtn?.addEventListener("click", function () {
      sign.play();
      sign.restart();
    });

    boxsignbtn?.addEventListener("click", function () {
      sign.play();
      sign.restart();
    });
  }
  }, []); 

  return (
    <>
      <Loginbox />
      <Signupbox/>

      <div className="main-content">
        <div className="welcome-container">
          <p className="welcome">Welcome To</p>
          <div className="welcomepara">
            Uniguru, a wise guide offering personalized support and mentorship. I empower individuals to achieve their goals. Together, let's illuminate the path to success.
          </div>
          <div>
          <button className="letchat-button">Let's chat</button>
          </div>
        </div>
      </div>

      <div className="footer" >
        <img src={BHI} alt="BHI" className="bhi-logo" />
      </div>
      
    </>
  );
};

export default Home;