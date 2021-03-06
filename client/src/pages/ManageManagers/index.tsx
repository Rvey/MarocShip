import { useState } from 'react';
import AddManagerForm from '../../components/Forms/AddManagerForm';
import Modal from '../../components/ModalContent/Modal';
import ManagerTable from '../../components/Tables/managersTable';

const ManageManagers = () => {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black dark:text-white py-14">Managers</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add Managers

                </button>
            </div>
            <ManagerTable />        
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} component={<AddManagerForm setIsOpen={setIsOpen} />} title={'Add Manager'} />
        </div>
    );
};

export default ManageManagers;
