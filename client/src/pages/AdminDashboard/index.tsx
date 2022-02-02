import { useEffect, useState } from 'react';
import TopDrivers from '../../components/Dashboard/board';
import StatsCards from '../../components/Dashboard/cards';
import LineChart from '../../components/Dashboard/charts/line';
import PieChart from '../../components/Dashboard/charts/Pie';
import { useGetDeliveriesQuery } from '../../Redux/services/deliveries';
import { useGetDriversQuery } from '../../Redux/services/driver';
import { useGetManagersQuery } from '../../Redux/services/managers';

const AdminDashboard = () => {
    const { data: deliveries } = useGetDeliveriesQuery();
    const { data: managers } = useGetManagersQuery();
    const { data: drivers } = useGetDriversQuery();
    const [driversCount, setDriverCount] = useState<number>();
    const [deliveryCount, setDeliveryCount] = useState<number>();
    const [ManagerCount, setManagerCount] = useState<number>();

    useEffect(() => {
        // @ts-ignore
        setDeliveryCount(deliveries?.filter((delivery) => delivery.Available === true)?.length);
        setManagerCount(managers?.length);
        setDriverCount(drivers?.length);
    }, [deliveries]);

    return (
        <div>
            <h1 className="text-4xl font-extrabold py-7 dark:text-white">Admin Dashboard</h1>
            <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                <div className="w-[70%]">
                    <div className="flex gap-4 flex-col xl:flex-row">
                        <StatsCards title="Total Handled Deliveries" icon="*" stats={deliveryCount} user="Deliveries" />
                        <StatsCards title="Total Drivers" icon="*" stats={driversCount} user="Drivers" />
                        <StatsCards title="Total Managers" icon="*" stats={ManagerCount} user="Managers" />
                    </div>
                    <h2 className="text-3xl font-medium py-6 dark:text-white">Statistics</h2>

                    <LineChart />
                    {/* <div className="w-[50%] mt-[5em]">
                        <PieChart />
                    </div> */}
                </div>
                <div className="w-[30%]">
                    <TopDrivers AvatarConfig={''} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
