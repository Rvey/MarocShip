import ManagerTable from '../../../components/tables/managersTable';

const HandleManagers = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black dark:text-white py-14">Managers</h1>
                <button
                    type="button"
                    className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add Managers
                </button>
            </div>
            <ManagerTable />
        </div>
    );
};

export default HandleManagers;
