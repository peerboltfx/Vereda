
import Rating from "../sidebar/rating";

const title = "Flutter Development";
const desc = "Become a flutter developer by learning from the best, and get ready for a job as a Flutter Developer";
const author = "Himanshu ";
const reviewCount = "03 reviews";
const videoLink = "https://www.youtube.com/embed/MU3qrgR2Kkc";


const categoryList = [
    {
        link: '#',
        text: 'Mobile Development',
        className: 'course-cate',
    },
    {
        link: '#',
        text: '30% Off',
        className: 'course-offer',
    },
]


const PageHeaderThree = () => {
    return (
        <div className="pageheader-section style-2">
            <div className="container">
                <div className="row justify-content-center justify-content-lg-between align-items-center flex-row-reverse">
                    <div className="col-lg-7 col-12">
                        <div className="pageheader-thumb">
                            <img src="assets/images/pageheader/02.jpg" alt="vereda" className="w-100" />
                            <a href={videoLink} className="video-button popup" target="_blank"><i className="icofont-ui-play"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-5 col-12">
                        <div className="pageheader-content">
                            <div className="course-category">
                                {categoryList.map((val, i) => (
                                    <a href={val.link} className={val.className} key={i}>{val.text}</a>
                                ))}
                            </div>
                            <h2 className="phs-title">{title}</h2>
                            <p className="phs-desc">{desc}</p>
                            <div className="phs-thumb">
                                <img src="assets/images/pageheader/03.jpg" alt="vereda" />
                                <span>{author}</span>
                                <div className="course-reiew">
                                    <Rating />
                                    <span className="ratting-count">{reviewCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PageHeaderThree;