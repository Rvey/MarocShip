import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import { AdminDashboard, AdminLogin, ManagerLogin, DriverLogin, DeliveryManagerLogin, ManageCandidate, ManageDriver, ManageDeliveries, ManageManagers, DriverRegister } from './../pages'
import BombField from '../pages/bombField';
import ManageDeliveryManger from '../pages/ManageDeliveryManager';
import AcceptDeliveries from '../pages/AcceptDeliveries';
import { useAppSelector } from '../Redux/hook';
import { selectUser } from '../Redux/features/auth/userSlice';


const Routers = () => {
    const user = useAppSelector(selectUser);
    return (
        <BrowserRouter>
            <Navigation />
            <div className="pl-[18em]  pr-[1.5em] dark:bg-slate-900 bg-white dark:text-white min-h-screen ">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />

                    <Route path="/Managers" element={<ManageManagers />} />
                    <Route path="/Recruit" element={<ManageCandidate />} />

                    <Route path="/DeliveryMangers" element={<ManageDeliveryManger />} />
                    
                    <Route path="/deliveries" element={<ManageDeliveries />} />
                    
                    <Route path="/Drivers" element={<ManageDriver />} />

                    <Route path="/AcceptDeliveries" element={<AcceptDeliveries />} />



                    <Route path="/driverRegister" element={<DriverRegister />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                    <Route path="/deliveryManagerLogin" element={<DeliveryManagerLogin />} />
                    <Route path="/driverLogin" element={<DriverLogin />} />
                    <Route path="/managerLogin" element={<ManagerLogin />} />



                    <Route path="/bomb" element={<BombField name={''} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
