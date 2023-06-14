import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Col } from 'react-bootstrap';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Vector from '@/assets/Team/sign-up-vector.webp';
import { Person, PersonCircle } from 'react-bootstrap-icons';
import { InputGroup, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Countdown from 'react-countdown';
import Checkbox from '@/Components/Checkbox';
import signup from "@/assets/Team/sign-up-vector.jpg";


export default function Register() {
    let referral;
    let ref_id;
    const { flash } = usePage().props;
    if(window.sessionStorage.getItem("referral")){
        referral = window.sessionStorage.getItem("name");
        ref_id = window.sessionStorage.getItem("referral");
    }
    let session_phone;
    const { data, setData, post, processing, errors, reset } = useForm({

        phone: session_phone || '',
        otp: '',
        remember:'',
        
    });

    const [verify, setVerify] = useState(false);


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
        post(route('OTPVerify'));
    };

    const [showAlert, setAlert] = useState(false);
    const [handleLoad, setHandleLoad] = useState(false);
    const  [messaging, setMessaging] = useState(null);

    const [ counter , setCounter]=useState(null);
    const  [popper, setPopper] =useState(null);

    useEffect(() => {
      const timer = counter < 5 && setInterval(()=>setCounter(counter + 1), 1000);
      return () => {
        clearInterval(timer);
      
      }
    }, [counter])
    
    useEffect(()=>{
        const timing = popper > 0 && setInterval(()=>setPopper(popper - 1), 1000);
        return () => {
            clearInterval(timing);
          }
        }, [ popper])

    const NewOTP=(e)=>{
        e.preventDefault();
        setHandleLoad(true);
        axios.post("/sign-up",{
            'phone': data.phone })
            .then((res)=>{
                if(res.data == "We have sent otp to your number, valid for 2 minutes"){
                    setAlert("success");  
                    setVerify(true);
                    setCounter(40);
                    setMessaging(res.data);
                    setHandleLoad(false);
                   window.sessionStorage.setItem("phone",data.phone);
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

       session_phone=window.sessionStorage.getItem('phone');
   
    if( showAlert =="failed"){
        setInterval(()=>{
            setAlert(null);
        }, 1000 * 10);
    }

    return (
        <GuestLayout>
            <Head title="Register">
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
                    <ApplicationLogo  width="190px"  className="w-20 h-20 fill-current text-gray-500" />
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
        {showAlert == "success" && <Alert variant="">{messaging+" "}<span className="fw-bold">+91 {session_phone ? session_phone:data.phone }</span> </Alert>}
                        {showAlert == "failed" && <Alert variant="danger">{messaging}</Alert>}
                        <InputError message={flash.error} className="mt-2" />

            <form onSubmit={submit}>      
              
              {verify ? <>
                   
                     <div className='mt-2'>
                     <InputLabel forInput="phone" value="One Time Password" />
                     <Form.Control
                                type="number"
                                name="otp"
                                value={data.otp}
                                onChange={onHandleChange}
                                maxLength="4"
                                className="text-center p-2"
                            />
                     </div>
                     <div className="flex mt-3">
                     <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                     <div className=''>
                        By registering here, I agree to Vereda's <Link className="fw-bold" href="/pages/terms-and-conditions">Terms & conditions</Link> and <Link className="fw-bold" href="/pages/privacy-policy">Privacy Policy</Link>
                     </div>
                     </div>
                    <div className="mt-1 w-100">
                    <span className={counter > 1 ? 'text-color-gray fw-bold' : "text-color-dark-blue hidden"}>Resend OTP</span> 
                        <Button onClick={NewOTP} variant='white' className={counter == 0 ? 'fw-bold float-right text-color-dark-blue' : 'disabled float-right fw-bold text-color-gray'}>{counter == 0 ? <>{handleLoad ?  <span className="mr-5 ml-5"><Spinner animation="border" size="sm" className="ml-5 mr-5" role="status" /></span> : "get otp"}</> : counter}</Button>
                    </div>
                <div className="block items-center justify-end mt-3">
                    {data.remember ? 
                    <PrimaryButton  processing={processing}>
                        Verify
                    </PrimaryButton>: 
                    <Button variant="primary" className='disabled mb-5 px-4 py-2  w-100'>Register</Button>
                    }
                    {referral && <button style={{position: "relative", top:"10px", left:"10px"}} className='text-color-white  desktop-hide shadow rounded-full pl-5 pb-1 pt-1 pr-5 bg-color-baby-blue flex'><span className="mr-3 mt-1"><PersonCircle className='text-color-white  fw-bold' /></span> {referral}</button>}
                </div>
              </> :
             <>  <div>
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
               <div className="block ml-auto mr-auto items-center justify-end mt-3">
                <Button variant='primary' onClick={NewOTP} className={data.phone.length < 10 ? "disabled w-100" : "w-100"}>{handleLoad? <span className="mr-5 ml-5"><Spinner animation="border" size="sm" className="ml-5 mr-5" role="status" /></span> :'get otp'} </Button>
               </div>
               </>


}
            </form>
            </div>
            </div>

        </Col>
        </GuestLayout>
    );
}
