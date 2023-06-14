
import Img1 from "../../assets/Images/about/icon/01.jpg";
import Img2 from "../../assets/Images/about/icon/02.jpg";
import Img3 from "../../assets/Images/about/icon/03.jpg";
import img4 from "../../assets/Images/about/01.png";
import Student2 from "@/assets/Team/img-1.webp";

const subTitle = "About Our Vereda";
const title = "Good Qualification Services And Better Skills";
const desc = " Vereda Digital Technologies Private Limited is an emerging bootcamp provider that enables learners through rigorous and highly specialized training. Our aim is to revolutionise tech education in India. We believe in outcomes and skills over degrees and Certificates.";



const aboutList = [
    {
        imgUrl: Img1,
        imgAlt: 'about icon vereda vereda',
        title: 'Skilled Instructors',
        desc: 'Our instructor are provided with tools and skills to teach what you love.',
    },
    {
        imgUrl: Img2,
        imgAlt: 'about icon vereda vereda',
        title: 'Get Certificate',
        desc: 'When you complete all of the courses in the program, you`ll earn a certificate to share with your professional network as well as unlock access to career support resources to help you kickstart your new career',
    },
    {
        imgUrl: Img3,
        imgAlt: 'about icon vereda vereda',
        title: 'Online Classes',
        desc: 'Our classes are all online base studies, students can study at their own comfort zone.',
    },
]
const About = () => {
    return (
        <div className="about-section">
            <div className="container">
                <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-end flex-row-reverse">
                    <div className="col">
                        <div className="about-right padding-tb">
                            <div className="section-header">
                                <span className="subtitle">{subTitle}</span>
                                <h2 className="title">{title}</h2>
                                <p>{desc}</p>
                            </div>
                            <div className="section-wrapper">
                                <ul className="lab-ul">
                                    {aboutList.map((val, i) => (
                                        <li key={i}>
                                            <div className="sr-left">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="sr-right">
                                                <h5>{val.title}</h5>
                                                <p>{val.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="about-left">
                            <div className="about-thumb">
                                <img src={Student2} alt="about" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default About;