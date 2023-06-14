import { Fragment } from "react";
import Footer from "@/Components/layout/footer";
import Header from "@/Components/layout/header";
import PageHeader from "@/Components/layout/pageheader";
import AchievementTwo from "@/Components/section/achievement-2";
import Blog from "@/Components/section/blog";
import Instructor from "@/Components/section/instructor";
import Skill from "@/Components/section/skill";
import Student from "@/Components/section/student";
import img1 from "@/assets/Images/about/icon/01.jpg";
import img2 from "@/assets/Images/about/icon/02.jpg";
import img3 from "@/assets/Images/about/icon/03.jpg";
import about1 from "@/assets/images/about/01.jpg";
import about2 from "@/assets/images/about/02.jpg";
import { Mentor } from "@/Components/mentor";
import { usePage,Head } from "@inertiajs/inertia-react";
import {Container, Row, Col} from "react-bootstrap";
import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';
import imaging from "@/assets/Images/blog-details.jpg";



const subTitle = "About Vereda Digital Learning";
const title = "Good Qualification Services And Better Skills";
const desc = "We Provide digital academic studies and live class that enables learners through rigorous and highly specialized training. Our aim is to revolutionise tech education in India. We believe in outcomes and skills over degrees and Certificates.";

const year = "30+";
const expareance = "Years Of Experiences";



const aboutList = [
    {
        imgUrl: img1,
        imgAlt: 'about icon vereda vereda',
        title: 'Skilled Instructors',
        desc: 'Our instructor are provided with tools and skills to teach what you love.',
    },
    {
        imgUrl: img2,
        imgAlt: 'about icon vereda vereda',
        title: 'Get Certificate',
        desc: 'When you complete all of the courses in the program, you`ll earn a certificate to share with your professional network as well as unlock access to career support resources to help you kickstart your new career',
    },
    {
        imgUrl: img3,
        imgAlt: 'about icon vereda vereda',
        title: 'Online Classes',
        desc: 'Our classes are all online base studies, students can study at their own comfort zone.',
    },
]



const AboutPage = () => {
    return ( 
        <Fragment>
             <Head title="About Vereda">
                <meta name="description" content="Focus on providing high-quality training and education to help individuals to develope the skill they need to succeed in the workforce." />
                
                    {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ --> */}
                    <meta property="og:vereda.co.in" content="https://vereda.co.in/pages about" />{/**<!-- website link --> */}
                    <meta property="og:title" content="About Vereda DIgital Technologies"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Focus on providing high-quality training and education to help individuals to develope the skill they need to succeed in the workforce. " />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" itemProp="image" content="../Images/logo.png"/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/pages/about" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in/pages/about" />
            </Head>
            <Header />
            <PageHeader title={'About Vereda'} curPage={'About'} />
            <div className="about-section style-3 padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
                        <div className="col">
                            <div className="about-left">
                                <div className="about-thumb">
                                    <img src={about1} alt="about" />
                                </div>
                                <div className="abs-thumb">
                                    <img src={about2} alt="about" />
                                </div>
                                <div className="about-left-content">
                                    <h3>{year}</h3>
                                    <p>{expareance}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="about-right">
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
                    </div>
                </div>
            </div>
            <section className="bg-secondarys">
                    <Container>
                    <div className="section-header pt-3">
                                    <h2 className="title mt-5 mb-3">About us at Vereda</h2>
                                    <span className="subtitle">Company mission</span>
                  
                                    <p>Focus on providing high-quality training and education to help individuals to develope the skill they
                                        need to succeed in the workforce. 
                                        Connecting graduate with employment opportunities and helping to bridge the gap between education and employment.<br/>
                                        Connecting graduates with employment opportunities and helping to bridge the gap between education and employement.
                                    </p>
                            </div>
                            <Row className="header-block">
                                <Col lg="7" sm="12" md="12">
                            <div className="section-header pt-3 pb-5">  
                            <h4 className="title mt-5 mb-3">About Vereda</h4>   
                            <span className="subtitle">Our Value</span>
                            <p>
                            <b>Quality : </b> Providing high-quality training and education that prepares individuals for the workforce and help them succeed in their careers.
                            </p>
                            <p>
                                <b>Accessibility : </b> Making education the training accessible to all individuals, regargdless of their background or finiancial situation.
                            </p>
                            <p>
                                <b>Impact:</b> Making a positibe impact on the communities and industries it serves by connecting graduates with employment opportunities.
                            </p>
                            <p><b>Innovation : </b>
                                Using cutting-edge technology and pedagogy for training and education.
                            </p>
                            <p><b>Student-centricity : </b>
                                Putting the needs and goals of the students first and providing them with personalised support and guidance.
                            </p>
                            <p><b>Sustainability :</b> 
                                Creating a sustainable business model that benefits students, employers, and the company itself.</p>
                            <p><b>Collaboration : </b> Building partnerships with employers, educational institutions, and other organisations to provide studens with a comprehensive education and a smooth transition to the workforce.</p>
                            </div>
                            </Col>
                                <Col >  
                                <div className="about-thumb">
                                    <img src={imaging} width="90%" alt="about" />
                                </div></Col>
                            </Row>
                    </Container>
            </section>
            <Instructor />
            <Mentor />
            <Skill />
           {/**  <AchievementTwo />*/}
          {/**   <Blog />*/}
            <Footer />
        </Fragment>
    );
}

export default AboutPage;
 