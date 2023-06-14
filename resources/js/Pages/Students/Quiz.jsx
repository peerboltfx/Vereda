import React, {useState} from "react";
import { usePage } from '@inertiajs/inertia-react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Inertia } from "@inertiajs/inertia";
import PrimaryButton from "@/Components/PrimaryButton";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Alert } from "react-bootstrap";


export default function CreateApplication(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const { questions,flash }=usePage().props;
   const [ score, setScore ] = useState(0);
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [ countdown, setCountDown] =useState(60);
   const [startQuiz, setStartQuiz] = useState(false);
   const [failed, setFailed]=useState([]);
   const result = 100/questions.length * score;
   


   const HandleNext=()=>{
    if( currentQuestion +1 < questions.length ){
        setCurrentQuestion(currentQuestion + 1);
       
    }
    else{
        setStartQuiz(true);
       
        
    }
   }
   const HandleClose=(e)=>{
        e.preventDefault();
    Inertia.post("/quiz/save",{"data":result,
                            "identity":questions[0].course});
    if(flash.message){
        window.close();
    }
   }
   window.history.back=()=>{
    Inertia.post("/quiz/save",{"data":result,"identity":questions[0].course});
   }
  
   window.onbeforeunload=(event)=>{
    event.preventDefault;
    Inertia.post("/quiz/save",{"data":result,"identity":questions[0].course});
   }


   const x = setTimeout(()=>{
    setCountDown(countdown -1);
    if(countdown-1 < 1){
        HandleNext();
        setCountDown(60);
       }
   }, 1000);
   if(currentQuestion ==questions.length-1 && countdown-1 < 1)  {
    clearTimeout(x);
   }
    return(
        <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {
                        startQuiz? <div>
                            
                           <div className="text-center ">{100/questions.length * score < 50 ? <><h5 className="mb-5">You didnt pass this Quiz, You failed the following</h5>
                           <b> {failed.map((data)=>{
                          return <> 
                          <h4>{data.question}</h4>
                          <ul>
                            <li>{data.answer} (wrong Answer)</li>
                            </ul> </> 
                           })}</b>
                           <form  onSubmit={HandleClose} method="POST"><PrimaryButton className="ts-6">Next</PrimaryButton></form>
                           {flash.message && (<Alert variant="success">{flash.message}</Alert>)} </>:
                            <div className="p-3">
                                <h3 className="text-center  pt-3">Quiz Passed</h3> 
                                <h2 
                                className="text-center item-center w-100 pt-2">
                                    <CheckCircleFill 
                                    className="text-center" 
                                    style={{
                                        color:"green",
                                        marginLeft:"auto",
                                        marginRight:"auto"}} />
                                        </h2>
                                        <h3 className="fs-5 mt-4 mb-3">Score <b>{100/questions.length * score}</b></h3>
                           <div style={{width:"50%",marginLeft:"auto",marginRight:"auto"}}><form method="POST" onSubmit={HandleClose} ><PrimaryButton className="ts-6">Next</PrimaryButton></form>
                           {flash.message && (<Alert variant="success">{flash.message}</Alert>)}
                           </div>
                          
                            </div>}</div>

                            
                        </div>:
                        <div className="p-6 bg-white border-b border-gray-200">         
                                 <h3 className="mb-4 pb-5 text-center">
                                 {
                                    questions[currentQuestion].question
                                 }
                                 </h3>
                                 <ul  style={{display:"block"}}>
                                    <li style={{borderRadius:20,
                                                }} 
                                                className="mb-3 bg-primaries text-color-white p-4 text-center"
                                                onClick={ HandleNext}>
                                                <button style={{width:"100%",height:"100%"}} 
                                                onClick={()=>questions[currentQuestion].answer == "option1"? (setScore(score + 1) ):
                                                (setFailed(current=>[...current,{answer:`${questions[currentQuestion].option1}`,question:questions[currentQuestion].question}]))}>{questions[currentQuestion].option1}</button> </li>
                                    
                                    <li style={{borderRadius:20,
                                                }} className="mb-3 bg-primaries text-color-white p-4 text-center" onClick={ HandleNext}>
                                                    <button style={{width:"100%",height:"100%"}} 
                                                    onClick={()=>questions[currentQuestion].answer == "option2"?  (setScore(score + 1) ): 
                                                    (setFailed(current=>[...current,{answer:`${questions[currentQuestion].option2}`,question:questions[currentQuestion].question}]))}>{questions[currentQuestion].option2} </button></li>
                                   
                                   <li style={{borderRadius:20,
                                                }} 
                                                className="mb-3  bg-primaries text-color-white p-4 text-center" 
                                                onClick={ HandleNext}><button style={{width:"100%",height:"100%"}} 
                                                onClick={()=>questions[currentQuestion].answer == "option3"?  
                                                (setScore(score + 1) ): 
                                                (setFailed(current=>[...current,{answer:`${questions[currentQuestion].option3}`,question:questions[currentQuestion].question}]))}>{questions[currentQuestion].option3} </button></li>
                                    <li style={{borderRadius:20,
                                                }} 
                                                className="mb-3  bg-primaries text-color-white p-4 text-center" 
                                                onClick={HandleNext}><button style={{width:"100%",height:"100%"}} 
                                                onClick={()=>questions[currentQuestion].answer == "option4"?  (setScore(score + 1) ): 
                                                (setFailed(current=>[...current,{answer:`${questions[currentQuestion].option4}`, question:questions[currentQuestion].question}]))}>{questions[currentQuestion].option4}</button></li>
                                  <button className="mt-3" onClick={HandleNext}><b>Question : {currentQuestion + 1}</b></button>
                                
                                <div className=" bg-primaries mt-2" style={{width:`${countdown*10}px`,height:10,transition:"1s"}}></div>
                                 </ul>
                                
                        </div> }

                        
                    </div>  
                </div>
            </div>

    )
}