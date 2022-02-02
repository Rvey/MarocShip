interface StatsCardsProps {
    title: string;
    stats: any;
    icon: string;
    user:string
}

const StatsCards: React.FC<StatsCardsProps> = ({ title, stats, icon , user }) => {
    return (
        <div>
            <div className="w-[18em] block p-6 max-w-sm bg-slate-300 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-700 dark:text-gray-400">{title}</h5>
                <p className="font-semibold text-2xl text-gray-900 dark:text-white ">
                {stats} {user}
                    </p>
            </div>
        </div>
    );
};

export default StatsCards;
