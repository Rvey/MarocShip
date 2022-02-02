import { useNavigate } from 'react-router-dom';
let navigate = useNavigate();

const redirect = (url: string) => {
    return navigate(url);
};

export default redirect;
