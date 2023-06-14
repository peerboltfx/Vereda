import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Row } from 'react-bootstrap';
import "../../../css/style.css";
import { ArrowRight, BookmarkCheck, BookmarkCheckFill, Bell,Search, ArrowUpRightSquareFill, ArrowUpRightSquare, StarFill } from 'react-bootstrap-icons';
import DOMPurify from "dompurify";
import Student from "@/assets/Team/student-vector.png";
import { LineChart } from '@/Components/SecuredComp/LineChart';
import blogDetail from '@/assets/Images/blog-details.jpg';







export default function Dashboard(props) {
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {programs,progress,fullstack, classModerator,students, auth, course} = usePage().props;
    const [values, setValues] = useState({
        "search":"",
    });
    const labels = fullstack.map((data, index)=>{ return `week ${index+1}` }) ;
    const dataMain = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data:  fullstack.map((data, index)=>{ return data.result}),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 222)',
          }
        ],
      };
      const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
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
     /**
      * Normalize working with AuthenticatedLayout
      * and its props as it contains important header elements
      * like search, error message and user id.
      */
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Dashboard</h2>
            </>} 
             Programs={programs.map((data,index)=>{
                return (<li key={index}><Link href={`/admin/edit-program/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-white">{data.program}</Link></li>)
               })}
              
              
            Search={<div className="Search-container"><div className=""><input  onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} /></div>
            <div tabIndex="0" onBlur={()=> setShow(false)} className={show?'Searched sm:rounded-lg pt-5 pl-3 pb-4 shadow relative-left active': 'Searched'}>
               
                            {found.map((val)=>{
                                return(<div key={val.id}><Link href={`/en/${val.program.split(' ').join('-')}/session/${val.random}`} className="text-color-dark-blue">  {val.program}</Link></div>)
                            })}
            </div></div>}

          >
            <Head title="Dashboard" />
            <div className='flex header-block items-center'>
                            {/**
                             * Progress container below,
                             */}
                            <Col lg='8' className='p-2'>
                <div className='bg-white progress-container flex flex-col sm:justify-center w-100 sm:rounded-lg'> 
                   <div className='flex header-block'>
                    <div className='flex p-4'>
                    <div 
                    style={{ width:"60px",
                     height:"60px"}} className=' bg-primary rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{classModerator.length}</h5> </div>
                   <h6 className="text-color-dark-blue mt-2  ml-5 fw-bold w-50">Classes Lecturing</h6>
                    </div>
                    <div className='flex  p-4'>
                    <div 
                    style={{ width:"60px",
                     height : "60px"}} className='bg-color-baby-blue rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{students.length}</h5> </div>
                   <h6 className="text-color-dark-blue mt-2  ml-5 fw-bold w-50">Active Students</h6>
                    </div>
                    <div className='flex  p-4'>
                    <div 
                    style={{ width:"60px",
                     height : "60px"}} className=' bg-color-gold rounded-full ml-2 flex flex-column-center items-center'><Bell className='fs-5 text-color-white ml-auto mr-auto' /> </div>
                   <h6 className="text-color-dark-blue mt-2  ml-5 fw-bold w-50">Assignment Progress</h6>
                    </div>
                </div> 
                    
                </div>

                { /** 
                 * Chart Container for Student progress
                 */}
                <div className='bg-white mt-4 sm:rounded-lg p-3'>
                            <h5 className='fw-bold text-color-dark-blue'>Live class Session</h5>
                            <LineChart datas={dataMain} textName="student progress" />
                    </div>
                </Col>
                <Col lg="4"className="pr-4 dashboard-right">
                <div 
                className='bg-white  p-3 w-100 sm:rounded-lg'> 
                    <Col lg="9" className='mb-5'><h5 className='fw-bold mt-3 text-color-dark-blue'>update Class</h5></Col>
                    <div className=''>
                    {course.length > 0 ? 
                    <>
                        {course.map((data, index)=>{
                       
                            return(
                                <Link className="block" key={index} href={`/moderator/create-course/${data.program_code}/en/${data.id}`}>
                                <div className='flex'>
                        <Col lg="3">
                            <div
                            style={{ width:"50px",
                            height : "50px"}} className='bg-color-baby-blue rounded-full ml-2 flex flex-column-center items-center'><h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>M</h5> </div>
                        </Col>
                        <Col className='pt-2'>
                            <h6 className='fw-bold ml-3'
                            >{data.topic}</h6>
                            <p>{new Date(`${data.date}`).toLocaleDateString()}</p>
                        </Col>
                        <Col lg="3">
                            <div
                            style={{ width:"50px",
                            height : "50px",
                            border:"solid 1px blue"}} className=' rounded-full ml-2 flex flex-column-center items-center'><Bell className='fs-5 text-color-dark-blue ml-auto mr-auto' />  </div>
                        </Col>
                        </div></Link>) })}
                        {
                            course.length == 5 &&<><Link  href={route('DailyPlanView')}><div style={{width:"100%"}} className=' bg-primary pt-3 pb-3 rounded-full absolute-bottom text-white text-center'> see more</div></Link></>
                        }
                        </>:<>
                        <div className='flex flex-col sm:justify-center items-center'>
                                <h3 className='ft-6 text-color-gray'>No Course Yet</h3>
                        </div>
                         </>
                        }
                      
                    </div>
                </div>
                </Col>
                        </div>
            <div className="">
                <div className=" sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6  border-b border-gray-200">
                            <Row className='header-block'>
                             
                              
                              </Row>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
