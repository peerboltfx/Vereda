import React,{useState} from "react";
import "../../css/style.css";
import { RouterDom } from "./RRouterDom";
import Container from 'react-bootstrap/Container';
import {  CheckCircleFill, ArrowRight } from "react-bootstrap-icons";
import ujjwal from "../assets/Team/Ujjwal-Verma.png";
import Hermant from "../assets/Team/Hermant-kumar.png";
import vishal from "../assets/Team/vishal.png";
import { Link, Head, usePage } from '@inertiajs/inertia-react';
import workVector from "@/assets/Images/work-vector.png";
import blogDetail from '@/assets/Images/blog-details.jpg';
import { Accordion, Col } from "react-bootstrap";
import Footer from "@/Components/layout/footer";
import Header from "@/Components/layout/header";
import PageHeaderTwo from "@/Components/layout/pageheader-2";
import Author from "@/Components/sidebar/author";
import Comment from "@/Components/sidebar/comment";
import CourseSideCetagory from "@/Components/sidebar/course-cetagory";
import CourseSideDetail from "@/Components/sidebar/course-detail";
import Respond from "@/Components/sidebar/respond";
import Fullstack from '@/assets/Team/fullstack-2.webp';
import { Faqs } from "@/Components/Faq";
import { OffCanvasExample } from "@/Components/DropBottom";
import Form from "react-bootstrap/Form";
import PrimaryButton from '@/Components/PrimaryButton';
import Logo from '../assets/Images/logo.png';



export default function FullStackDev(props){
   /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {name,programs,pricing, flash} = usePage().props;
    const [dropDown, setDropDown]=useState(false);
    const [enrollFloat, setEnroll]= useState(false);
    const [accord1, setAccord1] = useState(false);
    const [accord2, setAccord2] = useState(false);
    const[accord3,setAccord3]= useState(false);
    const [accord4,setAccord4]= useState(false);
    const HandleEnroll=()=>{
        if(window.scrollY > 500 && window.scrollY < 2300){
            setEnroll(true);
        } 
        else{
            setEnroll(false);
        }
        
    }
    window.addEventListener('scroll',HandleEnroll);
   const handleDropDown= ()=>{
    setDropDown(!dropDown);
   }
   const HandleAccord1=()=>{
    setAccord1(!accord1);
}
const HandleAccord2=()=>{
    setAccord2(!accord2);
}
const HandleAccord3=()=>{
    setAccord3(!accord3);
}
const HandleAccord4=()=>{
    setAccord4(!accord4);
}
const [show, setShow] = useState(false);
const handleShow = () => setShow(true);
const [values, setValue] = useState({
    'name':"",
    "email":"",
    "phone":"",
    "country":"",
    "state":"",
    "occupation":"",
    "studies":"",
    "language":""
})
const HandleChange=(e)=>{
   const key=e.target.id;
   const value = e.target.value;
   setValue(values => ({
    ...values,
    [key]:value,
   }))
}

const handleSubmit=(e)=>{
    e.preventDefault();
    Inertia.post('/request/call',values);
}

const handleClose = () => setShow(false);

   
    return(
        <div>
                        <Head title={name.program}>
                    {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ --> */}
                    <meta property="og:Vereda.co.in" content="https://vereda.co.in/Full-Stack-Development-Program" />{/**<!-- website link --> */}
                    <meta property="og:title" content="Full Stack Development Program"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Become expert in developing web and mobile applications using Flutter Development." />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" itemProp="image" content={Fullstack} />{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/Program/Full-Stack-Development-Program" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in/Program/Full-Stack-Development-Program" />
                    <meta property="description" content="Learn full Stack developement and become a Professional Developer with a Certificate" />
                        </Head>
                        <Header />
                        <PageHeaderTwo 
                        
                            percent={Math.floor(name.discount/name.price*100)+ "%"}
                            type={"Web Development"}
                            className="course-cate"
                            programImage={Fullstack}
                            title={name.program}
                            subject={"Learn full Stack developement and become a Professional Developer with a Certificate"}
                        />
                        <div className=" padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="main-part">
                                <div className="course-item">
                                    <div className="course-inner">
                                        <div className=" ml-2">
                                            <h3>Course Overview</h3>
                                            <p>Kickstart your career in application development. Master Cloud Native and Full Stack Development using hands-on projects involving HTML, Javascript, Node.js, Object Oriented Programming and more. No prior experience required.</p> 
                                            <h4>What You'll Learn in This Course:</h4>
                                            <Col className="block col pb-4">
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 1 & 2</li>
                            <li className="fs-4 pb-3">Basic of HTML, CSS and Project</li>
                        </ul>
                        
                       </div>
                       <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 3 & 4</li>
                            <li className="fs-4 pb-3">Learn Javascript with simple task</li>
                        </ul>
                        
                       </div>
                       <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 5 </li>
                            <li className="fs-4 pb-3">Learn Bootstrap and tailwinds</li>
                        </ul>
                        
                       </div>
                       <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 6</li>
                            <li className="fs-4 pb-3">React, Redux, Router</li>
                        </ul>
                        </div>
                        <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 7</li>
                            <li className="fs-4 pb-3">Learn about Git and Github</li>
                        </ul>
                    </div>
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 8 & 9</li>
                            <li className="fs-4 pb-3">Learn MySql and MongoDB</li>
                        </ul>
                    </div>
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 10 & 11</li>
                            <li className="fs-4 pb-3">Learn Advanced Javascript</li>
                        </ul>
                    </div>
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 12 & 13</li>
                            <li className="fs-4 pb-3">Learn Rest API or Json API</li>
                        </ul>
                    </div>
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 14 & 15</li>
                            <li className="fs-4 pb-3">Learn aws or Google Cloud</li>
                        </ul>
                    </div>
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 16 & 17</li>
                            <li className="fs-4 pb-3">Revise of the course</li>
                        </ul>
                    </div>
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3">Week 18 & 23</li>
                            <li className="fs-4 pb-3">Multiple Projects.</li>
                        </ul>
                    </div>
                </Col>
                <div>                     
                        <div className={dropDown? "dropDownBox show pt-2": "dropDownBox pt-2 pb-4"}>
                        <div className="course-video-title mb-5">
                                        <h4>Course Content</h4>
                                    </div>
                                    <p className="pb-1">This Professional Certificate will equip you with all the key skill and technical know-how to kickstart your career as
                                        a full Stack Web Developer, guided by expert at Vereda, you will learn to build your own web applications and practice 
                                        working with the technologies behind them. This program consists of ample instructional content as well as hands-on-excercises 
                                        and projects designed to hone your skills and help you build your portfolio. 
                                    </p>
                                    <p className="pb-1">
                                        No prior programming experience is required. you'll skill up with the tools and technologies that successful software
                                        developers use to build, deploy, test, run, and manage Full Stack Web Development, giving you the practical skills
                                        to begin a new career in a highly in-demand area.  
                                    </p>
                                    <p className="pb-1">
                                        The courses in this program will help you develope skill set in a variety of technologies including: HTML, CSS, Javascript, 
                                        GitHub, Node.js, React.js, Database, SQL, Bootstrap, Application Security, PHP and more.
                                    </p>
                                    <p className="pb-1">
                                        After completing the program, you will have developed several applicationd using front-end and back-end technologies and deployed 
                                        them on cloud platform possibly using Cloud Native.  
                                    </p>
                                </div>
                                <h6 onClick={handleDropDown} className="text-center mt-4 text-color-blue fw-bold">see more</h6>
                            </div>  
                                        </div>
                                    </div>
                                </div>

                                <div className="course-video">
                                    
                                    
                                    <div className="course-video-content">
                                      {/**   <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <div className="accordion-header" id="accordion01">
                                                    <button className="d-flex flex-wrap justify-content-between" data-bs-toggle="collapse" data-bs-target="#videolist1" aria-expanded="true" aria-controls="videolist1"><span>1.Introduction</span> <span>5lessons, 17:37</span> </button>
                                                </div>
                                                <div id="videolist1" className="accordion-collapse collapse show" aria-labelledby="accordion01" data-bs-parent="#accordionExample">
                                                    <ul className="lab-ul video-item-list">
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">1.1 Welcome to the course 02:30 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">1.2 How to set up your photoshop workspace  08:33 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">1.3 Essential Photoshop Tools 03:38 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">1.4 Finding inspiration 02:30 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">1.5 Choosing Your Format 03:48 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <div className="accordion-header" id="accordion02">
                                                    <button className="d-flex flex-wrap justify-content-between" data-bs-toggle="collapse" data-bs-target="#videolist2" aria-expanded="true" aria-controls="videolist2"> <span>2.How to Create Mixed Media Art in Adobe Photoshop</span> <span>5 lessons, 52:15</span> </button>
                                                </div>

                                             
                                               *   <div id="videolist2" className="accordion-collapse collapse" aria-labelledby="accordion02" data-bs-parent="#accordionExample">
                                                    <ul className="lab-ul video-item-list">
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">2.1 Using Adjustment Layers 06:20 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">2.2 Building the composition 07:33 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">2.3 Photoshop Lighting effects 06:30 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">2.4 Digital Painting using photoshop brushes 08:34 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                        <li className=" d-flex flex-wrap justify-content-between">
                                                            <div className="video-item-title">2.5 Finalizing the details 10:30 minutes</div>
                                                            <div className="video-item-icon"><a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="popup" target="_blank"><i className="icofont-play-alt-2"></i></a></div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>*/}
                                    </div>
                                </div>
                              
                               
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-part">
                                <CourseSideDetail 
                                price={Math.floor(name.price-name.discount).toLocaleString()}
                                enroll={`/en/${name.program.split(' ').join('-')}/session/${name.random}`}
                                tweet={`https://twitter.com/intent/tweet?text=Awesomee%20Blog!&url=vereda.co.in/Program/${name.program.split(" ").join("-")}`}
                                linked={`https://www.linkedin.com/sharing/share-offsite/?url=vereda.co.in/Program/${name.program.split(" ").join("-")}`}
                                ping={`https://www.facebook.com/sharer.php?u=vereda.co.in/Program/${name.program.split(" ").join("-")}&quote=Awesome%20Blog!`}
                                />
                                {/* <CourseSideCetagory /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RouterDom 
                children={
                    <Container>

                  <div className="row"> 
                <Col lg="6" md="6" sm="12" className="p-2 text-color-white">
                        <h4 className="fw-bold pl-1 pt-2 pb-4">Build Job-ready skills by learning from the best</h4>
                    <div className="row header-block">
                        <div className="col">
                        <p>Get started in the in-demand field of Full Stack Web Application Development with professional Certificate from Vereda. Learn the tools and technologies, that software developers use to build, deploy, test, run, and manage cloud-based applications. </p>
                    </div>
                    <div className="col"><img src={workVector} width="200px" /></div>
                    </div>
                        <p className="pl-1 pt-2 pb-4"><b>Common Job titles:</b>Web Application Developer, Junior Full Sttack Developer, Full Stack Developer, Front-end Developer, back-end Developer, Software Engineering, etc.</p>
                        
                </Col>
                
                    <Col lg="6" md="6" sm="12">
                       <Faqs />
                    </Col>
                    </div>
                    <div id="trainers" className="">
                        <h4 className="pt-4 pb-3">Instructors</h4>
                        <div className="row header-block trainer">

                            <div className="col">
                            <Author
                                    teacherSrc={ujjwal}
                                    name={"Ujjwal Verma"}
                                    task={"Lead Software Developer IIT"}
                                    linkedin={"https://www.linkedin.com/in/ujjwalverma007"}
                                />
                            </div>
                                 <div className="col">
                                 <Author
                                    teacherSrc={Hermant}
                                    name={"Hermant Kumar"}
                                    task={"Co-Founder B. Tech"}
                                    linkedin={"https://www.linkedin.com/in/hermant-kumar-sedhanshu-42142390"}
                                />
                                 </div>
                                 <div className="col">
                                 <Author
                                    teacherSrc={vishal}
                                    name={"Vishal Pankaj"}
                                    task={"Technical domain Expert"}
                                    linkedin={"https://www.linkedin.com/in/vishal-pankaj-30503a103"}
                                />     
                            </div>
                        </div>
                    </div>
                    <div className="call mt-4 mb-4"> <button onClick={handleShow}  className="full-size-btn capitalize full-width-btn">request call back</button></div>
     
     <OffCanvasExample 
                 show={show}
                 onHide={handleClose}
                 title={<>
                 <div className='block'>
                             <h4><a href="/" className="logo-anchor item-center"><img src={Logo} width="100px" alt={Logo} srcSet="" /></a></h4>
                             <h3 className='fw-bold'>Talk to Our Expert</h3>
                             </div>
                         </>}
                 children={<>
             <Container>
                 <form onSubmit={handleSubmit}>
                    
                     <Form.Control
                     type="text"
                     onChange={HandleChange}
                     value={values.name}
                     id="name"
                     required
                     placeholder="Name"
                     className="mt-2"
                     />
                   
                     <Form.Control
                     type="email"
                     onChange={HandleChange}
                     value={values.email}
                     id="email"
                     required
                     placeholder="abcd@example.com "
                     className="mt-2"
                     />
                     <Form.Control
                     type="number"
                     id="phone"
                     value={values.phone}
                     onChange={HandleChange}
                     required
                     placeholder="+9 9123 567 98"
                     className="mt-2"
                     />
                     <Form.Control
                     type="text"
                     value={values.country}
                     id="country"
                     onChange={HandleChange}
                     required
                     placeholder="Country"
                     className="mt-2"
                     />
                     <Form.Control
                     type="text"
                     id="occupation"
                     value={values.occupation}
                     onChange={HandleChange}
                     required
                     placeholder="Occupation"
                     className="mt-2"
                     />
                   
                     <Form.Control
                     type="text"
                     id="state"
                     value={values.state}
                     onChange={HandleChange}
                     required
                     placeholder="State"
                     className="mt-2"
                     />
                     <Form.Select 
                     onChange={HandleChange}
                     vlaue={values.language}
                     id="language"
                     required
                     className="mt-2"
                     >
                         <option>select Language</option>
                         <option value='English'>English</option>
                         <option value='Hindi'>Hindi</option>
                     </Form.Select>
                     <PrimaryButton className='mt-5'>submit</PrimaryButton>
                 {flash.message && (<div className='alert alert-success' >Request sent successfully</div>)}
                 </form>
             </Container>
      </>}
      />
                </Container>
                
                }
            />
           <Footer />
        </div>
    )
}