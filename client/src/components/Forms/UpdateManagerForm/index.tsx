import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDeleteManagerMutation, useGetManagerQuery, useGetManagersQuery, useUpdateManagerMutation } from '../../../Redux/services/managers';
import { Formik, Field, Form, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
interface SignupFormProps {
    setIsOpen: (val: boolean) => void;
    manager: number;
}

const SignupForm: React.FC<SignupFormProps> = ({ setIsOpen, manager }) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const {refetch} = useGetManagersQuery()
    const { data, error, isLoading , refetch:re } = useGetManagerQuery(manager);
    const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation();
    const [deleteManager] = useDeleteManagerMutation();

    const formik = useFormik({
        initialValues: {
            id: data?._id,
            email: data?.email || '',
            lastName: data?.name || '',
            firstName: data?.name || ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required')
        }),
        onSubmit: async (values: any, id: any) => {
            await updateManager({ id, ...values }).then(() => setIsOpen(false)).then(() => refetch()).then(() => re());
        }
    });

    const DeleteManager = (id: any) => {
        deleteManager(id).then(() => setIsOpen(false)).then(() => refetch());
    };

    return (
        <form onSubmit={formik.handleSubmit}>
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
            <div className="mt-4 space-x-2">
                <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 dark:bg-green-300"
                >
                    update
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-red-300"
                    onClick={() => DeleteManager(manager)}
                >
                    delete
                </button>
            </div>
        </form>
    );
};
export default SignupForm;
