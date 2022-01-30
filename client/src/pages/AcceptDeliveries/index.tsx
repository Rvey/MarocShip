import { useState } from 'react';
import AcceptDeliveriesTable from '../../components/Tables/AceptDeliveriesTable';
interface ManagerDeliveriesProps {
    setIsOpen?: (val: boolean) => void;
}
const AcceptDeliveries: React.FC<ManagerDeliveriesProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black dark:text-white py-14">Available Deliveries</h1>
            </div>
            <AcceptDeliveriesTable/>
        </div>
    );
};

export default AcceptDeliveries;