import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Row } from 'react-bootstrap';
import "../../../css/style.css";
import { Bell, Envelope, PhoneFill, Telephone } from 'react-bootstrap-icons';
import { ArrowRight, BookmarkCheck } from 'react-bootstrap-icons';
import DOMPurify from "dompurify";
import { HorizontalChart } from '@/Components/SecuredComp/Horizontal';
import { PieChart } from '@/Components/SecuredComp/PieChar';
import { LineChart } from '@/Components/SecuredComp/LineChart';

export default function AdminDashboard(props) {

    const {programs, users, subscribe, batch, course, calls, message} = usePage().props;
        console.log(message)
            let element =[""];
        for (let i = 0; i < batch.length; i++) {
            element = batch[i].id+",";  
        }
       
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
   
      const found = programs.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(values.search)))
     

      const labels = batch.map((data,index) => { return ["batch "+data.id]});
      

    const datainfo = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data:  batch.map((data,index) => { return [ data.studentsno]}),
      backgroundColor: '#DC4731',
    }
  ],
};

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Dashboard</h2>
                <h3 className="fs-4 text-color-blue"> Programs </h3>
            </>} 
             
            Search={<div className="Search-container"><input onBlur={()=> setShow(false)} onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} />
            <div tabIndex="0" className={show?'Searched active': 'Searched'}>
               
                            {found.map((val)=>{
                                return(<div key={val.id}>{val.program}</div>)
                            })}
            </div></div>}
          >
            <Head title="Dashboard" />
            <div className='flex dashboard-container header-block items-center'>
                            {/**
                             * Progress container below,
                             */}
                            <Col lg='8' className='p-2  dashboard-content'>
                <div className='bg-white progress-container flex flex-col sm:justify-center w-100 sm:rounded-lg'> 
                   <div className='flex header-block'>
                    <div className='flex p-4'>
                    <div 
                    style={{ width:"60px",
                     height:"60px"}} className=' bg-primary rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{programs.length}</h5> </div>
                   <h6 className="text-color-dark-blue mt-2  ml-5 fw-bold w-50">Total Course</h6>
                    </div>
                    <div className='flex  p-4'>
                    <div 
                    style={{ width:"60px",
                     height : "60px"}} className='bg-color-baby-blue rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{batch.length}</h5> </div>
                   <h6 className="text-color-dark-blue mt-2  ml-5 fw-bold w-50">Total Batch</h6>
                    </div>
                    <div className='flex  p-4'>
                    <div 
                    style={{ width:"60px",
                     height : "60px"}} className=' bg-color-gold rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{subscribe.length}</h5>  </div>
                   <h6 className="text-color-dark-blue mt-2  ml-5 fw-bold w-50">Total Students</h6>
                    </div>
                </div> 
                    
                </div>

                { /** 
                 * Chart Container for Student progress
                 */}
                <div  className='bg-white mt-4 sm:rounded-lg p-3'>
                <h5 className='fw-bold text-color-dark-blue p-4'>Student Enrollment</h5>
                                        <HorizontalChart datas={datainfo}/>
                                         </div>
                </Col>
                <Col lg="4"  className="pr-4  dashboard-right">
                <div 
                className='bg-white right-side-nav p-3 w-100 sm:rounded-lg'> 
                    <Col lg="9" className='mb-5'><h5 className='fw-bold mt-3 text-color-dark-blue'>Recent Tuitor</h5></Col>
                    <div className=''>
                    {course.length > 0 ? 
                    <>
                        {course.map((data, index)=>{
                       
                            return(
                                <Link  key={index} href={`/student/en/study/${data.topic}`}>
                                <div className='flex'>
                        <Col lg="3">
                            <div
                            style={{ width:"50px",
                            height : "50px"}} className='bg-color-baby-blue rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{data.tuitorName}</h5> </div>
                        </Col>
                        <Col className='pt-2'>
                            <h6 className='fw-bold ml-3'
                            >{data.name}</h6>
                            <p>{new Date(`${data.created_at}`).toLocaleDateString()}</p>
                        </Col>
                        <Col lg="3">
                            <div
                            style={{ width:"50px",
                            height : "50px",
                            border:"solid 1px blue"}} className=' rounded-full ml-2 flex flex-column-center items-center'><Bell className='fs-5 text-color-dark-blue ml-auto mr-auto' />  </div>
                        </Col>
                        </div></Link>) })}
                        {
                            course.length == 5 &&<><Link  href={route('DailyPlanView')}><div className='w-full bg-primary pt-3 pb-3 rounded-full absolute-bottom text-white text-center'> see more</div></Link></>
                        }
                        </>:<>
                        <div className='flex flex-col sm:justify-center items-center'>
                                <h3 className='text-color-gray'>first class coming soon</h3>
                        </div>
                        
                         </>
                        }
                      
                    </div>
                </div>
                </Col>
                        </div>
            <div className="py-2">
                <div className="max-w-10xl   sm:px-6 lg:px-8">
                    <div >
                        <div className="p-2 border-b border-gray-200">
                
                            <div className='header-block  row mt-4'>
                          
                               <Col md="4" lg="4"  className="bg-white m-4 p-1 overflow-hidden shadow-sm sm:rounded-lg">         
                                    <div 
                                                    className='bg-white  p-3 w-100 sm:rounded-lg'> 
                                                    <Col lg="9" className='mb-5'><h5 className='fw-bold text-color-dark-blue'>Requested Calls</h5></Col>
                                                    <div className=''>
                                                    {calls.length > 0 ? 
                                                    <>
                                                    {calls.map((data, index)=>{
                                                
                                                        return(
                                                            <a  key={index} href={`tel:${data.phone}`}>
                                                            <div className='flex'>
                                                    <Col lg="2" className='mr-2'>
                                                        <div
                                                        style={{ width:"50px",
                                                        height : "50px"}} className='bg-color-baby-blue rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{data.name.charAt(0).toUpperCase()}</h5> </div>
                                                    </Col>
                                                    <Col className='pt-0'>
                                                        <h6 className='fw-bold ml-3'
                                                        >{data.phone}</h6>
                                                        <p className="ml-2">{data.name}</p>
                                                        <p style={{fontSize:"13px", color:"gray"}}  className="ml-2">{new Date(`${data.created_at}`).toLocaleDateString()}</p>
                                                    </Col>
                                                    <Col lg="2">
                                                        <div
                                                        style={{ width:"50px",
                                                        height : "50px",
                                                        border:"solid 1px blue"}} className=' rounded-full ml-2 flex flex-column-center items-center'><Telephone className='fs-5 text-color-dark-blue ml-auto mr-auto' />  </div>
                                                    </Col>
                                                    </div></a>) })}
                                                    {
                                                        course.length == 5 &&<><Link  href={route('DailyPlanView')}><div className='w-full bg-primary pt-3 pb-3 rounded-full absolute-bottom text-white text-center'> see more</div></Link></>
                                                    }
                                                    </>:<>
                                            <div className='flex flex-col sm:justify-center items-center'>
                                                    <h3 className='text-color-gray'>first class coming soon</h3>
                                            </div>
                                            
                                            </>
                                            }
                                        
                                        </div>
                                    </div>
                               </Col>

                                <Col md="4" lg="7" className="">
                                <div className='bg-white m-3  p-3 overflow-hidden shadow-sm sm:rounded-lg'>
                                    <Col lg="9" className='mb-5'><h5 className='fw-bold text-color-dark-blue'>Inbox Messages</h5></Col>
                                   
                                            {message.length > 0 ? 
                                            <>
                                                {message.map((data, index)=>{
                                            
                                                    return(
                                                        <a  key={index} href={`tel:${data.phone}`}>
                                                        <div className='flex'>
                                                <Col lg="2" >
                                                    <div
                                                    style={{ width:"50px",
                                                    height : "50px"}} className='bg-color-baby-blue rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{data.name.charAt(0).toUpperCase()}</h5> </div>
                                                </Col>
                                                <Col  className='pt-0'>
                                                    <h6 className='fw-bold ml-3'
                                                    >{data.email}</h6>
                                                    <p  className="ml-2">{data.name}</p>
                                                    <p  className="ml-2">{data.message}</p>
                                                    <p style={{fontSize:"13px" , color:"gray"}} className="ml-2">{new Date(`${data.created_at}`).toLocaleDateString()}</p>
                                                </Col>
                                                <Col lg="1"  className="mr-3">
                                                    <div
                                                    style={{ width:"50px",
                                                    height : "50px",
                                                    border:"solid 1px blue"}} className=' rounded-full ml-2 flex flex-column-center items-center'><Envelope className='fs-5 text-color-dark-blue ml-auto mr-auto' />  </div>
                                                </Col>
                                                </div></a>) })}
                                                {
                                                    course.length == 5 &&<><Link  href={route('DailyPlanView')}><div className='w-full bg-primary pt-3 pb-3 rounded-full absolute-bottom text-white text-center'> see more</div></Link></>
                                                }
                                                </>:<>
                                                <div className='flex flex-col sm:justify-center items-center'>
                                                        <h3 className='text-color-gray'>first class coming soon</h3>
                                                </div>
                                                
                                                </>
                                                }
                                    
                                    </div>
                                </Col>
                                <Col md="6" lg="4" className="bg-white p-2 m-2 overflow-hidden shadow-sm sm:rounded-lg">
                                <h5 className='fw-bold text-color-dark-blue p-4'>Users Chart</h5>
                                <PieChart /> 
                            </Col>
                                
                               </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
