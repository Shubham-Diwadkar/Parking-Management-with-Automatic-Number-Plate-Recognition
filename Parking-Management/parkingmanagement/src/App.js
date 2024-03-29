import './App.css';
import Loginform from './Components/LoginForm/Loginform';
import Registerform from './Components/RegisterForm/Registerform';
import Home from './Components/Home/Home';
import ParkingForm from './Components/ParkingForm/Parkingform';
import Paymentmodule from './Components/PaymentModule/Paymentmodule';
import ManageEvents from './Components/ManageEvents/Manageevents';
import UpcomingEvents from './Components/UpcomingEvents/Upcomingevents';
import {
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Loginform/>} />
        <Route path='/Register' element={<Registerform />} />
        <Route path='/Home' element={<Home/>}/>
        <Route path='/ParkingForm' element={<ParkingForm/>} />
        <Route path='/Paymentmodule' element={<Paymentmodule/>}/>
        <Route path='/Manageevents' element={<ManageEvents/>}/>
        <Route path='/Upcomingevents' element={<UpcomingEvents/>}/>
      </Routes>
    </div>
  );
}

export default App;
