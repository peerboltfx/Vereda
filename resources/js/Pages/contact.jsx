import { Component, Fragment, useState } from "react";
import Footer from "@/Components/layout/footer";
import Header from "@/Components/layout/header";
import PageHeader from "@/Components/layout/pageheader";
import GoogleMap from "@/Components/sidebar/googlemap";
import { Inertia } from "@inertiajs/inertia";
import { usePage,Head } from "@inertiajs/inertia-react";
import { Alert } from "react-bootstrap";
import img1 from "@/assets/Images/icon/01.png";
import img2 from "@/assets/Images/icon/02.png";
import img3 from "@/assets/Images/icon/03.png";
import img4 from "@/assets/Images/icon/04.png";
import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';

const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle = "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send our Message";


const contactList = [
    {
        imgUrl: img1,
        imgAlt: 'contact icon',
        title: 'Office Address',
        desc: 'Sinha Library road, Venture park Patna',
    },
    {
        imgUrl: img2,
        imgAlt: 'contact icon',
        title: 'Phone number',
        desc: '+919570994444',
    },
    {
        imgUrl: img3,
        imgAlt: 'contact icon',
        title: 'Send email',
        desc: 'support@vereda.co.in',
    },
    {
        imgUrl: img4,
        imgAlt: 'contact icon',
        title: 'Our website',
        desc: 'www.vereda.co.in',
    },
]


const ContactPage = () => {
    const {flash} = usePage().props;

const [values, setValues]=useState({
    "name":"",
    "email":"",
    "phone":"",
    "message":"",
    "subject": ""
});

const HandleChange=(e)=>{
    const key=e.target.name;
    const value=e.target.value;
    setValues(values=>({
                ...values,
                [key]:value,
    }))
}
const HandleSubmit=(e)=>{
    e.preventDefault();
    Inertia.post("/request/send-message",values);
}
    return ( 
        <Fragment>
            <Head title="Contact us">
                <meta name="description" content="Contact us by filling the form found on this page." />
                
                    {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ --> */}
                    <meta property="og:url" content="https://vereda.co.in/pages/contact" />{/**<!-- website link --> */}
                    <meta property="og:title" content="Contact"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Contact us by filling the form found on this page. " />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" itemProp="image" content="../Images/banner.jpg"/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/pages/contact" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in/pages/contact" />
            </Head>
            <Header />
            <PageHeader title={'Get In Touch With Us'} curPage={'Contact Us'} />
            <div className="map-address-section padding-tb section-bg">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="subtitle">{subTitle}</span>
                        <h2 className="title">{title}</h2>
                    </div>
                    <div className="section-wrapper">
                        <div className="row flex-row-reverse">
                            <div className="col-xl-4 col-lg-5 col-12">
                                <div className="contact-wrapper">
                                    {contactList.map((val, i) => (
                                        <div className="contact-item" key={i}>
                                            <div className="contact-thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="contact-content">
                                                <h6 className="title">{val.title}</h6>
                                                <p>{val.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-7 col-12">
                                <GoogleMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-section padding-tb">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="subtitle">{conSubTitle}</span>
                        <h2 className="title">{conTitle}</h2>
                    </div>
                    <div className="section-wrapper">
                        <form onSubmit={HandleSubmit} className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    onChange={HandleChange}
                                    value={values.name}
                                    name="name"
                                    placeholder="Your Name *"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    onChange={HandleChange}
                                    value={values.email}
                                    name="email"
                                    placeholder="Your Email *"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    onChange={HandleChange}
                                    value={values.number}
                                    name="number"
                                    placeholder="Mobile Number *"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    onChange={HandleChange}
                                    value={values.subject}
                                    placeholder="Your Subject *"
                                />
                            </div>
                            <div className="form-group w-100">
                                <textarea 
                                    rows="8" 
                                    type="text"
                                    name="message"
                                    onChange={HandleChange}
                                    value={values.message}
                                    placeholder="Your Message"
                                ></textarea>
                            </div>
                            <div className="form-group w-100 text-center">
                                <button className="lab-btn"><span>{btnText}</span></button>
                            </div>
                            {flash.success && <><Alert className="m-2" variant="success">{flash.success}</Alert></>}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}



export default ContactPage;