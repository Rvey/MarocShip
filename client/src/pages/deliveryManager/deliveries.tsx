import DeliveriesTable from '../../components/tables/deliveriesTable';

interface DeliveriesProps {}

const Deliveries: React.FunctionComponent<DeliveriesProps> = () => {
    return (
        <div>
            <h1 className="text-4xl font-black dark:text-white py-14">Deliveries</h1>
            <DeliveriesTable />
        </div>
    );
};

export default Deliveries;
