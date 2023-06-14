import React,{useState} from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Shape1 from '../../assets/images/shape-img/03.png';
import Shape2 from '../../assets/images/shape-img/04.png';
import { Alert } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
const newsTitle = "Want Us To Email You About Special Offers And Updates?";
const siteTitle = "Site Map";
const useTitle = "Useful Links";
const socialTitle = "Social Contact";
const supportTitle = "Our Support";


const siteList = [
    {
        text: 'Home',
        link: '/',
    },
    {
        text: 'DashBoard',
        link: '/dashboard',
    },
    {
        text: 'Login',
        link: '/login',
    },
    {
        text: 'Register',
        link: '/register',
    }
]

const useList = [
    {
        text: 'About Us',
        link: '/pages/about',
    },
    {
        text: 'Contact Us',
        link: '/pages/contact',
    },
    {
        text: 'Refund Policy',
        link: route('RefundPolicy'),
    },
    {
        text: 'Terms & Conditions',
        link: route('TermsAndCond'),
    },
    {
        text: 'Privacy Policy',
        link: route('PrivacyPolicy'),
    },
]

const socialList = [
    {
        text: 'Facebook',
        link: 'https://www.facebook.com/veredaindia?mibextid=LQQJ4d',
    },
   
    {
        text: 'Instagram',
        link: 'https://www.instagram.com/veredaindia',
    },
    {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/company/vereda-management-india/',
    },
]

const supportList = [
    {
        text: 'Help Center',
        link: 'https://wa.me/+919570994444',
    },
  /**   {
        text: 'Status',
        link: '#',
    },
    {
        text: 'Changelog',
        link: '#',
    },*/
    {
        text: 'Contact Support',
        link: 'tel:+919570994444',
    },
]



const Footer = () => {
    const {flash}=usePage().props;
    const [values, setValue] = useState({
        "email":"",
    })
    const HandleChange=(e)=>{
       const key=e.target.name;
       const value = e.target.value;
       setValue(values => ({
        ...values,
        [key]:value,
       }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        Inertia.post('/news-form',values);
    }

    return (
        <div className="news-footer-wrap">
            <div className="fs-shape">
                <img src={Shape1} alt="fst" className="fst-1" />
                <img src={Shape2} alt="fst" className="fst-2" />
            </div>
            
            <div className="news-letter">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="news-title">
                            <h3>{newsTitle}</h3>
                        </div>
                        <div className="news-form rounded-md">
                            <form onSubmit={handleSubmit}>
                                <div className="nf-list rounded-md">
                                    <input type="email" onChange={HandleChange} value={values.email} name="email" placeholder="Enter Your Email" />
                                    <input type="submit" className="rounded-md" value="Subscribe Now" />
                                </div>
                                {flash.message && <><Alert variant="success" className="mt-3">{flash.message}</Alert></>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <footer>
                <div className="footer-top padding-tb pt-0">
                    <div className="container">
                        <div className="row g-4 row-cols-xl-4 row-cols-md-2 row-cols-1 justify-content-center">
                            <div className="col">
                                <div className="footer-item">
                                    <div className="footer-inner">
                                        <div className="footer-content">
                                            <div className="title">
                                                <h4>{siteTitle}</h4>
                                            </div>
                                            <div className="content">
                                                <ul className="lab-ul">
                                                    {siteList.map((val, i) => (
                                                        <li key={i}><Link href={val.link}>{val.text}</Link></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="footer-item">
                                    <div className="footer-inner">
                                        <div className="footer-content">
                                            <div className="title">
                                                <h4>{useTitle}</h4>
                                            </div>
                                            <div className="content">
                                                <ul className="lab-ul">
                                                    {useList.map((val, i) => (
                                                        <li key={i}><a href={val.link}>{val.text}</a></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="footer-item">
                                    <div className="footer-inner">
                                        <div className="footer-content">
                                            <div className="title">
                                                <h4>{socialTitle}</h4>
                                            </div>
                                            <div className="content">
                                                <ul className="lab-ul">
                                                    {socialList.map((val, i) => (
                                                        <li key={i}><Link href={val.link}>{val.text}</Link></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="col">
                                <div className="footer-item">
                                    <div className="footer-inner">
                                        <div className="footer-content">
                                            <div className="title">
                                                <h4>{supportTitle}</h4>
                                            </div>
                                            <div className="content">
                                                <ul className="lab-ul">
                                                    {supportList.map((val, i) => (
                                                        <li key={i}><a  target="_blank" href={val.link}>{val.text}</a></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                        </div>
                    </div>
                </div>
                <div className="footer-bottom style-2">
                    <div className="container">
                        <div className="section-wrapper">
                            <p><Link href="/">Vereda Digital Learning</Link>&copy; 2023 </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
 
export default Footer;