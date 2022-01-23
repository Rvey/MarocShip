import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from '../layouts/navigation';
import AdminDash from '../pages/admin';
import AdminLogin from '../pages/Auth/adminLogin';

const Routers = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <div className="ml-[15em]  mr-[1.5em]">
                <Routes>
                    <Route path="/" element={<AdminDash />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
