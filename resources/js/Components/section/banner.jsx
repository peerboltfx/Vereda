
import { Link} from "@inertiajs/inertia-react";
import BannerImg from '../../assets/images/banner/hero1.png';
import Student2 from "@/assets/Team/student.webp";
import { OffCanvasExample } from "@/Components/DropBottom";
import Logo from '@/assets/Images/logo.png';
import PrimaryButton from '@/Components/PrimaryButton';
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Form from "react-bootstrap/Form";
import React, { useState} from "react";
import {Container} from "reactstrap";

const subTitle = "Online education";
const title = <h2 className="title"><span className="d-lg-block">Up Your Skills</span> To Advance Your <span className="d-lg-block">Carrer Path</span></h2>;


const catagoryList = [
    {
        name: 'Figma',
        link: '#',
    },
    {
        name: 'Adobe XD',
        link: '#',
    },
    {
        name: 'illustration',
        link: '#',
    },
    {
        name: 'Photoshop',
        link: '#',
    },
]


const shapeList = [
    {
        name: '16M Students Happy',
        link: '#',
        className: 'ccl-shape shape-1',
    },
    {
        name: '130K+ Total Courses',
        link: '#',
        className: 'ccl-shape shape-2',
    },
    {
        name: '89% Successful Students',
        link: '#',
        className: 'ccl-shape shape-3',
    },
    {
        name: '23M+ Learners',
        link: '#',
        className: 'ccl-shape shape-4',
    },
    {
        name: '36+ Languages',
        link: '#',
        className: 'ccl-shape shape-5',
    },
]

const Banner = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const { flash} = usePage().props;
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
        <section className="banner-section">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row align-items-center">
                        <div className="col-xxl-8 col-xl-6 col-lg-10">
                            <div className="banner-content">
                                <h6 className="subtitle text-uppercase fw-medium">{subTitle}</h6>
                                {title}
                              <p className="desc capitalize"> digital training program by indian's Leading experts.<br/> join many Learners today, acquire a tech skill.</p>
                                <div className="mb-5">
                                    {/* <div className="banner-icon">
                                        <i className="icofont-search"></i>
                                    </div>
                                    <input type="text" placeholder="Keywords of your course" /> */}
                                    <button className="bg-primaries" type="#"><a className="text-white" href="register">Get Started</a></button>
                                    <button className="bg-primaries ml-2 text-white" type="#"  onClick={handleShow}>Request Call Back</button>

                                </div>
                                
                            {/** <div className="banner-catagory d-flex flex-wrap">
                                    <p>Most Popular : </p>
                                    <ul className="lab-ul d-flex flex-wrap">
                                        {catagoryList.map((val, i) => (
                                            <li key={i}><a href={val.link}>{val.name}</a></li>
                                        ))}
                                    </ul>
                                </div>*/}
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-6">
                            <div className="banner-thumb">
                                <img src={BannerImg} width="80%" style={{position:"relative", top:"10px"}} alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="all-shapes"></div>
            <div className="cbs-content-list d-none">
                {/**
                <ul className="lab-ul">
                    {shapeList.map((val, i) => (
                        <li className={val.className} key={i}><a href={val.link}>{val.name}</a></li>
                    ))}
                </ul>*/}
                
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
                         <option value='English'>English</option>
                         <option value='Hindi'>Hindi</option>
                     </Form.Select>
                     <PrimaryButton className='mt-5'>submit</PrimaryButton>
                 {flash.message && (<div className='alert alert-success' >Request sent successfully</div>)}
                 </form>
             </Container>
      </>}
      />
        </section>
    );
}
 
export default Banner;