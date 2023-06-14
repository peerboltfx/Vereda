import React, { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Col } from 'react-bootstrap';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Vector from '@/assets/Team/vector-sign-in.webp';
import { Row, Tab, Tabs } from 'react-bootstrap';
import axios from "axios";
import { InputGroup, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Inertia } from "@inertiajs/inertia";
import signup from "@/assets/Team/sign-up-vector.jpg";



export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
        phone:"",
        otp:""
    });
    const [key, setKey] = useState('OTP');
    const [showAlert, setAlert] = useState(false);
    const [handleLoad, setHandleLoad] = useState(false);
    const  [messaging, setMessaging] = useState(null);
    const [ counter , setCounter]=useState(null);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));

    };

    const submitotp = (e) => {
        e.preventDefault();

        Inertia.post('/login/confirm-otp',{
            "phone":data.phone,
            "otp":data.otp
        });
    };

    useEffect(() => {
        const timer = counter > 0 && setInterval(()=>setCounter(counter - 1), 1000);
        return () => {
          clearInterval(timer);
        
        }
      }, [counter])
    
    const NewOTP=(e)=>{
        e.preventDefault();
        setHandleLoad(true);
        axios.post("/login/request-otp",{
            'phoneNo': data.phone })
            .then((res)=>{
                if(res.data == "We have sent otp to your number, valid for 2 minutes"){
                    setAlert("success");  
                    setVerify(true);
                    setCounter(40);
                    setMessaging(res.data);
                    setHandleLoad(false);

                }
               else{
                setAlert("success"); 
                setMessaging(res.data);
                setHandleLoad(false);
               }
                
            }).catch((err)=>{
                console.log(err);
                setHandleLoad(false);
                 setAlert("failed");
                 setMessaging("Error processing file, try Again");

            })
    }
    return (
        <GuestLayout>
            <Head title="Log in" >
            <meta property="og:vereda.co.in" content="https://vereda.co.in/login" />{/**<!-- website link --> */}
            <meta property="og:description" content="Login into your account to continue your studies.  " />{/** <!-- description shown in the actual shared post -->*/}

                    <meta property="og:title" content="Login"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Login into your account to continue your studies. " />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" itemProp='image' content={signup}/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/login" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in/login" />    
             </Head >

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <Col md="6" >
        <div className="min-h-screen flex flex-col p-3 pt-6 sm:pt-0 bg-gray-100">
            <div className='mt-20 desktop-hide flex flex-col items-center'>
                <Link href="/">
                    <ApplicationLogo width="190px" className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="">
            <div className='desktop-hide w-100 flex-col flex items-center'>
            <img src={Vector} />
            </div>
            <h4 className='fw-bold mt-5 capitalize'>Get started</h4>
           <p className='fw-bold fs-6 capitalize'>Dont have an account? <Link href='/register' className=""><span className="text-blue-sm capitalize">click here</span></Link>
        </p>
        </div>
        <Tabs
                            id="justify-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 ml-0 bg-white shadow-sm sm:rounded-lg pt-1 pb-1" 
                            justify
                            >
                          <Tab eventKey="OTP"  title="OTP Login">
                          <div className="w-full mt-6 overflow-hidden sm:rounded-lg">
                                <form onSubmit={submitotp} className='w-100 flex items-center flex-col'>
                                {showAlert == "success" && <Alert variant="">{messaging+" "}<span className="fw-bold"></span> </Alert>}
                        {showAlert == "failed" && <Alert variant="danger">{messaging}</Alert>}
  
                                <div  className='mt-6 px-6 py-4 bg-white login-tab shadow-md overflow-hidden sm:rounded-lg'>
                                    <div>
                                    <InputLabel forInput="phone" value="Phone" />
                                        <InputGroup className='mb-3'>
                                        <InputGroup.Text>+91</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={data.phone}
                                                onChange={onHandleChange}
                                            />

                                        <InputError message={errors.phone} className="mt-2" />
                                        </InputGroup>
                                    </div>

                                    <div className="mt-4">
                                            <InputGroup className='mb-3'>
                                                    <Form.Control
                                                        type="text"
                                                        name="otp"
                                                        value={data.otp}
                                                        onChange={onHandleChange}
                                                    />
                                                <button  onClick={NewOTP} className={data.phone.length < 10 ? "disabled bg-primaries sm:rounded-full text-color-white pl-4 pr-4 " : "bg-primaries sm:rounded-full text-color-white "}>{handleLoad? <span className="mr-5 ml-5"><Spinner animation="border" size="sm" className="ml-5 mr-5" role="status" /></span> :'get otp'}</button>
                                            </InputGroup>
                                    </div>
                                    </div>

                                    <div className="block items-center w-80 justify-end mt-10 mb-5">
                                        <PrimaryButton processing={processing}>
                                            Verify OTP
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                            </Tab>
                            <Tab eventKey="Email" title="Email Login">
                            <div className="w-full mt-6 overflow-hidden sm:rounded-lg">
                                <form onSubmit={submit} className='w-100 flex items-center flex-col'>
                                <div  className='mt-6 px-6 py-4 bg-white  login-tab shadow-md overflow-hidden sm:rounded-lg'>
                                    <div>
                                        <InputLabel forInput="email" value="Email" />
                                                <TextInput
                                                    type="text"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    isFocused={true}
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
                                            autoComplete="current-password"
                                            handleChange={onHandleChange}
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    </div>

                                    <div className="block items-center justify-end mt-10 mb-5">
                                    {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="underline text-sm float-right mr-2 text-blue-sm hover:text-gray-900"
                                            >
                                                Forgot your password?
                                            </Link>
                                        )}  
                                    <label className="flex float-left">
                                            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                                            <span className="ml-2 mb-4 text-sm text-gray-600">Remember me</span>
                                        </label>
                                    

                                        <PrimaryButton processing={processing}>
                                            Log in
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                            </Tab>
                           
                        </Tabs>
          
            </div>
        </Col>
        <Col md="6" >
        <div className="min-h-screen mobile-hide flex flex-col sm:justify-center item-center pt-6 sm:pt-0">
        <div className='mt-20 ml-auto mr-auto'>
                <Link href="/">
                    <ApplicationLogo width="250px" className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div style={{width:"70%"}} className='ml-auto mr-auto'>
            <img src={Vector} />
            </div>
            </div>
        </Col>
        </GuestLayout>
    );
}
