import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useResetManagerPwdMutation } from '../../../../Redux/services/managers';

const DriverSchema = Yup.object().shape({
    Password: Yup.string().min(4, 'Too Short!').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required')
});

const ResetManagerPwd = () => {
    const [updateMPwd] = useResetManagerPwdMutation();
    return (
        <Formik
            initialValues={{
                email: '',
                Password: ''
            }}
            validationSchema={DriverSchema}
            onSubmit={(values) => {
                updateMPwd(values)             
            }}
        >
            {({ errors, touched }) => (
                <Form>
                     <div className='font-medium text-2xl'>Reset Password</div>
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
                        <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Password
                        </label>
                        <Field
                            type="password"
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="Password"
                        />
                        {errors.Password && touched.Password ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.Password}</div> : null}
                    </div>
                    <div className="mt-8 flex justify-between">
                        <button
                            type="submit"
                            className="w-[12em] text-green-900 bg-white border border-green-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-gray-700 dark:focus:ring-green-800"
                        >
                            Reset Password
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default ResetManagerPwd;
