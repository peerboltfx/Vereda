
import Rating from "../sidebar/rating";
import pg1 from "@/assets/Images/pageheader/02.jpg";

const title = "Full Stack Web Development";
const author = "Himanshu";
const reviewCount = "03 reviews";
const videoLink = "https://www.youtube.com/embed/MU3qrgR2Kkc";


const categoryList = [
    {
        link: '#',
        text: 'Web Development',
        className: 'course-cate',
    },
    {
        link: '#',
        text: '30% Off',
        className: 'course-offer',
    },
]


const PageHeaderTwo = ({programImage, title, subject, percent, className, type}) => {
    return (
        <div className="pageheader-section style-2">
            <div className="container">
                <div className="row justify-content-center justify-content-lg-between align-items-center flex-row-reverse">
                    <div className="col-lg-7 col-12">
                        <div className="pageheader-thumb">
                            <img src={programImage} alt="vereda" className="w-100" />

                        </div>
                    </div>
                    <div className="col-lg-5 col-12">
                        <div className="pageheader-content">
                            <div className="course-category">
                                
                                    <b className={className}>{type}</b>
                                    <b className={className}>{percent}</b>
                                
                            </div>
                            <h2 className="phs-title">{title}</h2>
                            <p className="phs-desc">{subject}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PageHeaderTwo;