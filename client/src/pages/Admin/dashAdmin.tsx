import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface AdminDashProps {}

const AdminDash: React.FC<AdminDashProps> = () => {
    const [message, setMessage] = useState('');
    const { number } = useParams();

    useEffect(() => {
      number ? setMessage(`the number is ${number}`) : setMessage('yikes')
    },[number])
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>{message}</p>
        </div>
    );
};

export default AdminDash;
