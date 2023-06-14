import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm,Link } from '@inertiajs/inertia-react';
import { Col } from 'react-bootstrap';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Vector from '@/assets/Team/sign-up-vector.webp';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

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
            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
            </div>
            </div>
        </Col>
        </GuestLayout>
    );
}
