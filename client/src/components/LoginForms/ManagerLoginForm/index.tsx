import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useLoginManagerMutation } from '../../../Redux/services/managers';
import { useAppDispatch } from '../../../Redux/hook';
import { userData } from '../../../Redux/features/auth/userSlice';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Alert from '../../Shared/Alert';
interface ManagerLoginFormProps {
    values?: {
        email: string;
        password: string;
    };
}
const DriverSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(2, 'Too Short!').required('Required')
});

const ManagerLoginForm: React.FC<ManagerLoginFormProps> = () => {
    const [ManagerLogin, { error, isError , isLoading }] = useLoginManagerMutation();
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={DriverSchema}
            onSubmit={async (values) => {
                await ManagerLogin(values)
                    .unwrap()
                    .then((payload) =>
                    {    dispatch(
                            userData({
                                token: payload.token,
                                role: payload.role,
                                email: payload.email
                            })
                        )
                        navigate('/DeliveryMangers')
                    }
                    );
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div>Manager Login</div>
                    {isLoading && <LoadingSpinner size="22" />}
                    {isError && <Alert error={error.data?.message} />}
                    <div className="mt-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email
                        </label>
                        <Field
                            type="text"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="email"
                        />
                        {errors.email && touched.email ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.email}</div> : null}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Password
                        </label>
                        <Field
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="password"
                        />
                        {errors.password && touched.password ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.password}</div> : null}
                    </div>
                    <div className="mt-4">
                        <Link to="/restManagerPassword" className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                            Reset Password?
                        </Link>
                    </div>
                    <div className="mt-8 flex justify-between">
                        <button
                            type="submit"
                            className="w-[12em] text-green-900 bg-white border border-green-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-gray-700 dark:focus:ring-green-800"
                        >
                            login
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default ManagerLoginForm;
