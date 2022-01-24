import DeliveryMForm from '../../components/forms/Auth/deliveryMLogin';

interface DeliveryManagerProps {}

const DeliveryManager: React.FunctionComponent<DeliveryManagerProps> = () => {
    return (
        <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
            <div className="p-4 w-[43em] bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-9 dark:bg-gray-800 dark:border-gray-700">
                <DeliveryMForm />
            </div>
        </div>
    );
};

export default DeliveryManager;