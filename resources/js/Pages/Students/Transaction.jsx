import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Row, Table, Col, Alert, Spinner} from 'react-bootstrap';
import "../../../css/style.css";
import { Book, Map, Person } from "react-bootstrap-icons";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

export default function Users(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {processing}=useForm();
    const {assignment, programs, transactions}=usePage().props;

    const [values, setValues] = useState({
        "search":"",
    });
      const [show,setShow] = useState(false);
      const HandleShow=()=>{
          setShow(true);
      }
      const HandleChange=(e)=>{
         const key = e.target.name;
         const value = e.target.value;
         setValues(values=>({
          ...values,
          [key]:value,
         }))
      }
      const [showPop, setShowpop] = useState(false);
      const [errorPop, setErrorPop]= useState(false);
      let responses= "";
      const [ loading , setLoading]=useState(false);
    //we are going to set timer to turn off notification
      if(showPop == true || errorPop == true){
       
       
        setInterval(() => {
           
            setShowpop(false);
            
            setErrorPop(false);
           
        }, 1000 * 10);
        
        
      }

    const found = programs.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(values.search)))
    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Student</h2>
                <h3 className="fs-4 text-color-blue">Transactions</h3>
            </>}

Search={<div className="Search-container"><input  onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} />
<div onBlur={()=> setShow(false)} tabIndex="0" style={{height:"400px", overflowY:"scroll"}} className={show?'Searched bg-white active p-2': 'Searched'}>
   <h6 className='fw-bold text-color-dark-blue text-center'>Search Course</h6>
{found.map((data, index)=>{
       return(
        <div className='bg-white pt-2 mt-1 pb-2 pl-4 shadow-sm sm:rounded-lg'  key={index}>
       <Row>
           <Col mx="6" >
           <Link href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-dark-blue">
             <div className="flex pb-3">
                   <Col md="2"  className="pt-0 ">
                   <Book
                   style={{ fontSize:"30px",
                             color: "#DC4731"

                           }} className="pl-1" />
                     </Col><Col md="10"  className='fs-5 fw-bold pl-0 ml-4 text-color-dark-blue'>{data.program}</Col> 
           </div>
           </Link>
          </Col>
      
      
      
       </Row>
     </div>
       )
     })}
</div></div>}
        >
        <Head title="Transactions" />

        <div className=" p-3 ">

        {showPop? <Alert variant="success" className="mt-2">successfully deleted the content</Alert>:""}

                <Row>
                {transactions ? <>{
                    transactions.map((data,index)=>{
                        return(
                       
                                    <Col md="6" lg="4" sm="6"  key={index}  className="overflow-hidden p-4 m-1 bg-white shadow-sm sm:rounded-lg">
                                        <h4 className="mt-2">{data.program}</h4>
                                        <div className="mt-2"><b> order id</b> : {data.orderId}</div>
                                        <div className="mt-2"><b>receipt </b>: {data.receipt}</div>
                                        <div className="text-sm text-danger">(Use receipt as referrence for payment)</div>
                                        <div className="mt-2">INR <b>{data.amount}</b></div>
                                        <div className="mt-2">{new Date(`${data.created_at}`).toLocaleDateString()}</div>
                                       
                                       <div className="mt-2 pb-2 flex">
                                    {data.action == "pending" ?    <form className="fw-bold danger"
                                     method="POST"
                                    onSubmit={(e)=>{
                                        e.preventDefault();
                                        axios.post(`/checkout/cancel-order/${data.orderId}`)
                                        .then((res)=>{
                                            if(res){
                                                responses=res.data;
                                                setShowpop(true);
                                                setLoading(false);
                                                
                                            }
                                        }).catch((err)=> {
                                            if(err){
                                                setLoading(false);
                                                setErrorPop(true);
                                            }
                                        })
                                        }}><button className="fw-bold rounded-full p-2 bg-secondarys mr-2 " onClick={()=>{setLoading(true)}} processing={processing} type="submit">{loading? <span className="mr-5 ml-5"><Spinner animation="border" size="sm" className="ml-5 mr-5" role="status" /></span> : "Cancel Loading"}</button></form> : '' } 
                                       <Link className="" href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`}> <button style={{width: "100px"}} className={data.action == "pending" ? "bg-color-gold text-white p-2 rounded-full" : "bg-primaries text-white p-2 rounded-full"}>{data.action}</button></Link>
                                       </div>
                                       {errorPop? <Alert variant="danger" className="mt-2">Error trying to perform operation</Alert>:""}

                                    </Col>
                                    
                       
                        )
                    })}</>
                : "" }
                </Row>
         
        </div>
        </AuthenticatedLayout>
        </>
    )
}