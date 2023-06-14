
import { Link } from "@inertiajs/inertia-react";
import img1 from "@/assets/Images/skill/icon/01.jpg";
import img2 from "@/assets/Images/skill/icon/02.jpg";
import img3 from "@/assets/Images/skill/icon/03.jpg";
import img4 from "@/assets/Images/skill/icon/03.jpg";


const title = "Build Your Project Management Skills Online Anytime";
const btnText = "Sign Up Now";

const skillList = [
    {
        imgUrl: img1,
        imgAlt: 'skill vereda vereda',
        title: 'Skilled Instructors',
        desc: 'You pick the schedule.',
    },
    {
        imgUrl: img2,
        imgAlt: 'skill vereda vereda',
        title: 'Get Certificate',
        desc: 'Study at your comfort.',
    },
    {
        imgUrl: img3,
        imgAlt: 'skill vereda vereda',
        title: 'Online Classes',
        desc: 'Study at your comfort .',
    },
    {
        imgUrl: img4,
        imgAlt: 'skill vereda vereda',
        title: 'Educator Helps',
        desc: 'Understand easy.',
    },
]


const Skill = () => {
    return (
        <div className="skill-section padding-tb">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-12">
                        <div className="section-header">
                            <h2 className="title">{title}</h2>
                            <Link href="/register" className="lab-btn"><span>{btnText}</span></Link>
                        </div>
                    </div>
                    <div className="col-lg-7 col-12">
                        <div className="section-wrpper">
                            <div className="row g-4 justify-content-center row-cols-sm-2 row-cols-1">
                                {skillList.map((val, i) => (
                                    <div className="col" key={i}>
                                        <div className="skill-item">
                                            <div className="skill-inner">
                                                <div className="skill-thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                </div>
                                                <div className="skill-content">
                                                    <h5>{val.title}</h5>
                                                    <p>{val.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Skill;