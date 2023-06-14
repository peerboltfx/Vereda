
import { Link } from "@inertiajs/inertia-react";
import payment from "@/assets/Images/pyment/01.jpg";
import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';

const excenge = "Limited time offer";
const paymentTitle = "Secure Payment:";
const shareTitle = "Share This Course:";
const btnText = "Enroll Now";


const csdcList = [
    {
        iconName: 'icofont-book-alt',
        leftText: 'Course Duration',
        rightText: '23 week',
    },
    {
        iconName: 'icofont-signal',
        leftText: 'Online Class',
        rightText: '100%',
    },
    {
        iconName: 'icofont-video-alt',
        leftText: 'Live Session',
        rightText: '20+',
    },
    {
        iconName: 'icofont-abacus-alt',
        leftText: 'Quizzes',
        rightText: '26',
    },
    {
        iconName: 'icofont-hour-glass',
        leftText: 'Pass parcentages',
        rightText: '80',
    },
    {
        iconName: 'icofont-certificate',
        leftText: 'Certificate',
        rightText: 'Yes',
    },
    {
        iconName: 'icofont-globe',
        leftText: 'Language',
        rightText: 'English / Hindi',
    },
]



const CourseSideDetail = ({price, enroll, tweet, ping, linked, instagram}) => {
    
    const socialList = [
        {
            siteLink: linked,
            iconName: 'icofont-linkedin',
            className: ' text-white',
        },
        {
            siteLink: ping,
            iconName: 'icofont-facebook',
            className: ' text-white',
        },
        {
            siteLink: tweet,
            iconName: 'icofont-twitter',
            className: ' text-color-baby-blue',
        }
    ]
    return (
        <div className="course-side-detail">
            <div className="csd-title">
                <div className="csdt-left">
                    <h4 className="mb-0"><sup>INR </sup>{price}</h4>
                </div>
                <div className="csdt-right">
                    <p className="mb-0"><i className="icofont-clock-time"></i>{excenge}</p>
                </div>
            </div>
            <div className="csd-content">
                <div className="csdc-lists">
                    <ul className="lab-ul">
                        {csdcList.map((val, i) => (
                            <li key={i}>
                                <div className="csdc-left"><i className={val.iconName}></i>{val.leftText}</div>
                                <div className="csdc-right">{val.rightText}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sidebar-payment">
                    <div className="sp-title">
                        <h6>{paymentTitle}</h6>
                    </div>
                    <div className="sp-thumb">
                        <img src={payment} alt="Vereda" />
                    </div>
                </div>
                <div className="sidebar-social">
                    <div className="ss-title">
                        <h6>{shareTitle}</h6>
                    </div>
                    <div className="ss-content">
                        <ul className="lab-ul">
                            {socialList.map((val, i) => (
                                <li key={i}><a href={val.siteLink} className={val.className}><i className={val.iconName}></i></a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="course-enroll">
                    <Link href={enroll} className="lab-btn"><span>{btnText}</span></Link>
                </div>
            </div>
        </div>
    );
}
 
export default CourseSideDetail;