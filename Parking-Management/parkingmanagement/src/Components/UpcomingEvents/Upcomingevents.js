import './Upcomingevents.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upcomingevents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

    useEffect(() => {
        // Function to fetch data from backend
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/events'); // Assuming your API endpoint is '/api/events'
            setEvents(response.data); // Update state with fetched data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the fetchData function when the component mounts
        fetchData();
      }, []); // Empty dependency array to run the effect only once

      const onSubmit = (e) => {
        e.preventDefault();
        navigate('/Home');
      }
  return (
    <div className='ue'>
      <h1>Upcoming Events</h1>
      <table className="uet">
        <thead>
          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>State</th>
            <th>City</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{event.event}</td>
              <td>{event.state}</td>
              <td>{event.city}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <center>
        <button onClick={onSubmit}>Return to Home</button>
      </center>
    </div>
  )
}

export default Upcomingevents
