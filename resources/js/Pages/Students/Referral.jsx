import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Row, Table, Col} from 'react-bootstrap';
import "../../../css/style.css";
import { Book, Map, Person } from "react-bootstrap-icons";
import { Inertia } from "@inertiajs/inertia";

export default function Users(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {assignment, programs, referral,referred, allReferrals}=usePage().props;

    const [values, setValues] = useState({
        "search":"",
        "copied": `http://127.0.0.1:8000/get/${referral}` || "",
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
    const found = programs.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(values.search)))
    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Student</h2>
                <h3 className="fs-4 text-color-blue">Referral</h3>
            </>}

Search={<div className="Search-container"><input  onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} />
<div onBlur={()=> setShow(false)} tabIndex="0" style={{height:"400px", overflowY:"scroll"}} className={show?'Searched  active p-2': 'Searched'}>
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
        <Head title="Referral Program" />

        <div className=" p-3">
            <Row> 
                <Col lg="8">
                <div className=" mx-auto">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h4 className="text-color-dark-blue fw-bold flex"><span><Person className="text-color-blue mr-5"/> </span> Referred by </h4>
                            <h5 className="text-center mt-5  ">{referred && <>{referred}</>}</h5>
                          </div>
                        </div>
                    </div>
                    <div className="max-w-2xl  mt-4 ">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-full">
                        <div className="p-2  border-b border-gray-200 w-100 flex">
                            {!referral && <><button className="p-2 ml-2 bg-primary sm:rounded-full text-color-white mr-5 shadow" onClick={()=>{ Inertia.post("gerateReferral")}}>generate code </button>
</> }
                            <input readOnly  value={values.copied} style={{width:"75%"}} className=" text-color-gray text-center"/>
                           {referral &&  <><button onClick={()=>{  navigator.clipboard.writeText(values.copied); alert("copied")}} className="p-2 bg-primary sm:rounded-full text-color-white mr-5 pl-5 pr-5  text-center shadow flex"> <Map className="mt-1  mr-4" /> click to copy </button></>}
                          </div>
                        </div>
                    </div>
                </Col>
                <Col lg="4">
                <div className="">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="fs-4 text-color-dark-blue fw-bold flex"><span><Person className="text-color-blue mr-5"/> </span> Referrals </h2>
                          <div>
                              {allReferrals.map((data, index) =>{
                                return(<li key={index}> 
                                    {data.name}
                                </li>)
                              })}  
                          </div>
                          </div>
                        </div>
                    </div>
                    </Col>
            </Row>
        </div>
        </AuthenticatedLayout>
        </>
    )
}