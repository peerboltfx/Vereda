import React,{useState, useEffect} from "react";
import "../../css/style.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,usePage,Link, useForm } from '@inertiajs/inertia-react';
import { Button, Form, Alert, Modal } from "react-bootstrap";
import DOMPurify from "dompurify";
import  PrimaryButton from "@/Components/PrimaryButton";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {   pdfjs } from "react-pdf";
import { Inertia } from "@inertiajs/inertia";
import Coming from "@/assets/Team/comomg-soon.webp"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import  Conference  from "@/assets/Images/icon/4814043.jpg";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export default function (props){

    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
const {course,sessionLive, type, origin, programs, flash, links,compact, verified, expires, subscription, order}=usePage().props;
const [numPages, setNumPage] = useState(null);
const {data, setData} = useForm({
    "answer": "",
    "question":origin.assignment || ""
});
const [show1, setShow1] = useState(false);
const handleShow1 = () => setShow1(true);
const handleClose1 = () => setShow1(false);
const [view, setView] = useState(expires == "true" ? true : false);

const HandleChange=(e)=>{
    const key = e.target.name;
    const value = e.target.value;
    setData(data=>({
        ...data,
        [key]:value,
    }
    )
 )
}

const options = {
    cMapUrl : "cmpas/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonst/"
};

 
const HandleAttendance=(e)=>{
    Inertia.post("/student/mark-attendance",{
        courseId:origin.id,
        courseName:origin.topic,
        batch:origin.batch,
    }).then((res)=> {
        alert(res);
    }).catch(err => alert("failed to load resource"))
}
   const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
    year: 'numeric',
    month: 'long',
    day:'numeric',
   })
  
   const createMarkup = (html) =>{
    return {
        __html: DOMPurify.sanitize(html)
    }
  }

  
  const HandleSubmit=(e)=>{
    e.preventDefault();
    Inertia.post("/assignment/submit",{
        topic_id:origin.id,
        questions:origin.assignment,
        answer:data.answer,
    });
  }

 function onDocumentLoadSuccess({
numPages: nextNumPages
  }){
    setNumPage(nextNumPages)
  }

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

  async function handleSubscribe(){
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
  
    if (order == null){
    
      Inertia.post("/checkorder",
      {
        data_amount: subscription.amount,
        data_recursive:1,
        data_method: "monthly subscription",
        data_describe:subscription.program,
        data_price : subscription.amount,
        data_discount: values.discount,
    });
    }
   
    

    const options = {
        key: order.razorpayId, // Enter the Key ID generated from the Dashboard
        amount: subscription.amount,
        currency: 'INR',
        name: subscription.program,
       image:'https://vereda.co.in/Images/logo.png',
        description: order.receipt,
        order_id: order.orderId,
        prefill: {
            name: `${props.auth.user.name}`,
            email: `${props.auth.user.email}`,
            contact: "",
        },
        theme: {
            color: "white",
        },
        handler: function(response){
          var values ={
              razorpay_signature: response.razorpay_signature,
              razorpay_order_id: response.razorpay_order_id,
              transactionid:response.razorpay_payment_id,
              transactionamount: subscription.amount,
          }
          Inertia.post("/razorpaypaymentUpdate",
      {
          orderId:order.orderId,
          amount: subscription.amount,
          razorpay_order_id:values.razorpay_order_id,
          razorpay_payment_id:values.transactionid,
          describe:subscription.program,
          recursive:subscription.recure,
          price : subscription.amount,
          data_method:subscription.method,
          batchid : subscription.batch,
      }
    )
  }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

 } 

    return(
        <AuthenticatedLayout
                auth={props.auth}
                plans={props.plans}
                errors={props.errors}
                Programs={programs.map((data,index)=>{
                    return (<li key={index}><Link href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-white">{data.program}</Link></li>)
                })}
            >

        <Head title={course} />
       
           {links}
        <div className="py-12">
                <div className="sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {origin.action == "created" ?  
                      <div className="p-6 bg-white border-b border-gray-200">            
                               {
                                origin.sessiontype =="video" &&
                                <>
                                {origin.liveSession !=null ? 
                                <div className="flex items-center flex-col sm:justify-center">
                                    <img src={Conference} width="40%"/>

                                    {sessionLive == null && <>
                                        <h6 className="mb-3 ">Live class started at <span  className="fw-bold text-color-dark-blue"> {new Date(`${origin.updated_at}`).toLocaleTimeString()}</span></h6>
                                    <div onClick={HandleAttendance}><a className="text-center bg-primaries pt-2 pb-2 pl-4 pr-4 text-color-white rounded-full"  target="_blank" href={`https://${origin.liveSession}`}> Join class on google meet </a></div>
                                    </> }
                                  {sessionLive != null && <>
                        
                                      {
                                        sessionLive.attendace== "attended" &&
                                        <>
                                        <h6 className="mb-3 ">Live class started at <span  className="fw-bold text-color-dark-blue"> {new Date(`${origin.updated_at}`).toLocaleTimeString()}</span></h6>
                                        <h6 className="fw-bold">Class has ended and your trainer has confirmed your attendance.</h6>
                                    </>
                                    }

                                    {
                                        sessionLive.attendace =="pending" && <h6 className="mb-3 text-center">You joined the class @ <span  className="fw-bold text-color-dark-blue"> {new Date(`${sessionLive.joined}`).toLocaleTimeString()}</span>. <br/> Once class ends, your trainer will confirm you attended the class.</h6>

                                    }
                                  </>}
                                    
                                </div> :    
                       <video type="video/mp4" allowFullScreen height="100%" width="100%" controls autoPlay>
                        <source src={compact} type="video/mp4" />
                       </video> }
                       
                       </>
                       }                        
                                {origin.sessiontype == "book" && <> 
                                <div className="w-100 flex flex-col p-2 items-center show_pdf">   

                                <h3 className="text-color-dark-blue fw-bold mb-4">{origin.topic}</h3>
                                   
                                    <Document
                                      
                                    file={compact}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    options={options}
                                    >
                                       {Array.from(new Array(numPages), (el, index) =>(
                                        <Page
                                       
                                        size="A4"
                                         key={`page_${index + 1}`}
                                        pageNumber={index + 1} wrap={true} />
                                       ))}
                                         </Document>
                                    
                               {/* <object 
                                        data={compact}
                                        type="application/pdf"
                                        
                                        width="100%"
                                        height="1000"
                                        >
                                        <iframe style={{
                                            width:"100%",
                                        }}
                                        height="1000"
                                        src={compact}
                                            />
                                </object> */}
                                {
                                    origin.assignment !=null && 
                                    <>
                                    <hr className="mt-5 mb-5"/>
                                    <div className="mt-4">
                                        <h4>Solve Question</h4>
                                        <div className="preview mb-3" dangerouslySetInnerHTML={createMarkup(origin.assignment && (origin.assignment))}></div>
                                        <form onSubmit={HandleSubmit} method="POST">
                                        <Form.Control
                                                type="file"
                                                name="answer"
                                                onChange={(e)=> setData("answer",e.target.files[0])}
                                                accept="application/pdf"
                                                required
                                               />
                                       
                                        <div className="p-3 col-6">
                                        <PrimaryButton>submit answer</PrimaryButton>
                                        </div>
                                                                                
                                        </form>
                                        {flash.message &&<div className="p-3"><Alert variant="success">{flash.message}
                                        <br/>
                                        <p> Click <Link href="/student/my-assignments">here</Link> to check your current and previous assignment status.</p>
                                        </Alert></div>}

                                        </div> </> 
                                }

</div>  
                                </>}
                       
                               {origin.sessiontype =="test" && origin.action== "created" && ( <div className="bg-color-baby-blue" style={{width:"100%"}}>
                                        <div  
                                        style={{
                                            width:"10%",
                                            marginLeft:"auto",
                                            marginRight:"auto",
                                            paddingTop:"10%",
                                            paddingBottom:"10%"
                                          }} >  

                                         <Button variant="primary" onClick={handleShow1}>start quiz</Button>
                                          <Modal
show={show1}
onHide={handleClose1}
backdrop="static"
keyboard={false}
size="md"
centered
>
<Modal.Header  closeButton>
<b>What you need to know about this quiz</b>
</Modal.Header>
    <Modal.Body>
            
            <ul>
                <li>Each question of this quiz is automated to skip to the next question if not answered with one minute.</li>
                <li>We do not expect you to cheat, therefore the system will automatically save your result if you close the quiz page, even if you have answered any question.</li>
                <li>We expect your score to be average / 100 of or higher than the average inorder to pass the quiz</li>
                <li>Fortunately if you fail the quiz, we will reschedule the quiz in two weeks, for you to study thoroughly.</li>
            </ul>
 </Modal.Body>
 <Modal.Footer>
    <a  target="_blank" href={`/en/quiz/student/${origin.id}/${origin.topic.split(" ").join("-")}`}><Button variant="dark" onClick={handleClose1}>Continue</Button></a> <Button onClick={handleClose1} variant="danger">cancel</Button>
 </Modal.Footer>
 </Modal>
                                          </div>
                                          {flash.error && (<Alert variant="primary">{flash.error}</Alert>)}
                               </div>)}
                            </div>: 
                            
                            <div className="p-6 bg-white border-b border-gray-200"> 
                            
                            <div className="coming"><img src={Coming} /></div>
                            <h6 className="fw-bold text-color-gray text-center">  Coming up on {longEnUsFormatter.format(new Date(`${origin.date}`))}</h6>

                            </div>
                            }
                        
                    </div>
                    <Modal
                  show={view}
          
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  centered
                  >
                <Modal.Header>
                  <Modal.Title><h5>Payment Alert </h5></Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                            <div className='flex items-center flex-col w-100'>
                              <p>Your Subscription expired on <span className='fw-bold underline'>{subscription.expires_at}</span></p>
                              <p>to continue your studies click on the button to proceed to payment.</p>
                              
                              <button className="rounded-full bg-primaries text-white pt-2 pb-2 pr-4 pl-4" onClick={handleSubscribe}> {order? "Pay now" : "Subscribe"}</button>
                            </div>
              </Modal.Body>
              </Modal>
                    </div>
                </div>
        </AuthenticatedLayout>
    )
}