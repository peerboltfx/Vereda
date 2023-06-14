import { Component, Fragment, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Footer from "../Components/layout/footer";
import Header from "../Components/layout/header";
import PageHeader from "../Components/layout/pageheader";
import GroupSelect from "../Components/sidebar/group-select";
import Pagination from "../Components/sidebar/pagination";
import Rating from "../Components/sidebar/rating";
import SkillSelect from "../Components/sidebar/skill-select";
import { Container } from "react-bootstrap";
import img3 from "@/assets/Team/Ujjwal-Verma.webp";
import img4 from "@/assets/Team/Hermant-kumar.webp";
import Fullstack from '@/assets/Team/fullstack-2.webp';
import Flutter from '@/assets/Team/Flutter-App-development.webp';
import { usePage,Head } from "@inertiajs/inertia-react";
import { OffCanvasExample } from "@/Components/DropBottom";
import Form from "react-bootstrap/Form";
import PrimaryButton from '@/Components/PrimaryButton';
import { Inertia } from "@inertiajs/inertia";
import Logo from '../assets/Images/logo.png';
import burn from "@/assets/Images/flame.svg";
import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';



const CoursePage = () => {

    const {flash, programs, flutter, fullstack}= usePage().props;
    const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
        year: 'numeric',
        month: 'long',
        day:'numeric',
    });

    let program_fullstack=[];
    let program_flutter="";
    programs.map((p , index)=>{
        if(p.program =="Full Stack Development Program"){
            program_fullstack=p;
            return program_fullstack;
        }
        else if(p.program =="Flutter Development Program"){
            program_flutter=p;
            return program_flutter;
        }
    })

    const courseList = [
        {
            imgUrl: Fullstack,
            imgAlt: 'course vereda vereda',
             price: program_fullstack.price - program_fullstack.discount,
            prevPrice: program_fullstack.price,
            discount: Math.floor(program_fullstack.discount/program_fullstack.price *100),
            discAm:program_fullstack.discount,
            cate: 'Web Development',
            reviewCount: '03 reviews',
            title: 'Full Stack Web Development Program',
            totalLeson: '26 week lessons',
            schdule: longEnUsFormatter.format(new Date(`${fullstack.starts}`)),
            authorImgUrl: img3,
            authorImgAlt: 'course author vereda vereda',
            authorName: fullstack.trainerName,
            btnText: 'Read More',
            coursedtl: '/Program/Full-Stack-Development-Program',
            seats:fullstack.studentsno,
        },
        {
            imgUrl: Flutter,
            imgAlt: 'course vereda vereda',
            price: program_flutter.price - program_flutter.discount,
            prevPrice: program_flutter.price,
            discAm:program_flutter.discount,
            discount: Math.floor(program_flutter.discount/program_flutter.price *100),
            cate: 'Mobile Development',
            reviewCount: '03 reviews',
            title: 'Flutter  Development Program',
            totalLeson: '18 weeks Lesson',
            schdule: longEnUsFormatter.format(new Date(`${flutter.starts}`)),
            authorImgUrl:  img4,
            authorImgAlt: 'course author vereda vereda',
            authorName: flutter.trainerName,
            btnText: 'Read More',
            coursedtl: '/Program/Flutter-Development-Program',
            seats:flutter.studentsno,
        },
        // {
        //     imgUrl: 'assets/images/course/03.jpg',
        //     imgAlt: 'course vereda vereda',
        //     price: '$30',
        //     cate: 'Adobe XD',
        //     reviewCount: '03 reviews',
        //     title: 'Theory Learn New Student And Fundamentals',
        //     totalLeson: '18x Lesson',
        //     schdule: 'Online Class',
        //     authorImgUrl: 'assets/images/course/author/03.jpg',
        //     authorImgAlt: 'course author vereda vereda',
        //     authorName: 'Robot Smith',
        //     btnText: 'Read More',
        // },
        // {
        //     imgUrl: 'assets/images/course/04.jpg',
        //     imgAlt: 'course vereda vereda',
        //     price: '$30',
        //     cate: 'Adobe XD',
        //     reviewCount: '03 reviews',
        //     title: 'Computer Fundamentals Basic Startup Ultricies Vitae',
        //     totalLeson: '18x Lesson',
        //     schdule: 'Online Class',
        //     authorImgUrl: 'assets/images/course/author/04.jpg',
        //     authorImgAlt: 'course author vereda vereda',
        //     authorName: 'Zinat Zaara',
        //     btnText: 'Read More',
        // },
        // {
        //     imgUrl: 'assets/images/course/05.jpg',
        //     imgAlt: 'course vereda vereda',
        //     price: '$30',
        //     cate: 'Adobe XD',
        //     reviewCount: '03 reviews',
        //     title: 'Boozy Halloween Drinks for the Grown Eleifend Kuismod',
        //     totalLeson: '18x Lesson',
        //     schdule: 'Online Class',
        //     authorImgUrl: 'assets/images/course/author/05.jpg',
        //     authorImgAlt: 'course author vereda vereda',
        //     authorName: 'Himanshu ',
        //     btnText: 'Read More',
        // },
        // {
        //     imgUrl: 'assets/images/course/06.jpg',
        //     imgAlt: 'course vereda vereda',
        //     price: '$30',
        //     cate: 'Adobe XD',
        //     reviewCount: '03 reviews',
        //     title: 'Student Want to Learn About Science And Arts',
        //     totalLeson: '18x Lesson',
        //     schdule: 'Online Class',
        //     authorImgUrl: 'assets/images/course/author/06.jpg',
        //     authorImgAlt: 'course author vereda vereda',
        //     authorName: 'Angel Mili',
        //     btnText: 'Read More',
        // },
    ]
    // const [key, setKey] = useState('home');
  
     
  

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
  
    return (
        <Fragment>
             <Head title="Programs offered">
                <meta name="description" content="Explore your preferred program, get a glance of program contents and skills you will acquire from learning" />
            {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ --> */}
            <meta property="og:vereda.co.in" content="https://vereda.co.in/pages/view-courses" />{/**<!-- website link --> */}
                    <meta property="og:title" content="Contact"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Contact us by filling the form found on this page. " />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" content="../Images/banner.jpg"/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/pages/view-courses" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in/pages/view-courses" />
            </Head>
            <Header />
            <PageHeader title={'Archives: Courses'} curPage={'Course Page'} />
            {/* <GroupSelect /> */}
            <div className="course-section padding-tb section-bg">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="course-showing-part">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <div className="course-showing-part-left">
                                    <p>Showing 1-2 of 10 results</p>
                                </div>
                                <div className="course-showing-part-right d-flex flex-wrap align-items-center">
                                    <span>Sort by :</span>
                                    <div className="select-item">
                                        <SkillSelect select={'all'} />
                                        <div className="select-icon">
                                            <i className="icofont-rounded-down"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4 justify-content-center row-cols-xl-2 row-cols-md-2 row-cols-1">
                            {courseList.map((val, i) => (
                                <div className="col" key={i}>
                                    <div className="course-item">
                                        <div className="course-inner">
                                            <div style={{height:"390px"}} className="course-thumb">
                                               <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="course-content">
                                            {val.discAm > 1 &&  <>
                                             <div style={{background: "red"}} className="course-price mt-5">{val.discount+"%"}</div> 
                                             <span style={{top:"20px"}} className="relative fw-bolder fs-4  float-right">Off</span></> 
                                            }
                                           
                                            <div className="course-category">
                                                <div className="course-cate">
                                                    <a href="#">{val.cate}</a>
                                                </div>
                                              <div className="course-reiew flex">
                                                    <h4 className="fw-bold text-color-dark-blue">INR {val.price.toLocaleString()}</h4>
                                                    {val.discAm > 1 &&  <span className="ratting-count line-through fw-bold"> {val.prevPrice.toLocaleString()}</span>}
                                                </div>
                                            </div>
                                                <Link href={val.coursedtl}><h4>{val.title}</h4></Link>
                                                <div className="course-details">
                                                    <div className="couse-count">  <h4 className="h3-bullet">BATCH  {val.seats >= 15 ? "STARTS ON" : ""}</h4>
                                                    <h5 className="h5-bullet">{val.seats >= 15 ? val.schdule : "Coming Soon" }   </h5>
                                                </div>
                                                    <div className="couse-topic">
                                                        <h4 className="h3-bullet">
                                                          Limited Seats</h4>
                                                     <h5 className="h5-bullet">{20-val.seats} Available</h5></div>
                                                </div>
                                                <div className="course-footer">
                                                    <div className="course-author">
                                                        {/** <img src={`${val.authorImgUrl}`}  width="50px" alt={`${val.authorImgAlt}`} />*/} 
                                                        <p  className="ca-name">{val.authorName}</p>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                        type="text"
                        onChange={HandleChange}
                        value={values.name}
                        id="name"
                        required
                        />
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                        type="email"
                        onChange={HandleChange}
                        value={values.email}
                        id="email"
                        required
                        />
                        <Form.Label>
                            Phone
                        </Form.Label>
                        <Form.Control
                        type="number"
                        id="phone"
                        value={values.phone}
                        onChange={HandleChange}
                        required
                        />
                        <Form.Label>
                            Country
                        </Form.Label>
                        <Form.Control
                        type="text"
                        value={values.country}
                        id="country"
                        onChange={HandleChange}
                        required
                        />
                        <Form.Label>
                            Occupation
                        </Form.Label>
                        <Form.Control
                        type="text"
                        id="occupation"
                        value={values.occupation}
                        onChange={HandleChange}
                        required
                        />
                        <Form.Label>
                            State
                        </Form.Label>
                        <Form.Control
                        type="text"
                        id="state"
                        value={values.state}
                        onChange={HandleChange}
                        required
                        />
                        <Form.Label>
                            Language
                        </Form.Label>
                        <Form.Select 
                        onChange={HandleChange}
                        vlaue={values.language}
                        id="language"
                        required
                        >
                            <option>select Language</option>
                            <option value='Telugu'>English</option>
                            <option value='Hindi'>Hindi</option>
                        
                        </Form.Select>
                        <PrimaryButton className='mt-5'>submit</PrimaryButton>
                    {flash.message && (<div className='alert alert-success' >Request sent successfully</div>)}
                    </form>
                </Container>
         </>}
         />
                        </div>
                        {/* <Pagination /> */}
                    </div>
                </div>
            </div>
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
                         <option value='Telugu'>Telugu</option>
                         <option value='Kannada'>Kannada</option>
                         <option value='Hindi'>Hindi</option>
                         <option value='tamil'>Tamil</option>
                     </Form.Select>
                     <PrimaryButton className='mt-5'>submit</PrimaryButton>
                 {flash.message && (<div className='alert alert-success' >Request sent successfully</div>)}
                 </form>
             </Container>
      </>}
      />
            <Footer />

        </Fragment>
    );
}
 
export default CoursePage;