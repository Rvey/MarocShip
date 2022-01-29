import { useState } from 'react';
import AddManagerForm from '../../components/Forms/AddManagerForm';
import Modal from '../../components/ModalContent/Modal';
import DeliveryManagerTable from '../../components/Tables/DeliveryManagerTable';
interface ManagerDeliveriesProps {
    setIsOpen?: (val: boolean) => void;
}
const ManageDeliveryManger: React.FC<ManagerDeliveriesProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black dark:text-white py-14">Manage Delivery Managers</h1>
                <button
                    onClick={() =>setIsOpen(!isOpen)}
                    type="button"
                    className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add Delivery Manager
                </button>
            </div>
            <DeliveryManagerTable />

            {/* <DeliveryManagerTable /> */}
            {/* <AddDeliveryManagerModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} component={<AddManagerForm setIsOpen={setIsOpen} />} title={'Add Delivery Manager'} />
        </div>
    );
};

export default ManageDeliveryManger;