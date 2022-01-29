import { Link } from 'react-router-dom';
import Logo from '../../assets/logo';
import { useAppSelector, useAppDispatch } from '../../Redux/hook';
import { selectCount } from '../../Redux/features/counter/counterSlice';
import { clearData, selectUser } from '../../Redux/features/auth/userSlice';
const Navigation = () => {
    const count = useAppSelector(selectCount);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    return (
        <nav className=" bg-ehe-900 w-[14em] z-10  h-screen items-center fixed justify-between py-5 dark:bg-gray-800 mr-10">
            <div className="flex flex-col flex-wrap justify-between items-center mx-auto">
                <div className="flex">
                    {/* <Logo /> */} logo
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">MarocShip{count}</span>
                </div>
                <div className="flex">
                    {/* <Logo /> */} User
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">{JSON.stringify(user.email)}</span>
                </div>
                <div className="flex flex-col mt-4  md:mt-0 md:text-sm md:font-medium">
                    <Link
                        to="/"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/Managers"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Managers
                    </Link>
                    <Link
                        to="/Drivers"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Drivers
                    </Link>
                    <Link
                        to="/Recruit"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Drivers Recruiting
                    </Link>

                    <Link
                        to="/adminLogin"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        login
                    </Link>
                    <Link
                        to="/managerLogin"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Manager Login
                    </Link>
                    <Link
                        to="/deliveryManagerLogin"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        delivery Manager Login
                    </Link>
                    <Link
                        to="/driverLogin"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Driver Login
                    </Link>
                    <Link
                        to="/driverRegister"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Driver Register
                    </Link>
                    <Link
                        to="/deliveries"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Manage Deliveries
                    </Link>
                    <Link
                        to="/DeliveryMangers"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Manage Delivery Managers
                    </Link>
                    <Link
                        to="/bomb"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        bombField
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(clearData());
                            location.replace('/bomb');
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Log out
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
