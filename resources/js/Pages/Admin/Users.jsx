import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Row, Table,Col } from 'react-bootstrap';
import "../../../css/style.css";
import { Inertia } from "@inertiajs/inertia";
import { Person } from "react-bootstrap-icons";
import Pagination from '@mui/material/Pagination';
import usePagination from "@/Components/pagination";

export default function Users(props){
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
  
    const {Using}=usePage().props;

//get current Page

const count = Math.ceil(Using.length / PER_PAGE);
const _DATA = usePagination(Using, PER_PAGE);

const handleChange = (e, p) => {
  setPage(p);
  _DATA.jump(p);
}
    const [values, setValues] = useState({
        "amount": "",
        "search":""
    });

    const HandleChange=(e)=>{
        const key = e.target.name;
        const value = e.target.value;
         setValues(values=>({
            ...values,
            [key]:value,
            }
        )
    );

    }

    const [show,setShow] = useState(false);
    const HandleShow=()=>{
        setShow(true);
    }
    const found = Using.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(values.search)))

    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Admin Page / Users</h2>
                <h3 className="fs-4 text-color-blue">Users Table</h3>
            </>}
             childs={<>
               
                </>}
                 Search={<div className="Search-container"><input  onClick={HandleShow} type="text" name="search" value={values.search} onChange={HandleChange} />
                 <div onBlur={()=> setShow(false)} tabIndex="0" style={{height:"400px", overflowY:"scroll"}} className={show?'Searched bg-white active p-2': 'Searched'}>
                    <h6 className='fw-bold text-color-dark-blue text-center'>Search Course</h6>
                 {found.map((data, index)=>{
                        return(
                         <div className='bg-white pt-2 mt-1 pb-2 pl-4 shadow-sm sm:rounded-lg'  key={index}>
                        <Row>
                            <Col mx="6" >
                            <Link href={`/edit-users/${data.id}`} className="text-color-dark-blue">
                              <div className="flex pb-3">
                                    <Col md="2"  className="pt-0 ">
                                    <Person
                                    style={{ fontSize:"30px",
                                              color: "#DC4731"
          
                                            }} className="pl-1" />
                                      </Col><Col md="10"  className='fs-5 fw-bold pl-0 ml-4 text-color-dark-blue'>{data.name}</Col> 
                            </div>
                            </Link>
                           </Col>
                       
                       
                       
                        </Row>
                      </div>
                        )
                      })}
                 </div></div>}
        >
        <Head title="Full Stack Developement" />

        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div style={{
                            overflowY:'scroll'
                        }} className="p-6 border-b border-gray-200">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>                                   
                                    <th>#</th>
                                    <th>name</th>
                                    <th>email</th>
                                    <th>phone</th>
                                    <th>role</th>
                                    <th>discount</th>
                                    <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_DATA.currentData().map((data, index)=>{
                                        return(<tr key={index}>
                                            <td>{index}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.role}</td>
                                            <td>
                                               {data.code} for {data.discount}
                                            </td>
                                            <td><Link href={`/users-profile/${data.id}`}>edit</Link></td>
                                        </tr>)
                                    })}
                                </tbody>
                            </Table>
                            <div className="flex items-center flex-col sm:justify-center">
                             <Pagination
                              count={count}
                              size="large"
                              page={page}
                              variant="outlined"
                              shape="circular"
                              onChange={handleChange}
                            />
                             </div>
                          </div>
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
        </>
    )
}