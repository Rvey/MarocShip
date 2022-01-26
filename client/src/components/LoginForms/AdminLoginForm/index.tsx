import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
interface UpdateManagerFormProps {
    values?: any;
}

const AdminLoginForm: React.FC<UpdateManagerFormProps> = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            password: Yup.string().min(6, 'Must be 6 characters at least').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required')
        }),
        onSubmit: async (values, id: any) => {
            console.log(values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-8">Admin Sign in</h3>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Email
                </label>
                {formik.touched.email && formik.errors.email ? <div className="text-red-400 p-1">{formik.errors.email}</div> : null}
                <input
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Password
                </label>
                {formik.touched.password && formik.errors.password ? <div className="text-red-400 p-1">{formik.errors.password}</div> : null}
                <input
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
            </div>
            <Link to="" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                reset Password?
            </Link>
            <div className="mt-4">
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login to your account
                </button>
            </div>
        </form>
    );
};
export default AdminLoginForm;
