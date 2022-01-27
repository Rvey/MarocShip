import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useGetManagersQuery } from '../../../Redux/services/managers';
interface AddDeliveryFormProps {
    setIsOpen: (val: boolean) => void;
}

const DeliverySchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').required('Required'),
    location: Yup.string().required('Required'),
    weight: Yup.number().required('Required')
});
const AddDeliveryForm: React.FC<AddDeliveryFormProps> = ({ setIsOpen }) => {
    const { refetch } = useGetManagersQuery();

    return (
        <Formik
         
            initialValues={{
                location: '',
                name: '',
                shipmentMethod: 'car',
                weight: '',
                from: '',
                to: ''
            }}
            validationSchema={DeliverySchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ errors, touched, values }) => (
                <Form>
                    <div className="mt-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Delivery
                        </label>
                        <Field
                            type="text"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com'
                            name="name"
                        />
                        {errors.name && touched.name ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.name}</div> : null}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Weight
                        </label>
                        <Field
                            type="number"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com'
                            name="weight"
                        />
                        {errors.weight && touched.weight ? <div className="text-red-500 font-semibold dark:text-red-400">{errors.weight}</div> : null}
                    </div>
                    <div className="mt-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            shipmentMethod
                        </label>
                        <Field
                            component="select"
                            id="shipmentMethod"
                            name="shipmentMethod"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="car">car</option>
                            <option value="van">van</option>
                            <option value="truck">truck</option>
                        </Field>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            region
                        </label>
                        <Field
                            component="select"
                            id="location"
                            name="location"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="Europe">Europe</option>
                            <option value="National">National</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Australia">Australia</option>
                        </Field>
                    </div>
                    {values.location === 'National' && (
                        <div className="mt-4 flex w-full gap-4">
                            <div className="w-[50%]">
                                <label htmlFor="from" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    from
                                </label>
                                <Field
                                    component="select"
                                    id="from"
                                    name="from"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="National">National</option>
                                    <option value="Europe">Europe</option>
                                    <option value="America">America</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Australia">Australia</option>
                                </Field>
                            </div>
                            <div className="w-[50%]">
                                <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    to
                                </label>
                                <Field
                                    component="select"
                                    id="to"
                                    name="to"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="National">National</option>
                                    <option value="Europe">Europe</option>
                                    <option value="America">America</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Australia">Australia</option>
                                </Field>
                            </div>
                        </div>
                    )}
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
export default AddDeliveryForm;
