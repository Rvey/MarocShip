import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import {
    AdminDashboard,
    AdminLogin,
    ManagerLogin,
    DriverLogin,
    DeliveryManagerLogin,
    ManageCandidate,
    ManageDriver,
    ManageDeliveries,
    ManageManagers,
    DriverRegister,
    ResetDriverPwdPage
} from './../pages';
import BombField from '../pages/bombField';
import ManageDeliveryManger from '../pages/ManageDeliveryManager';
import AcceptDeliveries from '../pages/AcceptDeliveries';
import { useAppSelector } from '../Redux/hook';
import { selectUser } from '../Redux/features/auth/userSlice';
import PrivateRoute from './PrivateRoute';
import ResetMPwdPage from '../pages/ResetManagerPwd';
import ResetDMPwdPage from '../pages/ResetDMPwd';

const Routers = () => {
    const user = useAppSelector(selectUser);
    return (
        <BrowserRouter>
            {user.email ? <Navigation /> : null}
            <div className={`${user.email ? 'pl-[18em]  pr-[1.5em]' : ''} dark:bg-slate-900 bg-white min-h-screen dark:text-white `}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute user="admin">
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/Recruit"
                        element={
                            <PrivateRoute user="admin">
                                <ManageCandidate />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/Managers"
                        element={
                            <PrivateRoute user="admin">
                                <ManageManagers />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/DeliveryMangers"
                        element={
                            <PrivateRoute user="manager">
                                <ManageDeliveryManger />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/deliveries"
                        element={
                           
                                <ManageDeliveries />
                          
                        }
                    />

                    <Route
                        path="/Drivers"
                        element={
                            <PrivateRoute user="admin">
                                <ManageDriver />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/AcceptDeliveries"
                        element={
                            <PrivateRoute user="driver">
                                <AcceptDeliveries />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/driverRegister" element={<DriverRegister />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                    <Route path="/deliveryManagerLogin" element={<DeliveryManagerLogin />} />
                    <Route path="/driverLogin" element={<DriverLogin />} />
                    <Route path="/managerLogin" element={<ManagerLogin />} />
                    <Route path="/restManagerPassword" element={<ResetMPwdPage />} />
                    <Route path="/restDriverPassword" element={<ResetDriverPwdPage />} />
                    <Route path="/restDManagerPassword" element={<ResetDMPwdPage />} />
                    <Route path="/bomb" element={<BombField />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
