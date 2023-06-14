import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Form, Row, Alert } from 'react-bootstrap';
import "../../../css/style.css";
import DOMPurify from "dompurify";
import { Book, PlayBtnFill } from 'react-bootstrap-icons';
import { Inertia } from '@inertiajs/inertia';



export default function Dashboard(props) {
    const {user, profile, subscription, programs,notification, flash} = usePage().props;

    const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
      }
      const [values, setValues] = useState({
        "search":"",
        "message":"",
        "discount":"",
    });
      const [show,setShow] = useState(false);
      const HandleShow=()=>{
          setShow(true);
      }
      const HandleChange=(e)=>{
         const key = e.target.name;
         const value = e.target.value;
         setValues(values=>({
          ...values,
          [key]:value,
         }))
      }  
      
      const handleMessage=(e)=>{
        e.preventDefault();
        Inertia.post("/admin/sendMessage",{
            message:values.message,
            UserId: user.id, 
        })
      }

      const handleDiscount=(e)=>{
        e.preventDefault();
        Inertia.post("/admin/sendDiscount",{
            message:values.discount,
            UserId: user.id, 
        })
      }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">{profile ?profile.firstname+" "+profile.lastname: user.name}</h2>
                <h3 className="fs-4 text-color-blue"> {user.role} </h3>
            </>}
          >
            <Head title={user.name} />

            <div className="py-12">
                <div className="  sm:px-6 lg:px-8">
                    <div className=" overflow-hidden  sm:rounded-lg">
                        <div className="p-6 border-gray-200 profiles-style">
                            <Row className='header-block'>
                                <Col lg="6" md="6" sm="12" className="mb-4"><h3 className="fw-bold">Personal Information</h3>
                                    <ul className='bg-white p-3 rounded shadow-sm'>
                                        <li><span className='fw-bold mr-5'>User Name</span>{user.name}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Full Name :</span>{profile ? profile.firstname+" "+profile.lastname : ""}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Country :</span>{profile ? profile.country : ""}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Gender :</span>{profile ? profile.gender : ""}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>DoB :</span>{profile ? profile.birthDate : ""}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Phone :</span>{profile ? profile.phone: user.phone}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Address :</span>{profile ? profile.address: user.phone}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Parent Name :</span>{profile ? profile.parentName: user.phone}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Desire :</span>{profile ? profile.desire: user.phone}</li> <hr/>
                                   </ul>
                                </Col>
                                <Col lg="6" md="6" sm="12" className="mb-4">
                                {subscription ? <>
                                    <h3 className='fw-bold mb-2'>Academic Information</h3>
                                    <ul className='bg-white p-3 rounded shadow-sm'>
                                        <li><span className='fw-bold mr-5'>Program name</span>{subscription.program}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Admissopn Date :</span>{new Date(`${subscription.created_at}`).toLocaleDateString()+" "+new Date(`${subscription.created_at}`).toLocaleTimeString()}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Method :</span>{subscription.method}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Batch :</span> Batch {subscription.batch}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Payment Amount :</span>{subscription.amount}</li> <hr/>
                                        <li><span className='fw-bold mr-5'>Expiration Date :</span>{subscription.expires_at}</li> <hr/>
                                         </ul>
                                    
                                </> : ""}

                                <div className='w-100 mt-3 p-3 bg-white'><h5 className='fw-bold'>Send Message</h5>
                                        <form onSubmit={handleMessage} method="POST">
                                            <textarea
                                            className="w-100"
                                            name="message"
                                            onChange={HandleChange}
                                            value={values.message}
                                            />
                                            <div className="mt-3">
                                            <input type="submit" value="submit" className="bg-primaries rounded-full pt-1 pb-1 pl-5 text-color-white pr-5" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='w-100 mt-3 p-3 bg-white'><h5 className='fw-bold'>Send Discount Code </h5>
                                        <form onSubmit={handleDiscount} method="POST">
                                            <input
                                            type="text"
                                            className="w-100"
                                            name="discount"
                                            onChange={HandleChange}
                                            value={values.discount}
                                            />
                                            <div className="mt-3">
                                            <input type="submit" value="submit" className="bg-primaries rounded-full pt-1 pb-1 pl-5 text-color-white pr-5" />
                                            </div>
                                        </form>
                                    </div>
                                </Col>
                               
                              
                              </Row>
                              {flash.message && <Alert variant="success">{flash.message}</Alert>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
