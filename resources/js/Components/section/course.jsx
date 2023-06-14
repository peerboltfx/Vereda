import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Rating from "../sidebar/rating";
import Img1 from "../../assets/Images/course/01.jpg";
import { Container } from "react-bootstrap";
import authotImg1 from "../../assets/Images/course/author/01.jpg";
import authotImg2 from "../../assets/Images/course/author/02.jpg";
import Fullstack from '@/assets/Team/fullstack-2.webp';
import Flutter from '@/assets/Team/Flutter-App-development.webp';
import { usePage } from "@inertiajs/inertia-react";
import { OffCanvasExample } from "@/Components/DropBottom";
import Form from "react-bootstrap/Form";
import PrimaryButton from '@/Components/PrimaryButton';
import { Inertia } from "@inertiajs/inertia";
import ReactPlayer from "react-player";
import Logo from '@/assets/Images/logo.png';


const subTitle = "Featured Courses";
const title = "Pick A Course To Get Started";



const Course = () => {
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
            totalLeson: '18x Lesson',
            schdule: longEnUsFormatter.format(new Date(`${fullstack.starts}`)),
            authorImgUrl: authotImg1,
            authorImgAlt: 'course author vereda vereda',
            authorName: fullstack.trainerName,
            btnText: '',
            coursedtl: '/Program/Full-Stack-Development-Program',
            seats:fullstack.studentsno,
        },
        {
            imgUrl: Flutter,
            imgAlt: 'course vereda vereda',
            price: program_flutter.price - program_flutter.discount,
            discAm:program_flutter.discount,
            prevPrice: program_flutter.price,
            discount: Math.floor(program_flutter.discount/program_flutter.price *100),
            cate: 'Mobile Development',
           
            title: 'Flutter Development Program',
            totalLeson: '18x Lesson',
            schdule: longEnUsFormatter.format(new Date(`${flutter.starts}`)),
            authorImgUrl: authotImg2,
            authorImgAlt: 'course author vereda vereda',
            authorName: flutter.trainerName,
            btnText: '',
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
    console.log(fullstack)
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
        <div className="course-section padding-tb section-bg">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-xl-2 row-cols-md-2 row-cols-1">
                        {courseList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="course-item">
                                    <div className="course-inner">
                                        <div  className="course-thumb rounded">
                                            
                                            <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                        </div>
                                        <div className="course-content">
                                            {val.discAm > 1 && <>
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
                                                    <div className="couse-count">  <h4 className="h3-bullet">BATCH {val.seats >= 15 ? "STARTS ON" : ""}</h4>
                                                    <h5 className="h5-bullet">{val.seats >= 15 ? val.schdule : "Coming Soon" }   </h5>
                                                </div>
                                                    <div className="couse-topic">
                                                        <h4 className="h3-bullet"> Limited Seats</h4>
                                                     <h5 className="h5-bullet">{20-val.seats} Available</h5></div>
                                                </div>
                                            <div className="course-footer">
                                                <div className="course-author">
                                                {/**    <img src={`${val.authorImgUrl}`} alt={`${val.authorImgAlt}`} />*/} 
                                                    <Link to="#" className="ca-name fw-bold capitalize">{val.authorName}</Link>
                                                </div>
                                                {/** 
                                                <div className="course-btn">
                                                    <Link to={val.coursedtl} className="lab-btn-text">{val.btnText} <i className="icofont-external-link"></i></Link>
                                                </div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Course;