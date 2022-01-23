import StatsCards from '../../components/adminStats/statsCards';
import TopDrivers from '../../components/adminStats/topDrivers';

const AdminDash: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">

                <div>
                    <div className="flex gap-4 flex-col xl:flex-row">
                        <StatsCards title="Total Handled Deliveries" icon="icon" stats="Delivery" />
                        <StatsCards title="Total Drivers" icon="icon" stats="Driver" />
                        <StatsCards title="Total Managers" icon="icon" stats="Manager" />
                    </div>

                </div>

                <TopDrivers />
            </div>
        </div>
    );
};

export default AdminDash;
