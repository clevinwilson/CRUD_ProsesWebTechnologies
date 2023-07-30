import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addUser, getUserDetails, updateUserDetails } from '../services/userApi';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserForm({ title, button, role }) {
    const [initialValues, setUnitialValues] = useState({ name: '', email: '', phone: '', address: '', image: '' })

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (role === 'edit') {
            getUserDetails(id)
                .then((response) => {
                    console.log(response.data.user.name);
                    setUnitialValues({
                        name: response.data.user.name,
                        email: response.data.user.email,
                        phone: response.data.user.phone,
                        address: response.data.user.address
                    })
                })
                .catch((err) => {
                    toast.error(err.error.message, {
                        position: "top-right",
                    });
                })
        }
    }, [id, role])


    //Yup form validation
    const validate = Yup.object({
        name: Yup
            .string()
            .trim()
            .required("Please provide name")
            .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
        phone: Yup
            .string()
            .required("Number is Required")
            .matches(/^\+?[0-9]{6,14}$/, 'Invalid phone number'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is Required'),
        address: Yup
            .string()
            .required("Please provide Address"),
        image: Yup.mixed()
            .required('Image is required')
            .test('fileType', 'Only image files are allowed', (value) => {
                if (!value) return true; // Don't run the test if no file is selected
                return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            })
            .test('fileSize', 'The image size is too large', (value) => {
                if (!value) return true; // Don't run the test if no file is selected
                return value && value.size <= 20000000; // 20MB (in bytes)
            }),
    });


    //submiting the form data
    const onSubmit = (values) => {
        console.log(values);
        //addin a new user
        if (role == 'add') {
            addUser(values)
                .then(() => {
                    toast.success("User added successfully", {
                        position: "top-right",
                    });
                    navigate('/');
                })
                .catch((err) => {
                    toast.error(err.error.message, {
                        position: "top-right",
                    });
                })
        } else if (role === 'edit') {
            //updating the user detail in edit page
            updateUserDetails(id, values)
                .then((response) => {
                    if (response.data.status) {
                        toast.success("User details Updated successfully", {
                            position: "top-right",
                        });
                    }
                })
                .catch((err) => {
                    toast.error(err.error.message, {
                        position: "top-right",
                    });
                })
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <Formik initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validate}
                onSubmit={onSubmit}>
                {({ isSubmiting, setFieldValue }) => (<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                                {title}
                            </h1>
                            <Form className="space-y-4 md:space-y-6" >
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
                                    <ErrorMessage name="name" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
                                    <Field type="phone" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" />
                                    <ErrorMessage name="phone" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                    <ErrorMessage name="email" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
                                    <Field type="address" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" />
                                    <ErrorMessage name="address" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your image</label>
                                    <Field name='image' >
                                        {({ field }) => (
                                            <input name="image"
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help"
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setFieldValue('image', event.currentTarget.files[0]);
                                                }} />
                                        )}
                                    </Field>

                                    <ErrorMessage name="image" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <button type="submit" className="w-full  bg-primary-600 bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">{button}</button>
                            </Form>
                        </div>
                    </div>
                </div>)}
            </Formik>
        </section>
    )
}

export default UserForm