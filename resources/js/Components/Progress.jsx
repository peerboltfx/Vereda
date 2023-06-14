import "../../css/style.css";


export function Progress({courseHead, courseProgress , studyHead, studyProgress, assignmentHead, assginmentProgress}) {

    const entity = [
     {
        header: courseHead,
        progress: courseProgress,
        classing:"bg-primaries rounded-full ml-2 flex flex-column-center items-center"
    },
    {
        header:studyHead,
        progress:studyProgress,
        classing:'bg-color-baby-blue rounded-full ml-2 flex flex-column-center items-center'
    },
    {
        header:assignmentHead,
        progress:assginmentProgress,
        classing : 'bg-color-gold rounded-full ml-2 flex flex-column-center items-center'
    }
    ]
   
    return (
        <div className='bg-white progress-container flex flex-col sm:justify-center w-100 sm:rounded-lg'> 
                <div className='flex header-block'>
                    {
                        entity.map((data, index)=>{
                            return(
                              
                            <div key={index} className='flex p-4'>
                                <div 
                                                
                                className={data.classing}
                                style={{ width:"60px",
                                height:"60px"}}
                                >
                                    <h5 className='fs-5 fw-bold text-color-white ml-auto mt-auto mb-auto mr-auto'>{data.progress}%</h5>
                                 </div>
                                    <h6 className="text-color-dark-blue mt-2  ml-5 fw-bold w-50">{data.header}</h6>
                           </div>

                            )
                        })
                    }

     </div> 
         
     </div>
    )
}
