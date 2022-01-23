import TopDrivers from '../../../components/board/driversBoard';
import StatsCards from '../../../components/cards/stats';
import ManagerTable from '../../../components/tables/managersTable';

const AdminDash = () => {
    return (
        <div>
            <h1 className="text-4xl font-extrabold py-7">Admin Dashboard</h1>
            <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                <div className="w-[70%]">
                    <h2 className="text-3xl font-medium py-4">Stats</h2>
                    <div className="flex gap-4 flex-col xl:flex-row">
                        <StatsCards title="Total Handled Deliveries" icon="icon" stats="Delivery" />
                        <StatsCards title="Total Drivers" icon="icon" stats="Driver" />
                        <StatsCards title="Total Managers" icon="icon" stats="Manager" />
                    </div>
                    <h2 className="text-3xl font-medium py-6">Managers</h2>
                    <ManagerTable />
                </div>
                <div className="w-[30%]">
                    <h2 className="text-3xl font-medium py-4">drivers</h2>
                    <TopDrivers />
                </div>
            </div>
        </div>
    );
};

export default AdminDash;
