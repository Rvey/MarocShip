interface StatsCardsProps {
    title: string;
    stats: string;
    icon: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ title, stats, icon }) => {
    return (
        <div>
            <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-700 dark:text-gray-400">{title}</h5>
                <p className="font-semibold text-2xl text-gray-900 dark:text-white ">
                    {icon} 500 {stats}
                    </p>
            </div>
        </div>
    );
};

export default StatsCards;
