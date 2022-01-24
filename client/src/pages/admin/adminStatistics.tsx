import TopDrivers from '../../components/board/driversBoard';
import StatsCards from '../../components/cards/stats';
import LineChart from '../../components/charts/line';
import PieChart from '../../components/charts/Pie';
import ManagerTable from '../../components/tables/managersTable';

const AdminDash = () => {

    return (
        <div>
            <h1 className="text-4xl font-extrabold py-7 dark:text-white">Admin Dashboard</h1>
            <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                <div className="w-[70%]">
                    <div className="flex gap-4 flex-col xl:flex-row">
                        <StatsCards title="Total Handled Deliveries" icon="*" stats="Delivery" />
                        <StatsCards title="Total Drivers" icon="*" stats="Driver" />
                        <StatsCards title="Total Managers" icon="*" stats="Manager" />
                    </div>
                    <h2 className="text-3xl font-medium py-6 dark:text-white">Statistics</h2>

                    <LineChart />
                    <div className="w-[50%] mt-[5em]">
                        <PieChart />
                    </div>
                </div>
                <div className="w-[30%]">
                    <TopDrivers />
                </div>
            </div>
        </div>
    );
};

export default AdminDash;
