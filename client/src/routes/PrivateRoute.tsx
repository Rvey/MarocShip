import { Navigate, Route, useLocation } from 'react-router-dom';
import { selectUser } from '../Redux/features/auth/userSlice';
import { useAppSelector } from '../Redux/hook';
const PrivateRoute = ({ children , user }: { children: JSX.Element , user:string }) => {
    let location = useLocation();
    const role = useAppSelector(selectUser).role
   return role === user
   
   ? children
   : <Navigate to={`/${user}Login`} state={{ from: location }} />;
};

export default PrivateRoute;
