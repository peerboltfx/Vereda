import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Col } from 'react-bootstrap';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Vector from '@/assets/Team/sign-up-vector.webp';
import { Person, PersonCircle } from 'react-bootstrap-icons';
import signup from "@/assets/Team/sign-up-vector.jpg";

export default function Register() {
    let referral;
    let ref_id;
    if(window.sessionStorage.getItem("referral")){
        referral = window.sessionStorage.getItem("name");
        ref_id = window.sessionStorage.getItem("referral");
    }
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        referred:ref_id,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" >
            <meta property="og:vereda.co.in" content="https://vereda.co.in/register" />{/**<!-- website link --> */}
            <meta property="og:description" content="Register a free account in vereda digital and start studying at your own comfort. " />{/** <!-- description shown in the actual shared post -->*/}

                    <meta property="og:title" content="Register"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Register a free account in vereda digital and start studying at your own comfort." />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" itemProp='image' content={signup}/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/register" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in/register" />    
             </Head >
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <Col md="6" >
                {referral && <button style={{position: "relative", top:"10px", left:"10px"}} className='text-color-white  mobile-hide shadow rounded-full pl-5 pb-1 pt-1 pr-5 bg-primary flex'><span className="mr-3 mt-1"><PersonCircle className='text-color-white  fw-bold' /></span> {referral}</button>
}
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
            <h4 className='fw-bold ml-auto capitalize  mt-4'>Get started</h4>
           <p className='fs-6 fw-bold Capitalize'>Already Have an account? <Link href={route('login')} className=""><span className="text-blue-sm capitalize">sign in</span></Link>
        </p>
        </div>
        <div className="w-full sm:max-w-md mt-3 overflow-hidden bg-white p-3 sm:rounded-lg">
            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="Name" />

                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className='mt-3'>
                    <InputLabel forInput="name" value="Phone" />

                    <TextInput
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>
                <div className="mt-3">
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-3">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-3">
                    <InputLabel forInput="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                    <div className='mt-3'>
                    <input type="text"
                     value={data.referred}
                      name="referred"
                      hidden
                      className="mt-1 block w-full"
                        handleChange={onHandleChange} />
                    </div>
                <div className="block items-center justify-end mt-3">
                    <PrimaryButton processing={processing}>
                        Register
                    </PrimaryButton>
                    {referral && <button style={{position: "relative", top:"10px", left:"10px"}} className='text-color-white  desktop-hide shadow rounded-full pl-5 pb-1 pt-1 pr-5 bg-color-baby-blue flex'><span className="mr-3 mt-1"><PersonCircle className='text-color-white  fw-bold' /></span> {referral}</button>}
                </div>
            </form>
            </div>
            </div>

        </Col>
        </GuestLayout>
    );
}
