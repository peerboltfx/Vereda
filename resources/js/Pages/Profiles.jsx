import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Row } from 'react-bootstrap';
import "../../css/style.css";
import DOMPurify from "dompurify";
import { Book, PlayBtnFill } from 'react-bootstrap-icons';



export default function Dashboard(props) {
    const {programs, profile, auth,user, program_links} = usePage().props;

    const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
      }
      const [values, setValues] = useState({
        "search":"",
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
      const found = program_links.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(values.search)))
      


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">{profile ?profile.firstname+" "+profile.lastname: auth.user.name}</h2>
                <h3 className="fs-4 text-color-blue"> {auth.user.role} </h3>
            </>} 
             
             Search={<div className="Search-container"><input  onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} />
       <div onBlur={()=> setShow(false)} tabIndex="0" style={{height:"400px", overflowY:"scroll"}} className={show?'Searched bg-white active p-2': 'Searched'}>
          <h6 className='fw-bold text-color-dark-blue text-center'>Search Course</h6>
       {found.map((data, index)=>{
              return(
               <div className='bg-white pt-2 mt-1 pb-2 pl-4 shadow-sm sm:rounded-lg'  key={index}>
              <Row>
                  <Col mx="6" >
                  <Link href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-dark-blue">
                    <div className="flex pb-3">
                          <Col md="6"  className="pt-0 ">
                          <Book
                          style={{ fontSize:"30px",
                                    color: "#DC4731"

                                  }} className="pl-1" />
                            </Col><Col md="6"  className='fs-5 fw-bold pl-0 ml-4 text-color-dark-blue'>{data.program}</Col> 
                  </div>
                  </Link>
                 </Col>
             
             
             
              </Row>
            </div>
              )
            })}
       </div></div>}
      
          >
            <Head title={auth.user.name} />

            <div className="py-12">
                <div className="  sm:px-6 lg:px-8">
                    <div className=" overflow-hidden  sm:rounded-lg">
                        <div className="p-6 border-gray-200 profiles-style">
                            <Row className='header-block'>
                                <Col mx="6"><h1>Personal Information</h1>
                                    <ul>
                                        <li><span className='fw-bold mr-5'>User Name</span>{auth.user.name}</li>
                                        <li><span className='fw-bold mr-5'>Full Name :</span>{profile ? profile.firstname+" "+profile.lastname : ""}</li>
                                        <li><span className='fw-bold mr-5'>Country :</span>{profile ? profile.country : ""}</li>
                                        <li><span className='fw-bold mr-5'>Gender :</span>{profile ? profile.gender : ""}</li>
                                        <li><span className='fw-bold mr-5'>DoB :</span>{profile ? profile.birthDate : ""}</li>
                                        <li><span className='fw-bold mr-5'>Phone :</span>{profile ? profile.phone: auth.user.phone}</li>
                                        <li><span className='fw-bold mr-5'>Address :</span>{profile ? profile.address: auth.user.phone}</li>
                                        <li><span className='fw-bold mr-5'>Parent Name :</span>{profile ? profile.parentName: auth.user.phone}</li>
                                        <li><span className='fw-bold mr-5'>Desire :</span>{profile ? profile.desire: auth.user.phone}</li>
                                   </ul>
                                </Col>
                               
                              
                              </Row>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
