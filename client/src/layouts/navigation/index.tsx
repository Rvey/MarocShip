import { Link } from 'react-router-dom';
import Logo from '../../assets/logo';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
    return (
        <nav className=" bg-ehe-900 w-[14em] z-10  h-screen items-center fixed justify-between py-5 dark:bg-gray-800 mr-10">
            <div className="flex flex-col flex-wrap justify-between items-center mx-auto">
                <div className="flex">
                    <Logo />
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">MarocShip</span>
                </div>

                <div className="flex flex-col mt-4  md:mt-0 md:text-sm md:font-medium">
                    <Link
                        to="/"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/statistics"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Statistics
                    </Link>

                    <Link
                        to="/adminLogin"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
