import { useState } from 'react';
import { useDeleteDeliveryMutation, useGetDeliveriesQuery } from '../../../Redux/services/deliveries';
import ConfirmAcceptDelivery from '../../ModalContent/ConfirmAcceptDelivery';
import ConfirmDeleteDelivery from '../../ModalContent/ConfirmDeleteDelivery';

interface DeliveriesTableProps {}

const DeliveriesTable: React.FunctionComponent<DeliveriesTableProps> = () => {
    const { data, error, isLoading, refetch } = useGetDeliveriesQuery();
    const [deleteManager] = useDeleteDeliveryMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryId, setDeliveryId] = useState('');
    // const DeleteDelivery = (id: any) => {
    //     deleteManager(id)
    //         // .then(() => setIsOpen(false))
    //         .then(() => refetch());
    // };
    // console.log(data);

    return (
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                delivery
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                weight
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                from
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                to
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                distance
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                shipmentMethod
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                createdBy
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                region
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Available
                            </th>
                            <th scope="col" className="relative py-3 px-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map(
                                (delivery, index) =>
                                    delivery.region == 'national' && (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{delivery.delivery}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.weight}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.from}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.to}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.distance}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.shipmentMethod}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.createdBy}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.region}</td>
                                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{delivery.Available ? 'true' : 'false'}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => {
                                                        setDeliveryId(delivery._id);
                                                        setIsOpen(!isOpen);
                                                    }}
                                                    type="button"
                                                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                >
                                                    Accept
                                                </button>
                                            </td>
                                        </tr>
                                    )
                            )}
                    </tbody>
                </table>
            </div>
            <ConfirmAcceptDelivery isOpen={isOpen} setIsOpen={setIsOpen} deliveryId={deliveryId} />
        </div>
    );
};

export default DeliveriesTable;
