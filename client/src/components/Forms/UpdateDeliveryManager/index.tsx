import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetDeliveryManagerQuery, useGetDeliveryManagersQuery, useUpdateDeliveryManagerMutation } from '../../../Redux/services/deliveryManager';
interface UpdateDManagerFormProps {
    setIsOpen: (val: boolean) => void;
    dManagerId: string;
}
const DriverSchema = Yup.object().shape({
    firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required')
});

const UpdateDeliveryManagerFrom: React.FC<UpdateDManagerFormProps> = ({ setIsOpen, dManagerId }) => {

    const { refetch } = useGetDeliveryManagersQuery();
    const { data, error, isLoading, refetch: re } = useGetDeliveryManagerQuery(dManagerId);
    const [updateDM, { isLoading: isUpdating }] = useUpdateDeliveryManagerMutation();

    return (
        <Formik
            initialValues={{
                email: data?.email || '',
                lastName: data?.lastName || '',
                firstName: data?.firstName || ''
            }}
            enableReinitialize
            validationSchema={DriverSchema}
            onSubmit={(values) => {
                updateDM({ id: dManagerId, ...values })
                    .then(() => setIsOpen(false))
                    .then(() => refetch());
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className="mt-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            firstName
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
                            lastName
                        </label>
                        <Field
                            type="text"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com'
                            name="lastName"
                        />
                        {errors.lastName && touched.lastName ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.lastName}</div> : null}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            email
                        </label>
                        <Field
                            type="email"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com'
                            name="email"
                        />
                        {errors.email && touched.email ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.email}</div> : null}
                    </div>
                    <div className="mt-8 flex justify-between">
                        <button
                            type="submit"
                            className="w-[12em] text-green-900 bg-white border border-green-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-gray-700 dark:focus:ring-green-800"
                        >
                            save
                        </button>
                        <button
                            type="submit"
                            className="w-[12em] text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                        >
                            cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default UpdateDeliveryManagerFrom;
