const TopDrivers = () => {
    return ( 
        <div className="p-4 w-[27em] bg-slate-300 rounded-lg border shadow-md sm:p-4 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Top Driver</h3>
        <button  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            Download full list
        </button>
   </div>
   <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
            <li className="p-3 sm:py-4 bg-gray-400 dark:bg-gray-700 rounded-md">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="" alt=""/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        300 Delivery
                    </div>
                </div>
            </li>
        </ul>
   </div>
</div>
     );
}
 
export default TopDrivers;