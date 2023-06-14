import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Logo from '../../assets/images/logo/03.png'

const phoneNumber = "+91-9 570 994 444";
const address = "Sinha Library road, Venture park Patna";


let socialList = [
    {
        iconName: 'icofont-facebook',
        siteLink: 'https://www.facebook.com/veredaindia?mibextid=LQQJ4d',
    },
    {
        iconName: 'icofont-linkedin',
        siteLink: 'https://www.linkedin.com/company/vereda-management-india/',
    },
    {
        iconName: 'icofont-instagram',
        siteLink: 'https://www.instagram.com/veredaindia',
    }
]

const Header = () => {
    const [menuToggle, setMenuToggle] = useState(false);
	const [socialToggle, setSocialToggle] = useState(false);
	const [headerFiexd, setHeaderFiexd] = useState(false);

	window.addEventListener("scroll", () => {
		if (window.scrollY > 200) {
			setHeaderFiexd(true);
		} else {
			setHeaderFiexd(false);
		}
	});

    return (
        <header className={`header-section ${headerFiexd ? "header-fixed fadeInUp" : ""}`}>
            <div className={`header-top ${socialToggle ? "open" : ""}`}>
                <div className="container">
                    <div className="header-top-area">
                        <ul className="lab-ul left">
                            <li><a target="_blank" href="tel:+919 570 994 444"><i className="icofont-ui-call"></i> <span>{phoneNumber}</span></a></li>
                            <li><a target="_blank" href="https://maps.app.goo.gl/5ExiesDgMEmgW6yo6"><i className="icofont-location-pin"></i> {address}</a></li>
                        </ul>
                        <ul className="lab-ul social-icons d-flex align-items-center">
                            <li><p>Find us on : </p></li>
                            {socialList.map((val, i) => (
                                <li key={i}><a target="_blank" href={val.siteLink}><i className={val.iconName}></i></a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <Link href="/"><img src={Logo} alt="logo" /></Link>
                        </div>
                        <div className="menu-area">
                            <div className="menu">
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/pages/view-courses">Courses</Link></li>
                                    {/* <li><Link href="/blog">Blog</Link></li> */}
                                   {/* <li><Link href="/pages/about">About</Link></li> */}
                                    <li><Link href="/pages/contact">Contact</Link></li>
                                    <li className="desktop-hide"> <a href="/login">Login</a></li>
                                </ul>
                            </div>
                            
                            <a href="/login" className="login uppercase"><i className="icofont-user"></i> <span className="ml-2">login</span> </a>

                            <div className={`header-bar d-lg-none ${menuToggle ? "active" : "" }`} onClick={() => setMenuToggle(!menuToggle)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="ellepsis-bar d-lg-none" onClick={() => setSocialToggle(!socialToggle)}>
                                <i className="icofont-info-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
 
export default Header;