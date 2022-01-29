import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useAddDriverMutation, useGetDriversQuery } from '../../../Redux/services/driver';

const DriverSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').required('Required'),
    lastName: Yup.string().required('Required'),
    license: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required')
    // filename: Yup.string().required('Required'),
    // filename:Yup.array().min(1,"select at least 1 file"
});
const DriverRegisterForm = () => {
    const [addDriver] = useAddDriverMutation();
    let navigate = useNavigate();
    const [error, setError] = useState('');
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                license: '',
                email: '',
                file: ''
            }}
            validationSchema={DriverSchema}
            onSubmit={(values) => {
                let data = new FormData();
                data.append('file', values.file);
                data.append('firstName', values.firstName);
                data.append('lastName', values.lastName);
                data.append('license', values.license);
                data.append('email', values.email);
                // @ts-ignore
                addDriver(data)
                    .unwrap()
                    .then(() => navigate('/bomb'))
                    .catch((error) => setError(error?.data.message));
            }}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form>
                    {error && (
                        <div className="py-2 px-3 bg-red-500 w-full text-white rounded-md flex justify-between">
                            {error} <button onClick={() => setError('')}>X</button>
                        </div>
                    )}

                    <div className="mt-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            FirstName
                        </label>
                        <Field
                            type="text"
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="firstName"
                        />
                        {errors.firstName && touched.firstName ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.firstName}</div> : null}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            LastName
                        </label>
                        <Field
                            type="text"
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="lastName"
                        />
                        {errors.lastName && touched.lastName ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.lastName}</div> : null}
                    </div>
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
                        <label htmlFor="license" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            License
                        </label>
                        <Field
                            component="select"
                            id="license"
                            name="license"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled>
                                Select license
                            </option>
                            <option value="Car">Car</option>
                            <option value="Van">Van</option>
                            <option value="Truck">Truck</option>
                        </Field>

                        <div className="mt-4">
                            <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Upload your resume
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file"
                                name="file"
                                type="file"
                                onChange={(e) => {
                                    e.target.files && setFieldValue('file', e.target.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                        <button
                            type="submit"
                            className="w-[12em] text-green-900 bg-white border border-green-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-gray-700 dark:focus:ring-green-800"
                        >
                            Register
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default DriverRegisterForm;
