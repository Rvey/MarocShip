import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../layouts/navigation';
import AdminDash from '../pages/admin/adminDashoard';
import HandleManagers from '../layouts/dashboards/handleManagers';
import AdminLogin from '../pages/Auth/adminLogin';

const Routers = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <div className="pl-[18em]  pr-[1.5em] bg-slate-900 min-h-screen ">
                <Routes>
                    <Route path="/" element={<AdminDash />} />
                    <Route path="/Managers" element={<HandleManagers />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
