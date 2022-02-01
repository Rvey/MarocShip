import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAddManagerMutation, useGetManagersQuery } from '../../../Redux/services/managers';
import Alert from '../../Shared/Alert';
import LoadingSpinner from '../../Shared/LoadingSpinner';
interface AddManagerFormProps {
    setIsOpen: (val: boolean) => void;
}

const AddManagerForm: React.FC<AddManagerFormProps> = ({ setIsOpen }) => {
    const { refetch } = useGetManagersQuery();
    const [addModal, { isError, isLoading }] = useAddManagerMutation();
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
            lastName: '',
            firstName: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required')
        }),
        onSubmit: async (values: any) => {
            // console.log(values);
            addModal(values)
                .unwrap()
                .then(() => {
                    setIsOpen(false);
                    refetch();
                })
                .catch((error) => setError(error.data.error));
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {isLoading && <LoadingSpinner size="22" />}
            {isError && <Alert error={error} />}
            <div className="mb-6">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    First Name
                </label>
                {formik.touched.firstName && formik.errors.firstName ? <div className="text-red-400 ">{formik.errors.firstName}</div> : null}
                <input
                    id="firstName"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com'
                    type="text"
                    {...formik.getFieldProps('firstName')}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Last Name
                </label>
                {formik.touched.lastName && formik.errors.lastName ? <div className="text-red-400">{formik.errors.lastName}</div> : null}
                <input
                    id="lastName"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com'
                    type="text"
                    {...formik.getFieldProps('lastName')}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Email Address
                </label>
                {formik.touched.email && formik.errors.email ? <div className="text-red-400 p-1">{formik.errors.email}</div> : null}
                <input
                    id="email"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com'
                    type="email"
                    {...formik.getFieldProps('email')}
                />
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    type="submit"
                    className="text-green-900 bg-white border border-green-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-gray-700 dark:focus:ring-green-800"
                >
                    save
                </button>
                <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                    onClick={() => setIsOpen(false)}
                >
                    cancel
                </button>
            </div>
        </form>
    );
};
export default AddManagerForm;
