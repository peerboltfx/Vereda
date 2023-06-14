import React,{useState} from "react";
import "../../css/style.css";
import { RouterDom } from "./RRouterDom";
import Container from 'react-bootstrap/Container';
import { ArrowLeft, ArrowRight,  Check } from "react-bootstrap-icons";
import ujjwal from "../assets/Team/Ujjwal-Verma.png";
import Hermant from "../assets/Team/Hermant-kumar.png";
import vishal from "../assets/Team/vishal.png";
import { Accordion, Col } from "react-bootstrap";
import { Link, Head, usePage } from '@inertiajs/inertia-react';
import flutter from "@/assets/Team/Picture1.png";
import Footer from "@/Components/layout/footer";
import Header from "@/Components/layout/header";
import PageHeaderTwo from "@/Components/layout/pageheader-2";
import Author from "@/Components/sidebar/author";
import Flutter from '@/assets/Team/Flutter-App-development.webp';
import { CheckCircleFill } from "react-bootstrap-icons";
import CourseSideDetail from "@/Components/sidebar/course-detail";
import { Faqs } from "@/Components/Faq";
import { OffCanvasExample } from "@/Components/DropBottom";
import Form from "react-bootstrap/Form";
import PrimaryButton from '@/Components/PrimaryButton';
import Logo from '../assets/Images/logo.png';
import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';


export default function FlutterDev(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {pricing, programs, name, flash}=usePage().props;
    const [enrollFloat, setEnroll]= useState(false);
    const [accord1, setAccord1] = useState(false);
    const [accord2, setAccord2] = useState(false);
    const[accord3,setAccord3]= useState(false);
    const [accord4,setAccord4]= useState(false);
    const {}=usePage().props;


    
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
    const HandleEnroll=()=>{
        if(window.scrollY > 500 && window.scrollY < 2300){
            setEnroll(true);
        } 
        else{
            setEnroll(false);
        }
        
    }
    window.addEventListener('scroll',HandleEnroll);

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
            <Header />
            <Head title={name.program}>
                       {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ --> */}
                    <meta property="og:Vereda.co.in" content="https://vereda.co.in/Program/Flutter-Development-Program" />{/**<!-- website link --> */}
                    <meta property="og:title" content="Flutter Development Program"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Become expert in developing web and mobile applications using Flutter Development." />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" itemProp="image" content={flutter} />{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/Program/Flutter-Development-Program" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in/Program/Flutter-Development-Program" />
                    <meta property="description" content="Become expert in developing web and mobile applications using Flutter Development." />
                        </Head>
                        <PageHeaderTwo 
                         percent={Math.floor(name.discount/name.price*100)+ "%"}
                         type={"Mobile Development"}
                         className="course-cate"
                            programImage={Flutter}
                            title={name.program}
                            subject={"Learn Flutter Development and become a professional mobile developer with certificate"}

                        />
                              <div className="course-single-section padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="main-part">
                                <div className="course-item">
                                    <div className="course-inner">
                                        <div className="ml-2">
                                            <h3>Course Overview</h3>
                                            <p>This program sets to keep you equiped with skills in developing Flutter applications. In this program You will be able to build a Hello world Fluuter application using Code Server development environment.</p> 
                                            <div className="card p-5 pt-3 mb-5"> 
                        <h3 className="fs-6 fw-bold">
                            6 Months </h3>
                            <p></p>
                            <p className="pb-4">3 Days live session <br/>3 Days Practical session</p>
                            <h3 className="fs-6 fw-bold">
                            Language </h3>
                            <p className="pb-4">English and Hindi</p>
                             <h3 className="fs-6 fw-bold">
                            Service cost </h3>
                            <p className="pb-4"><span className="fw-bold">INR</span> {pricing.toString("fi-FI").replace(/\B(?=(\d{3})+(?!\d))/g,",")} </p>

                </div>
                                            <h4>What You'll Learn in This Course:</h4>
                                            <Col className="block col pb-4">
                    <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3"> Onboarding, Introduction to Flutter</li>
                            <li className="fs-4 pb-3">
                            <div>
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>In this section you will learn about the various data structures</p></div>
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>the core library in dart data structure ( List, Map, Set)</p></div>
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>Functionalities of Dart core library.</p></div>
                        </div>
                            </li>
                        </ul>
                        
                       </div>
                       <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3"> Introduction to Dart programming language</li>
                            <li className="fs-4 pb-3">
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>Learn about Dart and basic programming concepts</p></div>   
                            </li>
                        </ul>
                        
                       </div>
                       <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3"> Planning and architecture with demo project</li>
                            <li className="fs-4 pb-3">
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>In this section, trainer will build a Flutter app for practical observation and understanding the end to end development and concept of using Flutter.</p></div>
                            </li>
                        </ul>
                        
                       </div>
                       <div className="col skills">
                        <h2><CheckCircleFill className="skill-mark"/></h2>
                        <ul>
                            <li className="fw-bold pt-3"> Data Structure and Collections in Dart</li>
                            <li className="fs-4 pb-3">
                            <div>
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>In this section you will learn about the various data structures</p></div>
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>the core library in dart data structure ( List, Map, Set)</p></div>
                            <div className="flex pt-2"><span style={{position:"relative",top:3, marginRight:5}}><Check /></span> <p>Functionalities of Dart core library.</p></div>
                        </div>
                            </li>
                        </ul>
                        </div>
                      

                </Col>
                <div>                     
                        <div className="">
                        <div className="course-video-title mb-5">
                                        <h4>Course Content</h4>
                                    </div>
                               
                                </div>
                             
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
                    <div className="flex header-block">
                       <Col lg="6" md="6" sm="12">
                        <div className=" p-2 ">
                            <h4 className="fw-bold pl-1 pt-2 pb-4">Learn to Build  Hybrid Application from Scratch Using FLutter</h4>
                            <div className="flex header-block">
                                <Col lg="6" md="6" sm="12">
                                <p>Learn a new tool or skill in an interactive, hands on environment </p>
                                <p>You'll gain access to software and tools iin cloud workspace - no download required</p>
                            </Col>
                            <Col  lg="6" md="6" sm="12" className="col item-center w-100 flex items-center"><img src={flutter} width="200px"/></Col>
                            </div>
                            <p className="pl-1 pt-2 mt-4 fw-bold pb-4"><b>Common Job titles:</b>Flutter Application Developer, Junior Flutter Developer, Full-stack Developer, Front-end Developer, etc.</p>
                            
                        </div>
                    </Col>
                    <Col lg="6" md="6" sm="12">
                   <Faqs />
                   </Col>
                   </div>
                    <div id="trainers" className="">
                        <h3 className="pt-4 pb-3">Instructors</h3>
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
                        <div className="call mt-4 mb-4"> <button onClick={handleShow}  className="full-size-btn capitalize full-width-btn">request call back</button></div>
                    </div>
                  
                </Container> 
                }
            />
            
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
            <Footer />
            </div>
    )
}