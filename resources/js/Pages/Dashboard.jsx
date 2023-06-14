import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Row } from 'react-bootstrap';
import "../../css/style.css";
import { ArrowRight, BookmarkCheck, BookmarkCheckFill, Bell, Search, ArrowUpRightSquareFill, ArrowUpRightSquare, StarFill } from 'react-bootstrap-icons';
import DOMPurify from "dompurify";
import Student from "@/assets/Team/student-vector.png";
import { LineChart } from '@/Components/SecuredComp/LineChart';
import Fullstack from '@/assets/Team/fullstack-2.webp';
import Flutter from '@/assets/Team/Flutter-App-development.jpg';
import { Book } from "react-bootstrap-icons";
import { Progress } from "@/Components/Progress"


export default function Dashboard(props) {
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */

    window.sessionStorage.clear();

    const { programs, progress, fullstack, flutter, flutterLink, fullstackLink, verified, course, assignment } = usePage().props;
    const [values, setValues] = useState({
        "search": "",
    });
    const labels = fullstack.map((data, index) => { return `week ${index + 1}` });
    const dataMain = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: fullstack.map((data, index) => { return data.result }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 222)',
            },
            {
                label: 'Dataset 2',
                data: fullstack.map((data, index) => { return data.result }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const [show, setShow] = useState(false);
    const HandleShow = () => {
        setShow(true);
    }
    const HandleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
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
            Search={<div className="Search-container"><div className=""><input onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} /></div>
                <div tabIndex="0" onBlur={() => setShow(false)} className={show ? 'Searched sm:rounded-lg h-full pl-3 pb-4 relative-left active' : 'Searched'}>

                    {found.map((data, index) => {
                        return (<div className='bg-white pt-2 mt-1 pb-2 pl-4 shadow-sm sm:rounded-lg' key={index}>
                            <Row>
                                <Col mx="6" >
                                    <Link href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-dark-blue">
                                        <div className="flex pb-3">
                                            <Col md="2" className="pt-0 ">
                                                <Book
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "#DC4731"
                                                    }} className="pl-1" />
                                            </Col>
                                            <Col md="10" className='fs-5 fw-bold pl-0 ml-4 text-color-dark-blue'>{data.program}</Col>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </div>)
                    })}
                </div></div>}>
            <Head title="Dashboard" />
            <div className='block header-block'>
                {/**
                             * Progress container below,
                             */}
                             <div className='dashboard-container header-block items-center'>
                {verified && <>
                    <Col lg='8' md="12" sm="12" className=' dashboard-content col-lg-8 col-md-12 col-sm-12'>
                        <Progress
                            
                              First Listing The Header of Progress
                             
                            courseHead="Course Progress"
                            studyHead="Available Studies"
                            assignmentHead="Assignment Progress"
                            
                              Secondly listing the Progess our content
                             
                            courseProgress={fullstack.length * 4}
                            studyProgress={course.length * .8}
                            assginmentProgress={assignment.length * .8}
                        />

                        { /** 
                         * Chart Container for Student progress
                        */}
                         <div className='bg-white mt-4 mb-2 sm:rounded-lg p-3'>
                            <h5 className='fw-bold text-color-dark-blue'>Weekly Progress</h5>
                            <LineChart datas={dataMain} textName="student progress" />
                        </div>
                    {/**
                     * Below Contains recent course contents
                    */}
                    </Col>
                    {verified[0] &&
                         <Col lg="4"className=" dashboard-right">
                         <div 
                         className='bg-white  p-3 w-100 sm:rounded-lg'> 
                             <Col lg="9" className='mb-5'><h5 className='fw-bold mt-3 text-color-dark-blue'>Recent Class</h5></Col>
                             <div className=''>
                             {course.length > 0 ? 
                             <>
                                 {course.map((data, index)=>{
                                
                                     return(
                                         <Link className="block" key={index} href={`/study/${data.program_code}-${data.id}`}>
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
                              
                                 </>:<>
                                 <div className='flex flex-col sm:justify-center items-center'>
                                         <h3 className='ft-6 text-color-gray'>No Course Yet</h3>
                                 </div>
                                  </>
                                 }
                               
                             </div>
                         </div>
                         </Col>}
                        </>}</div>
            </div>
            <div className="w-100">
                <div className=" sm:px-6 lg:px-8">
                    <div className="overflow-hidden w-100 sm:rounded-lg">
                        <div className="p-6  border-b border-gray-200">
                            <Row className='header-block'>
                                {programs.length < 1 ? (<p className='text-center mt-5'>program not Created yet</p>) : (programs.map((data, index) => {
                                    return (
                                        <Col key={index} xs="">
                                            <div className='bg-white p-3 shadow-sm  mb-2 sm:rounded-lg'>
                                                <div style={{
                                    
                                                    overflow: "hidden"
                                                }}>
                                                    {data.random == fullstackLink &&
                                                        <img className='w-100' src={Fullstack} />}
                                                    {data.random == flutterLink && <img className='w-100' src={Flutter} />}

                                                </div>
                                                <div className=''>
                                                    <h6 className='fw-bold text-color-dark-blue mt-3 ' style={{ fontSize: 14 }}>Design</h6>
                                                    <div className='flex'>
                                                        <Col sm="10">
                                                            <h1 className="fs-5 p-3 w-100 fw-bold">{data.program} </h1>
                                                        </Col>
                                                        <Col lg="2">
                                                            <div className="course-btn ">
                                                                <Link href={data.random == fullstackLink && (`/Program/Full-Stack-Development-Program`) || data.random == flutterLink && ("/Program/Flutter-Development-Program")} className="lab-btn-text mt-3"><i className="icofont-external-link"></i></Link>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                    <p className='pl-3 text-color-gray'>{data.random == fullstackLink && ("Design Websites and Mobile Apps that Your Users Love and  Return to Again.") || data.random == flutterLink && "Learn how to Design Mobile Application Using Flutter Development"}</p>
                                                    <div className='flex pl-3 pt-2'>

                                                    </div>
                                                </div>
                                                <div className=" pb-4 text-color-dark-blue flex">
                                                    {!verified[0] && <div className='bg-primary rounded-full shadow-sm text-color-white pl-3 pr-3 pt-1 pb-1 mr-4'><Link className='text-white' href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`}>Enroll now</Link></div>}
                                                    {verified[0] && <Link href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`} className="bg-primary rounded-full shadow-sm text-white pl-3 pr-3 pt-2 mr-4">  <h3 className="flex float-right text-white fw-bold fs-6"><>{verified[0].program == data.program ? <>Continue </> : <>enroll now</>}</> </h3></Link>}
                                                    <h6>{data.tuitorid}</h6>
                                                </div>

                                            </div>
                                        </Col>
                                    )
                                }))}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
