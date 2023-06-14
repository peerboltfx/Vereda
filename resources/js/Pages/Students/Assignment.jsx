import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Row, Table, Col} from 'react-bootstrap';
import "../../../css/style.css";
import { Book } from "react-bootstrap-icons";

export default function Users(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {assignment, programs}=usePage().props;

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
    const found = programs.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(values.search)))
    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Student</h2>
                <h3 className="fs-4 text-color-blue">My Assignment</h3>
            </>}

Search={<div className="Search-container"><input  onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} />
<div onBlur={()=> setShow(false)} tabIndex="0" style={{height:"400px", overflowY:"scroll"}} className={show?'Searched active p-2': 'Searched'}>
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
        <Head title="Student Report" />

        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div style={{
                            overflowY:'scroll'
                        }} className="p-6 border-b border-gray-200">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>                                   
                                    <th>question</th>
                                    <th>answer</th>
                                    <th>result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {assignment.length > 0 ? assignment.map((data,index)=>{
                                    return (<tr key={index}>
                                        <td>{data.question}</td>
                                        <td>{data.answer}</td>
                                        <td>{data.result}</td>
                                    </tr>)
                                  }): <tr><td  className="text-center text-color-gray fs-6 p-2 pt-4 fw-bold">No assgnment submitted</td></tr>}
                                </tbody>
                            </Table>
                          </div>
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
        </>
    )
}