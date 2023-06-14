import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm,Link } from '@inertiajs/inertia-react';
import { Col } from 'react-bootstrap';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Vector from '@/assets/Team/sign-up-vector.webp';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Col md="6" >
        <div className="min-h-screen mobile-hide flex flex-col sm:justify-center item-center pt-6 sm:pt-0">
        <div className='mt-10 ml-auto mr-auto'>
                <Link href="/">
                    <ApplicationLogo  width="250px" className="w-20 h-20 fill-current text-gray-500" />
                </Link>
                
            </div>
            <div style={{width:"70%"}} className='ml-auto mr-auto'>
            <img src={Vector} />
            </div>
            </div>
        </Col>
        <Col md="6">
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div className='desktop-hide mt-10 ml-auto mr-auto'>
                <Link href="/">
                    <ApplicationLogo width="190px" className="w-20 h-20 fill-current text-gray-500" />
                </Link>
                
            </div>
            <div className="">
            <div className='ml-auto desktop-hide w-80 mr-auto'>
            <img src={Vector} />
            </div>
            <div className="mb-4 p-5 text-sm text-gray-500 leading-normal">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className="p-5">
                <TextInput
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton processing={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
            </div>
            </div>
        </Col>
        </GuestLayout>
    );
}
