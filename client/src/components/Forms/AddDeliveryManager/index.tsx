import { Formik, Form, Field, ErrorMessage } from 'formik';
import  { useState } from 'react';
import * as Yup from 'yup';
import { useAddDeliveryManagerMutation, useGetDeliveryManagersQuery } from '../../../Redux/services/deliveryManager';

const DriverSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
});

const AddDeliveryMangerForm = () => {
    const [addDeliveryManager] = useAddDeliveryManagerMutation();
    const { data, refetch } = useGetDeliveryManagersQuery();
    const [error, setError] = useState('');
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={DriverSchema}
            onSubmit={(values) => {
                addDeliveryManager(values)
                .then(() => refetch())
                .catch((error) => setError(error?.data.message));
            }}
        >
            {({ errors, touched }) => (
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
                    <div className="mt-8 flex justify-between">
                        <button
                            type="submit"
                            className="w-[12em] text-green-900 bg-white border border-green-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-gray-700 dark:focus:ring-green-800"
                        >
                            Save
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default AddDeliveryMangerForm;
