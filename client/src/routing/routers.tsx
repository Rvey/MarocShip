import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import AdminLogin from '../pages/Auth/admin';
import HandleManagers from '../pages/admin/managers';
import AdminDash from '../pages/admin/adminStatistics';
import HandleDrivers from '../pages/admin/drivers';
import DriversRecruiting from '../pages/admin/recruiters';
import ManagerLogin from '../pages/Auth/manager';
import DeliveryManager from '../pages/Auth/deliveryManager';
import DriverLogin from '../pages/Auth/driver';
import Deliveries from '../pages/deliveryManager/deliveries';

const Routers = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <div className="pl-[18em]  pr-[1.5em] dark:bg-slate-900 bg-white min-h-screen ">
                <Routes>
                    <Route path="/" element={<AdminDash />} />
                    <Route path="/Managers" element={<HandleManagers />} />
                    <Route path="/Drivers" element={<HandleDrivers />} />
                    <Route path="/Recruit" element={<DriversRecruiting />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                    <Route path="/managerLogin" element={<ManagerLogin />} />
                    <Route path="/deliveryManagerLogin" element={<DeliveryManager />} />
                    <Route path="/driverLogin" element={<DriverLogin />} />
                    <Route path="/deliveries" element={<Deliveries />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
