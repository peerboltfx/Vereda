
import { Link } from "@inertiajs/inertia-react";
import Rating from "../sidebar/rating";
import student from "../../assets/Images/feedback/student/01.jpg"
import student2 from "../../assets/Images/feedback/student/02.jpg"
import feedback from "../../assets/Images/feedback/01.jpg"
const subTitle = "Loved by 200,000+ students";
const title = "Students Community Feedback";


const studentList = [
    {
        imgUrl: student,
        imgAlt: 'student vereda vereda',
        name: 'Oliver Beddows',
        degi: 'UX designer',
        desc: 'Rapidiously buildcollaboration anden deas sharing viaing and bleedng edgeing nterfaces fnergstcally plagiarize teams anbuilding paradgms whereas goingi forward process and monetze',
    },
    {
        imgUrl: student2,
        imgAlt: 'student vereda vereda',
        name: 'Madley Pondor',
        degi: 'UX designer',
        desc: 'Rapidiously buildcollaboration anden deas sharing viaing and bleedng edgeing nterfaces fnergstcally plagiarize teams anbuilding paradgms whereas goingi forward process and monetze',
    },
]


const Student = () => {
    return (
        <div className="student-feedbak-section padding-tb shape-img">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row justify-content-center row-cols-lg-2 row-cols-1">
                        <div className="col">
                            <div className="sf-left">
                                <div className="sfl-thumb">
                                    <img src={feedback} alt="student feedback" />
                                    <a href="https://www.youtube.com/embed/MU3qrgR2Kkc" className="video-button popup" target="_blank"><i className="icofont-ui-play"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            {studentList.map((val, i) => (
                                <div className="stu-feed-item" key={i}>
                                    <div className="stu-feed-inner">
                                        <div className="stu-feed-top">
                                            <div className="sft-left">
                                                <div className="sftl-thumb">
                                                    <img src={`${val.imgUrl}`} alt={val.imgAlt} />
                                                </div>
                                                <div className="sftl-content">
                                                    <Link to="/team-single"><h6>{val.name}</h6></Link>
                                                    <span>{val.degi}</span>
                                                </div>
                                            </div>
                                            <div className="sft-right">
                                                <Rating />
                                            </div>
                                        </div>
                                        <div className="stu-feed-bottom">
                                            <p>{val.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Student;