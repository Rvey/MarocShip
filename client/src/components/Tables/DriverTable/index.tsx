import { useGetDriversQuery } from '../../../Redux/services/driver';
import { useState } from 'react';
import ConfirmDeleteDriver from '../../ModalContent/ConfirmDeleteDriverModal';
import UpdateDriverFrom from '../../Forms/UpdateDriverForm';
import Modal from '../../ModalContent/Modal';
interface DriversTableProps {}

const DriversTable: React.FunctionComponent<DriversTableProps> = () => {
    const { data, isLoading, error } = useGetDriversQuery();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [driverId, setDriverId] = useState('');

    return (
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            {isLoading && 'lOADING ...'}
          <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                fullName
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                email
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                license
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Submitted At
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                file
                            </th>
                            <th scope="col" className="relative py-3 px-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(
                            (driver, index) =>
                                driver.verified && (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{driver.firstName} {driver.lastName}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{driver.email}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{driver.license}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{driver.createdAt}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{driver.file}</td>
                                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <div className="space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setDriverId(driver._id);
                                                    }}
                                                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsOpenConfirm(true);
                                                        setDriverId(driver._id);
                                                    }}
                                                    className=" text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            </div>
            <ConfirmDeleteDriver isOpen={isOpenConfirm} setIsOpen={setIsOpenConfirm} driverId={driverId} />
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} component={<UpdateDriverFrom setIsOpen={setIsOpen} driverId={driverId}  />} title={'Update Driver'} />

        </div>
    );
};

export default DriversTable;
