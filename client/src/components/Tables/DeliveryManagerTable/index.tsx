import { useState } from 'react';
import { useDeleteDeliveryManagerMutation, useGetDeliveryManagersQuery } from '../../../Redux/services/deliveryManager';
import ConfirmDeleteDelivery from '../../ModalContent/ConfirmDeleteDelivery';
import Modal from '../../ModalContent/Modal';


const DeliveryManagerTable = () => {
    const { data, error, isLoading, refetch } = useGetDeliveryManagersQuery();
    const [isOpen , setIsOpen] = useState(false)
    const [DManagerID , setDManagerID] = useState('')

    return (
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                firstName
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                lastName
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                email
                            </th>
                            <th scope="col" className="relative py-3 px-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((deliveryManager, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{deliveryManager.firstName}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{deliveryManager.lastName}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{deliveryManager.email}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDManagerID(deliveryManager._id)
                                                setIsOpen(!isOpen)
                                            }}
                                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} driverId={DManagerID}/>
            {/* <ConfirmDeleteDelivery isOpen={isOpen} setIsOpen={setIsOpen} driverId={DManagerID}  /> */}
        </div>
    );
};

export default DeliveryManagerTable;
