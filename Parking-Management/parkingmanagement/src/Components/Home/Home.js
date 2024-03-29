// Imported the files for Home Component.
import React, {useEffect, useState} from 'react'
import './Home.css'
import menu from '../Assets/car-logo.png';
import {FaGithub, FaLinkedin, FaMedium} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'; 

const Home = () => {

  const [isSideNavOpen,setIsSideNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  useEffect(()=> {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if(loggedIn) {
      const userNameFromCookie = Cookies.get('name');
      console.log("Name from cookie: ", userNameFromCookie);
      if (userNameFromCookie) {
        setUserName(userNameFromCookie);
        setIsLoggedIn(true);
      } else {
        console.warn("Name cookie not found or empty!")
      }
    }
  }, []);
  
  const handleBooking = () => {
    navigate("/ParkingForm")
  }
  
  const handleManageevent = () => {
    navigate("/Manageevents")
  }

  const handleUpcomingevent = () => {
    navigate("/Upcomingevents");
  }

  const handleLogout =() => {
    // Clear session information from localStorage
    localStorage.removeItem("isLoggedIn");
    
    // Redirect to the login page
    navigate("/");
  }

  return (
      <div className='containter'>
        {/* {isLoggedIn && showPopup && <Popup />} Render popup only when isLoggedIn and showPopup are true */}
        <section id='banner'>
          {/* <img src={logo} className='logo' alt='Parking-King Logo'/>*/}
          <div className="banner-text">
            <h1>Park-King</h1>
            <p>Life is a journey, but don't worry, you'll find a parking slot at the end</p>
            <div className="banner-btn">
              <button onClick={handleBooking}><span>Book Now</span></button>
              <a href='#feature'>Read More</a>
            </div>
          </div>
       </section>
       <div id="sideNav" style={{right: isSideNavOpen ? '0px': '-250px'}}>
        <nav>
          <ul>
            <li><a href='#'>HOME</a></li>
            <li><a href='#feature'>FEATURES</a></li>
            <li><a href='#gallery'>GALLERY</a></li>
            <li><a href='/Parkingform' onClick={handleBooking}>BOOK NOW</a></li>
            <li><a href='/Manageevents' onClick={handleManageevent}>MANAGE EVENTS</a></li>
            <li><a href='/Upcomingevents' onClick={handleUpcomingevent}>UPCOMING EVENTS</a></li>
            <li><a href='#About-Us'>ABOUT US</a></li>
            <li><a href='/' onClick={handleLogout}>LOG OUT</a></li>
          </ul>
        </nav>
       </div>
       <div id ="menuBtn" onClick={toggleSideNav}>
        <img src={menu} id="menu" alt="Menu" style={{width: '40px', height: '30px'}}/>
       </div>

       {/* Features */}
       <section id="feature">
        <div className="title-text">
          <p>Features</p>
          <h1>Why Choose Us</h1>
        </div>
        <div className="feature-box">
          <div className="features">
            <h1>Reliable Parking</h1>
            <div className="features-desc">
              <p>EAT, SLEEP, PARK, REPEAT! It's as easy as that at Park-King. At Park-King, we pride ourselves on being the most reliable vehicle prking WebApp with no compromise on quality.</p>
            </div>
            <h1>Pre Booking Online</h1>
            <div className="features-desc">
              <p>Being on-time and making your parking hassle-free is our priority! Book your parking slots and zones in advance with our pre-online booking system to ease your way in getting your parking slots without any sweat.</p>
            </div>
            <h1>Affordable Cost</h1>
            <div className='features-desc'>
              <p>Every single one of us deserves access to quality and standard parking. To get it at an affordable & cheap cost is an added bonus. We, at Park-King, are really happy and efficient to provide you the services of both.</p>
            </div>
            {/* Add otherfeature discriptions */}
            <h1>Upcoming Events</h1>
            <div className="features-desc">
              <p>At Park-King, we offer more than just parking solutions. In addition to managing vehicle parking, we also specialize in event management services. Whether you're looking to host events for your loyal fans or need assistance in organizing gatherings, we've got you covered. Trust us to handle all your parking and event management needs seamlessly.</p>
            </div>
          </div>
          <div className="features-img">
          <img src={require('../Assets/pic-1.jpg')} alt="Parking Spot" />
          <img src={require('../Assets/Events.jpg')} alt="Events" />
          </div>
        </div>
       </section>

       {/* Gallery */}
       <section id="gallery">
        <div className="title-text">
          <p>GALLERY</p>
          <h1>Some Parking Slots</h1>
        </div>
        <div className="gallery-box">
          <div className="single-gallery">
            <img src={require('../Assets/Parkingslot1.jpg')} alt="Parking in Hydrabad" />
            <div className="overlay">
              <p>Hyrdrabad boasts efficient parking solutions, ensuring convenience for residents and visitors navigating the city's bustling streets and vibrant locales.</p>
            </div>
          </div>
          <div className="single-gallery">
            <img src={require('../Assets/Parkingslot2.jpg')} alt="Parking in Mumbai" />
            <div className='overlay'>
              <p>Mumbai parking presents a unique challenge due to its bustling streets and high population density, requiring efficient management solutions to optimize space and accommodate the city's vehicular needs.</p>
            </div>
          </div>
          <div className="single-gallery">
            <img src={require('../Assets/Parkingslot3.jpg')} alt="Parking in Delhi" />
            <div className="overlay">
              <p>Delhi offers a variety of parking options to accommodate the bustling urban life, ensuring seamless access for commuters and residents across the city.</p>
            </div>
          </div>
          <div className="single-gallery">
            <img src={require('../Assets/Parkingslot4.jpg')} alt="Parking in Banglore" />
            <div className="overlay">
              <p>Bangalore's parking infrastructure is evolving to meet the demands of its bustling streets, ensuring seamless mobility and hassle-free parking experiences for residents and visitors alike.</p>
            </div>
          </div>
        </div>
       </section>

       {/* About Us */}
       <section id='About-Us'>
        <div className='title-text'>
          <p>ABOUT US</p>
          <h1>Our Team</h1>
            <div className="feature-box">
              <div className='features-img'>
              <img src={require("../Assets/darshan.jpg")} alt="Darshan" />
              </div>
              <div className="features">
                <h1 style={{fontSize: '36px'}}><b>Darshan Diwakar Prabhu</b></h1>
                <h3 style={{fontSize: '36px'}}><b>[ML Developer]</b></h3>
                <div className="feature-desc">
                  <span>As an Enthusiast Pythoneer, Darshan has thrived on the challenge of writing clean, concise, and scalable code, always seeking to push the boundaries of what's possible with Python.<br/>Contact No.: +91 93563 44819</span>
                  <div className='socials'>
                    <a href='https://github.com/Darshan0902'><FaGithub size={40}/></a>
                    <a href='https://www.linkedin.com/in/darshanprabhu009/'><FaLinkedin size={40}/></a>
                    <a href='https://prabhudarshan09.medium.com/'><FaMedium size={40}/></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-box">
              <div className="features">
                <h1 style={{fontSize: '36px'}}><b>Sanket Vijay Shirkey</b></h1>
                <h3 style={{fontSize: '36px'}}><b>[Resource Manager]</b></h3>
                <div className="feature-desc">
                  <span>Sanket Shirke, a resourceful manager, adeptly leads teams, fostering collaboration and productivity through effective communication and empathy. His strategic leadership cultivates a positive work environment, driving successful project outcomes.<br/>Contact No.: +91 84528 44640</span>
                  <div className='socials'>
                    <a href='https://github.com/ShameGame27'><FaGithub size={40}/></a>
                    <a href='https://www.linkedin.com/in/sanket-s27/'><FaLinkedin size={40}/></a>
                  </div>
                </div>
              </div>
              <div className='features-img'>
              <img src={require("../Assets/sanket.jpg")} alt="Darshan" />
              </div>
            </div>
            <div className="feature-box">
              <div className='features-img'>
              <img src={require("../Assets/Myself.jpg")} alt="Darshan" />
              </div>
              <div className="features">
                <h1 style={{fontSize: '36px'}}><b> Shubham Rahul Diwadkar</b></h1>
                <h3 style={{fontSize: '36px'}}><b>[Front-end Developer]</b></h3>
                <div className="feature-desc">
                  <span>Shubham Diwadkar, a passionate front-end developer, merges creativity with technical expertise to craft captivating online experiences. Continuously innovating, he pushes the boundaries of web development, transforming ideas into dynamic digital realities through masterful design and coding.<br/>Contact No.: +91 97695 35988</span>
                  <div className='socials'>
                    <a href='https://github.com/shubham-diwadkar'><FaGithub size={40}/></a>
                    <a href='https://www.linkedin.com/in/shubham-diwadkar/'><FaLinkedin size={40}/></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-box">
              <div className="features">
                <h1 style={{fontSize: '36px'}}><b>Yogesh Govind Kanyal</b></h1>
                <h3 style={{fontSize: '36px'}}><b>[Paper Research & Documentation]</b></h3>
                <div className="feature-desc">
                  <span>Yogesh Kanyal specializes in paper research and documentation, meticulously curating and synthesizing information for comprehensive analyses. With a keen eye for detail and a dedication to accuracy, he produces high-quality research documents that contribute to scholarly discourse. <br/>Contact No.: +91 91120 08174</span>
                  <div className='socials'>
                    <a href='https://github.com/Yogeshkanyal1210'><FaGithub size={40}/></a>
                    <a href='https://www.linkedin.com/in/yogeshkanyal1210/'><FaLinkedin size={40}/></a>
                  </div>
                </div>
              </div>
              <div className='features-img'>
              <img src={require("../Assets/yogesh.jpg")} alt="Darshan" />
              </div>
            </div>
          </div>
       </section>
      </div>
  )
}

export default Home
