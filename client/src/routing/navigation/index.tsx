import { Link, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../Redux/hook';
import { selectCount } from '../../Redux/features/counter/counterSlice';
import { clearData, selectUser } from '../../Redux/features/auth/userSlice';
import tw from 'twin.macro';
const Navigation = () => {
    const count = useAppSelector(selectCount);
    const user = useAppSelector(selectUser).role;
    const dispatch = useAppDispatch();
    
    return (
        <nav className=" bg-ehe-900 w-[14em] z-10  h-screen items-center fixed justify-between py-5 dark:bg-gray-800 mr-10">
            <div className="flex flex-col flex-wrap justify-between items-center mx-auto">
                <div className="flex">
                    {/* <Logo /> */} logo
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">MarocShip</span>
                </div>
                <div className="text-white">{user ? 'logged' : 'not logged'}</div>
                <div className="flex">
                    {/* <Logo /> */} User
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">{user}</span>
                </div>
                <div className="flex flex-col mt-4  md:mt-0 md:text-sm md:font-medium">
                    <div>Admin Route</div>

                    <Link
                        to="/"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/Recruit"
                        className=" text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Drivers Recruiting
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
                    <div>manager Route</div>

                    <Link
                        to="/DeliveryMangers"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Manage Delivery Managers
                    </Link>

                    <div>driver Route</div>

                    <Link
                        to="/AcceptDeliveries"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Accept Deliveries
                    </Link>
                    <div>delivery manager Route</div>

                    <Link
                        to="/deliveries"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        Manage Deliveries
                    </Link>

                    <div>Auth Route</div>

                    <Link
                        to="/adminLogin"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        admin login
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


                    <div>Reset Password</div>
                    <Link
                        to="/restManagerPassword"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        ResetManagerPassword
                    </Link>
                    <Link
                        to="/restDriverPassword"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        ResetDriverPassword
                    </Link>
                    <Link
                        to="/restDManagerPassword"
                        className="  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        ResetDeliveryManagerPassword
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
                            <Navigate to={`/bomb`} />;
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
