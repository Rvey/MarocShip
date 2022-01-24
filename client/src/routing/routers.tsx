import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import AdminLogin from '../pages/Auth/adminLogin';
import HandleManagers from '../pages/adminDashboard/handleManagers';
import AdminDash from '../pages/adminDashboard/adminStatistics';
import HandleDrivers from '../pages/adminDashboard/handleDrivers';
import DriversRecruiting from '../pages/adminDashboard/driversRecruit';

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
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
