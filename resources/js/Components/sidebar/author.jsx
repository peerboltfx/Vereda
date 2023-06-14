const degi = "Assistant Teacher"




const Author = ({teacherSrc, name,task , facebook, twitter, linkedin}) => {
    const socialList = [
      /**  {
            link: facebook,
            iconName: 'icofont-facebook',
            className: 'facebook',
        },
        {
            link: twitter,
            iconName: 'icofont-twitter',
            className: 'twitter',
        },*/ 
        {
            link: linkedin,
            iconName: 'icofont-linkedin',
            className: 'linkedin text-white bg-none',
        },
    ]
    return (
        <div className="authors">
            <div className="author-thumb">
                <img src={teacherSrc} style={{width:"100px",height:"100px"}} alt="speaktosameer" />
            </div>
            <div className="author-content">
                <h5>{name}</h5>
                <span>{task}</span>
                
                <ul className="lab-ul">
                    {socialList.map((val, i) => (
                        <li key={i}>
                            <a href={val.link} className="linkedin "><i className={val.iconName}></i></a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
 
export default Author;