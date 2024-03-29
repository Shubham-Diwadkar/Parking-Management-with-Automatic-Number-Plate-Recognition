import React, { useState, useEffect } from 'react';
import './Parkingform.css';
import axios from 'axios';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import {useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const ParkingForm = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected file");
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    vehicleType: '',
    image: null,
    email:Cookies.get('email')
  });
  const navigate = useNavigate();

  useEffect(()=> {
    const email = Cookies.get('email');
    console.log("Email retrieved from cookie: ",email);
  }, [])    

  const onChange = ({ target: { files, name, value } }) => {
    if (name === 'image' && files.length > 0) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
      setFormData({ ...formData, image: files[0] }); // Update formData.image
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onChangetd = ({ target: { value } }) => {
    let price = 0;
    const timeDuration = value;
  
    switch (formData.vehicleType) {
      case 'car':
        switch (timeDuration) {
          case '11am-12noon':
          case '12noon-1pm':
          case '1pm-2pm':
          case '2pm-3pm':
            price = 100;
            break;
          case '3pm-4pm':
            price = 110;
            break;
          case '4pm-5pm':
          case '5pm-6pm':
          case '6pm-7pm':
          case '7pm-8pm':
          case '8pm-9pm':
          case '9pm-10pm':
          case '10pm-11pm':
            price = 120;
            break;
          default:
            price = 0;
        }
        break;
      case 'motorcycle':
        switch (timeDuration) {
          case '11am-12noon':
          case '12noon-1pm':
          case '1pm-2pm':
          case '2pm-3pm':
            price = 80;
            break;
          case '3pm-4pm':
            price = 90;
            break;
          case '4pm-5pm':
          case '5pm-6pm':
          case '6pm-7pm':
          case '7pm-8pm':
          case '8pm-9pm':
          case '9pm-10pm':
          case '10pm-11pm':
            price = 100;
            break;
          default:
            price = 0;
        }
        break;
      case 'van':
        switch (timeDuration) {
          case '11am-12noon':
          case '12noon-1pm':
          case '1pm-2pm':
          case '2pm-3pm':
            price = 150;
            break;
          case '3pm-4pm':
            price = 160;
            break;
          case '4pm-5pm':
          case '5pm-6pm':
          case '6pm-7pm':
          case '7pm-8pm':
          case '8pm-9pm':
          case '9pm-10pm':
          case '10pm-11pm':
            price = 170;
            break;
          default:
            price = 0;
        }
        break;
      case 'SUV':
        switch (timeDuration) {
          case '11am-12noon':
          case '12noon-1pm':
          case '1pm-2pm':
          case '2pm-3pm':
            price = 110;
            break;
          case '3pm-4pm':
            price = 120;
            break;
          case '4pm-5pm':
          case '5pm-6pm':
          case '6pm-7pm':
          case '7pm-8pm':
          case '8pm-9pm':
          case '9pm-10pm':
          case '10pm-11pm':
            price = 130;
            break;
          default:
            price = 0;
        }
        break;
      case 'bicycle':
        switch (timeDuration) {
          case '11am-12noon':
          case '12noon-1pm':
          case '1pm-2pm':
          case '2pm-3pm':
            price = 10;
            break;
          case '3pm-4pm':
            price = 20;
            break;
          case '4pm-5pm':
          case '5pm-6pm':
          case '6pm-7pm':
          case '7pm-8pm':
          case '8pm-9pm':
          case '9pm-10pm':
          case '10pm-11pm':
            price = 30;
            break;
          default:
            price = 0;
        }
        break;
      default:
        price = 0;
    }
  
    setFormData({ ...formData, timeDuration: timeDuration, price: price });
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();

    if(!formData.timeDuration) {
      console.error("Please select a time duration");
    }

    const formDataToSend = new FormData(); // Use a different name for the FormData object
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', Cookies.get('email'));
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('vehicleType', formData.vehicleType);
    formDataToSend.append('timeDuration', formData.timeDuration);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('image', formData.image);
    console.log(formDataToSend);
  
    try { 
      const response = await axios.post('http://localhost:8000/api/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },  
      });
      console.log("Response from Flask backend: ", response.data);
      navigate('/Paymentmodule');
    } catch (error) {
      console.error('Error sending request: ', error);
    }
    // Redirect to Paymentmodule.js with necessary data as URL parameters
      navigate(`/Paymentmodule?price=${formData.price}`);
  };

  return (
    <div className='pf'>
      <form onSubmit={onSubmit} className='wrapper1'>
        <h1>Parking Form</h1>
        <div className='input-box1'>
          <input type='text' name='name' placeholder='Name' onChange={onChange} />
        </div>
        <div className='input-box1'>
          <input type='text' name='phoneNumber' placeholder='Phone Number' onChange={onChange} />
          <select name='vehicleType' onChange={onChange}>
            <option value="Choose..." disabled selected hidden>Vehicle Type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="van">Van</option>
            <option value="SUV">SUV (Sport Utility Vehicle)</option>
            <option value="bicycle">Scooter</option>
          </select>
        </div>
        <br/>
        <div className='input-box1'>
          <select name='timeDuration' onChange={onChangetd}>
            <option value="Choose..." disabled selected hidden>Time Duration</option>
            <option value="11am-12noon">11 A.M. to 12 Noon</option>
            <option value="12noon-1pm">12 Noon to 1 P.M.</option>
            <option value="1pm-2pm">1 P.M. to 2 P.M.</option>
            <option value="2pm-3pm">2 P.M. to 3 P.M.</option>
            <option value="3pm-4pm">3 P.M. to 4 P.M.</option>
            <option value="4pm-5pm">4 P.M. to 5 P.M.</option>
            <option value="5pm-6pm">5 P.M. to 6 P.M.</option>
            <option value="6pm-7pm">6 P.M. to 7 P.M.</option>
            <option value="7pm-8pm">7 P.M. to 8 P.M.</option>
            <option value="8pm-9pm">8 P.M. to 9 P.M.</option>
            <option value="9pm-10pm">9 P.M. to 10 P.M.</option>
            <option value="10pm-11pm">10 P.M. to 11 P.M.</option>
          </select> 
        </div>
        <br/>
        <div className='input-box1'>
          <span>Price: Rs {formData.price}</span>
        </div>
        <div className='input-box1' onClick={() => document.querySelector(".input-field").click()}>
          <div className="uploadImage">
            <input type="file" name="image" accept='image/*' className='input-field' hidden onChange={onChange} />

            {image ? (
              <img src={image} width={150} height={150} alt={fileName} />
            ) : (
              <>
                <MdCloudUpload color="#1475cf" size={60} />
                <p>Browse Files to Upload</p>
              </>
            )}
          </div>
          <div className='input-box1'>
            <section className='uploadedRow'>
              <AiFillFileImage color='#1475cf' />
              <span className='uploadContent'>
                {fileName} -
                <MdDelete onClick={() => {
                  setFileName("No Selected File");
                  setImage(null);
                }} />
              </span>
            </section>
          </div>
          <br />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='subBtn1'>
          <button type='submit'>Proceed to Pay</button>
        </div>
        <div className="subBtn1">
          <button type='submit' onClick={() => navigate('/Home')}>Home</button>
        </div>
      </form>
    </div>
  );
};

export default ParkingForm;
