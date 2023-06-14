
import { Link } from "@inertiajs/inertia-react";
import Rating from "../sidebar/rating";
import Himanshu from "../../assets/Team/Pictures-2.png";
import kunal from "../../assets/Team/Kunal-Kishore.webp";
import Ujjwal from "../../assets/Team/Ujjwal-Verma.webp";
import Kingsley from "../../assets/Team/kingsley.webp";
import Vishal from "../../assets/Team/vishal.webp";
import Sameer from "../../assets/Team/sameer.png";
import Hermant from "@/assets/Team/Hermant-kumar.webp";
import { ControlledCarousel } from '@/Components/Carousel';


const subTitle = "Our Management Team";
const title = "Our Management Team";

const instructorList = [
    
    {
        imgUrl: Ujjwal,
        imgAlt: 'instructor vereda vereda',
        name: 'Ujjwal Verma',
        degi: 'Lead Software Developer IIT Kharagpur',
        courseCount: '08 courses',
        studentAnroll: '30 students',
        iconName: 'icofont-linkedin',
        className: 'linkedin',
        linkedInAddress:"https://www.linkedin.com/in/ujjwalverma007"
    },
    {
        imgUrl: kunal,
        imgAlt: 'instructor vereda vereda',
        name: 'Kunal Kishore',
        degi: '11+ years Experience in Human Resources',
        courseCount: '08 courses',
        studentAnroll: '30 students',
        iconName: 'icofont-linkedin',
        className: 'linkedin',
        linkedInAddress:"#"
    },

    {
        imgUrl: Vishal,
        imgAlt: 'instructor vereda vereda',
        name: 'Vishal Pankaj',
        degi: 'Technical Domain Expert and Skilled Instructor',
        courseCount: '08 courses',
        studentAnroll: '30 students',
        iconName: 'icofont-linkedin',
        className: 'linkedin',
        linkedInAddress:"https://www.linkedin.com/in/vishal-pankaj-30503a103"
    },
]

const Headteam = [
    {
        imgUrl: Himanshu,
        imgAlt: 'Founder Vereda.co.in',
        name: 'Himanshu Kumar',
        degi: 'Founder B. Tech (PTU)',
        courseCount: '08 courses',
        studentAnroll: '30 students',
        iconName: 'icofont-linkedin',
        className: 'linkedin',
        linkedInAddress:"#"
    },
    {
        imgUrl: Hermant,
        imgAlt: 'instructor vereda vereda',
        name: 'Hermant Kumar',
        degi: 'Co-Founder B-tech (PTU)',
        courseCount: '08 courses',
        studentAnroll: '30 students',
        iconName: 'icofont-linkedin',
        className: 'linkedin',
        linkedInAddress:"https://www.linkedin.com/in/hermant-kumar-sedhanshu-42142390"
    },
    // {
    //     imgUrl: Kingsley,
    //     imgAlt: 'Developer',
    //     name: 'Kingsley Orji',
    //     degi: 'IT Staff & Full Stack Developer',
    //     courseCount: '08 courses',
    //     studentAnroll: '30 students',
    //     iconName: 'icofont-linkedin',
    //     className: 'linkedin',
    //     linkedInAddress:"#"
    // },
    // {
    //     imgUrl: Sameer,
    //     imgAlt: 'instructor vereda vereda',
    //     name: 'Sameer Ansari',
    //     degi: 'Front-end Developer & UI/UX Designer',
    //     courseCount: '08 courses',
    //     studentAnroll: '30 students',
    //     iconName: 'icofont-linkedin',
    //     className: 'linkedin',
    //     linkedInAddress:"https://www.linkedin.com/in/speaktosameer/"
    // },

   
]

const Instructor = () => {
    return (
        <div className="instructor-section padding-tb section-bg">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    {/* <h2 className="title">{title}</h2> */}
                </div>
                <div className="section-wrapper">
                    <div className="">
                    <div className="row g-4 justify-content-center row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                            {Headteam.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="instructor-item">
                                    <div className="instructor-inner">
                                        <div className="instructor-thumb  items-center">
                                            <img src={`${val.imgUrl}`} style={{marginLeft: "auto",  marginRight:"auto"}} width="150px" alt={`${val.imgAlt}`} />
                                        </div>
                                        <div className="instructor-content mt-2">
                                           <h4>{val.name}</h4>
                                            <p>{val.degi}</p>
                                         <a href={val.linkedInAddress} target="_blank" className={val.className}> <i className={val.iconName}></i></a>  
                                        </div>
                                    </div>
                                    {/* <div className="instructor-footer">
                                        <ul className="lab-ul d-flex flex-wrap justify-content-between align-items-center">
                                            <li><i className="icofont-book-alt"></i> {val.courseCount}</li>
                                            <li><i className="icofont-users-alt-3"></i> {val.studentAnroll}</li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                        </div>
                    <ControlledCarousel 
                    // item2={<div className="row g-4 justify-content-center row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">{instructorList.map((val, i) => (
                    //         <div className="col" key={i}>
                    //             <div className="instructor-item">
                    //                 <div className="instructor-inner">
                    //                     <div className="instructor-thumb  items-center">
                    //                         <img src={`${val.imgUrl}`} style={{marginLeft: "auto", marginRight:"auto"}} width="150px" alt={`${val.imgAlt}`} />
                    //                     </div>
                    //                     <div className="instructor-content">
                    //                        <h4>{val.name}</h4>
                    //                         <p>{val.degi}</p>
                    //                      <a href={val.linkedInAddress} target="_blank" className={val.className}> <i className={val.iconName}></i></a>  
                    //                     </div>
                    //                 </div>
                    //                 {/* <div className="instructor-footer">
                    //                     <ul className="lab-ul d-flex flex-wrap justify-content-between align-items-center">
                    //                         <li><i className="icofont-book-alt"></i> {val.courseCount}</li>
                    //                         <li><i className="icofont-users-alt-3"></i> {val.studentAnroll}</li>
                    //                     </ul>
                    //                 </div> */}
                    //             </div>
                    //         </div>
                    //     ))}</div>} 
                        
                        // Item1={
                        // <div className="row g-4 justify-content-center row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                        //     {Headteam.map((val, i) => (
                        //     <div className="col" key={i}>
                        //         <div className="instructor-item">
                        //             <div className="instructor-inner">
                        //                 <div className="instructor-thumb  items-center">
                        //                     <img src={`${val.imgUrl}`} style={{marginLeft: "auto",  marginRight:"auto"}} width="150px" alt={`${val.imgAlt}`} />
                        //                 </div>
                        //                 <div className="instructor-content mt-2">
                        //                    <h4>{val.name}</h4>
                        //                     <p>{val.degi}</p>
                        //                  <a href={val.linkedInAddress} target="_blank" className={val.className}> <i className={val.iconName}></i></a>  
                        //                 </div>
                        //             </div>
                        //             {/* <div className="instructor-footer">
                        //                 <ul className="lab-ul d-flex flex-wrap justify-content-between align-items-center">
                        //                     <li><i className="icofont-book-alt"></i> {val.courseCount}</li>
                        //                     <li><i className="icofont-users-alt-3"></i> {val.studentAnroll}</li>
                        //                 </ul>
                        //             </div> */}
                        //         </div>
                        //     </div>
                        // ))}
                        // </div>}
                        />
                    </div>
                    {/**
                    <div className="text-center footer-btn">
                        <p>Want to help people learn, grow and achieve more in life?<Link to="/team">Become an instructor</Link></p>
                    </div>
                     */}
                </div>
            </div>
        </div>
    );
}
 
export default Instructor;