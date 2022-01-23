import { FunctionComponent, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from '../layouts/navBar';
import AdminDash from '../pages/Admin/dashAdmin';
import AdminLogin from '../pages/Admin/login';
import Statistics from '../pages/Admin/statistics';

interface IRoutersProps {}

const Routers: FunctionComponent<IRoutersProps> = () => {
   
    return (
        <BrowserRouter>
       
        <Navigation />
            <Routes>
                <Route  path="/" element={<AdminDash />} />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
