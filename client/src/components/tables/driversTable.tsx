const DriversTable= () => {
    return (
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Delivery
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            weight
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            destination
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            shipmentMethod
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            region
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            createdBy
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            createdAt
                        </th>
                        <th scope="col" className="relative py-3 px-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">name</td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">email</td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">license</td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">TotalTraveled</td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">AcceptedDeliveries</td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">AcceptedDeliveries</td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">AcceptedDeliveries</td>
                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default DriversTable;
