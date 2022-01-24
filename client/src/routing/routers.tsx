import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import { AdminDashboard, AdminLogin, ManagerLogin, DriverLogin, DeliveryManagerLogin, ManageCandidate, ManageDriver, ManageDeliveries, ManageManagers } from './../pages'
import BombField from '../pages/bombField';

const Routers = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <div className="pl-[18em]  pr-[1.5em] dark:bg-slate-900 bg-white dark:text-white min-h-screen ">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/Managers" element={<ManageManagers />} />
                    <Route path="/Drivers" element={<ManageDriver />} />
                    <Route path="/Recruit" element={<ManageCandidate />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                    <Route path="/managerLogin" element={<ManagerLogin />} />
                    <Route path="/deliveryManagerLogin" element={<DeliveryManagerLogin />} />
                    <Route path="/driverLogin" element={<DriverLogin />} />
                    <Route path="/deliveries" element={<ManageDeliveries />} />
                    <Route path="/bomb" element={<BombField />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
