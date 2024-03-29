// import './Manageevents.css';

// // Using Google's Maps API

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useNavigate } from 'react-router-dom';

// const containerStyle = {
//   width: '400px',
//   height: '400px',
//   marginLeft: '20px', // Add left margin for spacing
//   borderRadius: '10px'
// };

// const defaultCenter = {
//   lat: 28.6139,
//   lng: 77.2090
// };

// const Manageevents = () => {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     event: "",
//     state: "",
//     city: ""
//   });

//   const [mapCenter, setMapCenter] = useState(defaultCenter);

//   useEffect(() => {
//     const fetchCoordinates = async() => {
//       try {
//         const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.city},${formData.state}&key=AIzaSyDvnz1strFJ3epdlvuDdJfmNCS6WmKeTS4`);
//         const {results} = response.data;
//         if (results.length > 0) {
//           const {lat, lng} = results[0].geomery.location;
//           setMapCenter({lat, lng});
//         } else {
//           console.log("No results found");
//         }
//       } catch (error) {
//         console.log("Error fetching coordinates: ", error);
//       }
//     };

//     if (formData.state && formData.city) {
//       fetchCoordinates();
//     }
//   }, [formData.state, formData.city]);

//   const onChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   }

//   const handleOnSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formData);
//     try {
//       await axios.post("http://localhost:8080/event", formData);
//       alert("Data is successfully submitted!!!");
//       setFormData({
//         name: "",
//         event: "",
//         state: "",
//         city: ""
//       });
//       navigate('/Upcomingevents')
//     } catch (error) {
//       console.log("Error: ", error)
//     }
//   }

//   return (
//     <div className='me'>
//       <div className="wrapper2">
//         <form action="" onSubmit={handleOnSubmit}>
//           <h1>Manage Event</h1>
//           <div className="input-box2">
//             <input type="text" name="name" placeholder='Name' value={formData.name} onChange={onChange} />
//           </div>
//           <div className="input-box2">
//             <input type="text" name="event" placeholder='Event' value={formData.event} onChange={onChange} />
//             <select name='state' onChange={onChange}>
//                 <option value="Choose..." disabled selected hidden>State</option>
//                 <option value="Andhra Pradesh">Andhra Pradesh</option>
//                 <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//                 <option value="Assam">Assam</option>
//                 <option value="Bihar">Bihar</option>
//                 <option value="Chhattisgarh">Chhattisgarh</option>
//                 <option value="Goa">Goa</option>
//                 <option value="Gujarat">Gujarat</option>
//                 <option value="Haryana">Haryana</option>
//                 <option value="Himachal Pradesh">Himachal Pradesh</option>
//                 <option value="Jharkhand">Jharkhand</option>
//                 <option value="Karnataka">Karnataka</option>
//                 <option value="Kerala">Kerala</option>
//                 <option value="Madhya Pradesh">Madhya Pradesh</option>
//                 <option value="Maharashtra">Maharashtra</option>
//                 <option value="Manipur">Manipur</option>
//                 <option value="Meghalaya">Meghalaya</option>
//                 <option value="Mizoram">Mizoram</option>
//                 <option value="Nagaland">Nagaland</option>
//                 <option value="Odisha">Odisha</option>
//                 <option value="Punjab">Punjab</option>
//                 <option value="Rajasthan">Rajasthan</option>
//                 <option value="Sikkim">Sikkim</option>
//                 <option value="Tamil Nadu">Tamil Nadu</option>
//                 <option value="Telangana">Telangana</option>
//                 <option value="Tripura">Tripura</option>
//                 <option value="Uttar Pradesh">Uttar Pradesh</option>
//                 <option value="Uttarakhand">Uttarakhand</option>
//                 <option value="West Bengal">West Bengal</option>
//             </select>
//           </div>
//           <br />
//           <br />
//           <div className="input-box2">
//             <input type="text" name="city" placeholder='City' value={formData.city} onChange={onChange} />
//           </div>
//           <div className='subBtn1'>
//             <button type='submit'>Submit</button>
//           </div>
//         </form>
//       </div>
//       <div>
//         <LoadScript
//           googleMapsApiKey="AIzaSyDvnz1strFJ3epdlvuDdJfmNCS6WmKeTS4">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={mapCenter}
//             zoom={10}
//             >
//             <Marker position={mapCenter} />
//           </GoogleMap>
//         </LoadScript>
//         <p>To use this map you need to pay Google a certain Amount</p>
//       </div>
//     </div>
//   )
// }
// export default Manageevents;

// import './Manageevents.css';

// // Using Google's Maps API

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useNavigate } from 'react-router-dom';

// const containerStyle = {
//   width: '400px',
//   height: '400px',
//   marginLeft: '20px', // Add left margin for spacing
//   borderRadius: '10px'
// };

// const defaultCenter = {
//   lat: 28.6139,
//   lng: 77.2090
// };

// const Manageevents = () => {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     event: "",
//     state: "",
//     city: ""
//   });

//   const [mapCenter, setMapCenter] = useState(defaultCenter);

//   useEffect(() => {
//     const fetchCoordinates = async() => {
//       try {
//         const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.city},${formData.state}&key=AIzaSyDvnz1strFJ3epdlvuDdJfmNCS6WmKeTS4`);
//         const {results} = response.data;
//         if (results.length > 0) {
//           const {lat, lng} = results[0].geomery.location;
//           setMapCenter({lat, lng});
//         } else {
//           console.log("No results found");
//         }
//       } catch (error) {
//         console.log("Error fetching coordinates: ", error);
//       }
//     };

//     if (formData.state && formData.city) {
//       fetchCoordinates();
//     }
//   }, [formData.state, formData.city]);

//   const onChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   }

//   const handleOnSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formData);
//     try {
//       await axios.post("http://localhost:8080/event", formData);
//       alert("Data is successfully submitted!!!");
//       setFormData({
//         name: "",
//         event: "",
//         state: "",
//         city: ""
//       });
//       navigate('/Upcomingevents')
//     } catch (error) {
//       console.log("Error: ", error)
//     }
//   }

//   return (
//     <div className='me'>
//       <div className="wrapper2">
//         <form action="" onSubmit={handleOnSubmit}>
//           <h1>Manage Event</h1>
//           <div className="input-box2">
//             <input type="text" name="name" placeholder='Name' value={formData.name} onChange={onChange} />
//           </div>
//           <div className="input-box2">
//             <input type="text" name="event" placeholder='Event' value={formData.event} onChange={onChange} />
//             <select name='state' onChange={onChange}>
//                 <option value="Choose..." disabled selected hidden>State</option>
//                 <option value="Andhra Pradesh">Andhra Pradesh</option>
//                 <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//                 <option value="Assam">Assam</option>
//                 <option value="Bihar">Bihar</option>
//                 <option value="Chhattisgarh">Chhattisgarh</option>
//                 <option value="Goa">Goa</option>
//                 <option value="Gujarat">Gujarat</option>
//                 <option value="Haryana">Haryana</option>
//                 <option value="Himachal Pradesh">Himachal Pradesh</option>
//                 <option value="Jharkhand">Jharkhand</option>
//                 <option value="Karnataka">Karnataka</option>
//                 <option value="Kerala">Kerala</option>
//                 <option value="Madhya Pradesh">Madhya Pradesh</option>
//                 <option value="Maharashtra">Maharashtra</option>
//                 <option value="Manipur">Manipur</option>
//                 <option value="Meghalaya">Meghalaya</option>
//                 <option value="Mizoram">Mizoram</option>
//                 <option value="Nagaland">Nagaland</option>
//                 <option value="Odisha">Odisha</option>
//                 <option value="Punjab">Punjab</option>
//                 <option value="Rajasthan">Rajasthan</option>
//                 <option value="Sikkim">Sikkim</option>
//                 <option value="Tamil Nadu">Tamil Nadu</option>
//                 <option value="Telangana">Telangana</option>
//                 <option value="Tripura">Tripura</option>
//                 <option value="Uttar Pradesh">Uttar Pradesh</option>
//                 <option value="Uttarakhand">Uttarakhand</option>
//                 <option value="West Bengal">West Bengal</option>
//             </select>
//           </div>
//           <br />
//           <br />
//           <div className="input-box2">
//             <input type="text" name="city" placeholder='City' value={formData.city} onChange={onChange} />
//           </div>
//           <div className='subBtn1'>
//             <button type='submit'>Submit</button>
//           </div>
//         </form>
//       </div>
//       <div>
//         <LoadScript
//           googleMapsApiKey="AIzaSyDvnz1strFJ3epdlvuDdJfmNCS6WmKeTS4">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={mapCenter}
//             zoom={10}
//             >
//             <Marker position={mapCenter} />
//           </GoogleMap>
//         </LoadScript>
//         <p>To use this map you need to pay Google a certain Amount</p>
//       </div>
//     </div>
//   )
// }
// export default Manageevents;

import { useState, useEffect } from "react";
import "./Manageevents.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../Assets/location_marker.svg";
import L from "leaflet";
// import DatePicker from 'react-datepicker';
// import TimePicker from 'react-time-picker';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-time-picker/dist/TimePicker.css';

const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const apiKey = "pk.73afeab6936c374c96cddabd4e8839ae";

// const defaultCenter = {
//   lat: 28.6139,
//   lng: 77.209,
// };

const Manageevents = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.209 });

  const containerStyle = {
    width: "400px",
    height: "400px",
    marginLeft: "20px", // Add left margin for spacing
    borderRadius: "10px",
  };

  const [formData, setFormData] = useState({
    name: "",
    event: "",
    state: "",
    city: "",
    date: null,
    time: "",
  });

  // const handleDateChange = (date) => {
  //   setFormData({
  //     ...formData,
  //     date: date
  //   });
  // };

  // const handleTimeChange = (time) => {
  //   setFormData({
  //     ...formData,
  //     time: time
  //   });
  // };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // // Call handleSearch when city or state changes
    // if (name === "city") {
    //   console.log(formData);
    // }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${formData.city}&format=json`
      );
      const data = response.data;
      if (data.length > 0) {
        setLocation({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      }
    } catch (error) {
      console.error("Error fetching location: ", error);
    }
  };

  const SetViewOnSearch = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (coords) {
        map.flyTo(coords, 13);
      }
    }, [coords, map]);
    return null;
  };
  const handleBlur = () => {
    console.log("seraching for ", formData.city);
    handleSearch();
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:8080/event", formData);
      alert("Data is Successfully submitted!!!");
      setFormData({
        name: "",
        event: "",
        state: "",
        city: "",
        date: "",
        time: "",
      });
      navigate("/Upcomingevents");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="me">
      <div className="wrapper2">
        <form action="" onSubmit={handleOnSubmit}>
          <h1>Manage Event</h1>

          <div className="input-box2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={onChange}
            />
          </div>

          <div className="input-box2">
            <input
              type="text"
              name="event"
              placeholder="Event"
              value={formData.event}
              onChange={onChange}
            />
            <select name="state" onChange={onChange}>
              <option value="Choose..." disabled selected hidden>
                State
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>

          <br />
          <br />

          <div className="input-box2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={onChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="input-box2">
            <input
              type="text"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={onChange}
            />
          </div>

          <div className="input-box2">
            <input
              type="text"
              name="time"
              onChange={onChange}
              placeholder="Time"
              value={formData.time}
            />
          </div>

          <div className="snbBtn1">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="maps-container">
        <MapContainer
          // center={[defaultCenter.lat, defaultCenter.lng]}
          center={[location.lat, location.lng]}
          zoom={10}
          style={containerStyle}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {location && (
            <>
              <SetViewOnSearch coords={[location.lat, location.lng]} />
              <Marker
                position={[location.lat, location.lng]}
                icon={customMarkerIcon}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Manageevents;
