import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Form, Row, Alert } from 'react-bootstrap';
import "../../../css/style.css";
import DOMPurify from "dompurify";
import { Book, PlayBtnFill } from 'react-bootstrap-icons';
import { Inertia } from '@inertiajs/inertia';



export default function Dashboard(props) {
    const { discount, programs,notification, flash} = usePage().props;

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
        Inertia.post("/admin/createDiscount",{
            message:values.discount,
        })
      }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">{"Discount Code"}</h2>
            </>}
          >
            <Head title={"Discount"} />

            <div className="py-12">
                <div className="  sm:px-6 lg:px-8">
                    <div className=" overflow-hidden  sm:rounded-lg">
                        <div className="p-6 border-gray-200 profiles-style">
                            <Row className='header-block'>
                              
                                <Col lg="4" md="6" sm="12" className="mb-4">
                                    <div className='w-100 mt-3 p-3 bg-white'><h5 className='fw-bold mb-4'>Generate Discount </h5>
                                        <form onSubmit={handleDiscount} method="POST">
                                            <input
                                            type="number"
                                            className="w-100"
                                            name="discount"
                                            onChange={HandleChange}
                                            value={values.discount}
                                            placeholder="1,000 - 2,000"
                                            />
                                            <div className="mt-3">
                                            <input type="submit" value="submit" className="bg-primaries rounded-full pt-1 pb-1 pl-5 text-color-white pr-5" />
                                            </div>
                                        </form>
                                    </div>
                                </Col>
                                <Col lg="8" md="6" sm="12" className="mb-4"><h3 className="fw-bold">Personal Information</h3>
                                   {discount.length > 0 ? <>
                                   {discount.map((data , index)=> {
                                    return <div className='mb-3 bg-white p-3' key={index}>
                                        <p className='float-right'> {new Date(`${data.created_at}`).toLocaleDateString()}</p>
                                        <h5 className='fw-bold'>Discount Code</h5>
                                        <small className='text-muted'>{data.discount_code}</small>
                                        
                                        <h5 className='fw-bold mt-3'>Price</h5>
                                        <p>INR {data.amount}</p>
                                    </div>
                                   })}
                                   </>: ""}
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
