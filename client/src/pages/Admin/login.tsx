import { useState } from 'react';
import { Link } from 'react-router-dom';

// interface AdminLoginProps {
//     email: string;
//     password: string;
// }

const AdminLogin: React.FC = () => {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const admin = {
        email: email,
        password: password
    };
    const Submit = (e: any) => {
        e.preventDefault();
        console.log(admin);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
            <div className="p-4 w-[43em] bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-9 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-8 " action="#">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in</h3>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Your password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <Link to="" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                            reset Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        onClick={(e) => Submit(e)}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login to your account
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AdminLogin;
