import Avatar, { genConfig } from 'react-nice-avatar';
import { useGetDriversQuery } from '../../../Redux/services/driver';

interface TopDriversProps {
    AvatarConfig: string;
}
const TopDrivers: React.FC<TopDriversProps> = () => {
    const AvatarConfig = 'className';
    // @ts-ignore
    const config = genConfig(AvatarConfig);

    const { data } = useGetDriversQuery();

    return (
        <div className="p-4 w-[27em] bg-slate-300 rounded-lg border shadow-md sm:p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Top Driver</h3>
            </div>
            <div className='flex flex-col gap-5'>

                {
                    data && data.slice(0, 5).map((driver: any) => {
                        return (
                            <div className="p-3 sm:py-4 bg-gray-400 dark:bg-gray-700 rounded-md">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-red-600 rounded-full" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{driver.name}</p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">{driver.email}</p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{driver.TotalTraveledDistance} Delivery</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default TopDrivers;
