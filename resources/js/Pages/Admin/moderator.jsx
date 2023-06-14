import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Row, Table,Col } from 'react-bootstrap';
import "../../../css/style.css";
import { Book } from "react-bootstrap-icons";
import Pagination from '@mui/material/Pagination';
import usePagination from "@/Components/pagination";


export default function Moderators(props){
    const {moderators, programs}=usePage().props;
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
  
    const [searchvalues, setValues] = useState({
        "search":"",
    });
      const [show,setShow] = useState(false);
      const HandleShow=()=>{
          setShow(true);
      }
      const HandleChange=(e)=>{
        const key = e.target.name;
        const value = e.target.value;
        setValue(values=>({
            ...values,
            [key]:value,
        }
        )
     )
    }

    const count = Math.ceil(moderators.length / PER_PAGE);
    const _DATA = usePagination(moderators, PER_PAGE);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };

      const found = programs.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(searchvalues.search)))

    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Admin Page / Moderator</h2>
                <h3 className="fs-4 text-color-blue">Moderator Table</h3>
            </>}
              Search={<div className="Search-container  sm:rounded-lg"><input onBlur={()=> setShow(false)} onClick={HandleShow} type="text" name="search" value={searchvalues.search} onChange={HandleChange} />
              <div tabIndex="0" className={show?'Searched  bg-white active': 'Searched'}>
                 
                              {found.map((data, index)=>{
                                  return( <Row key={index}>
                                    <Col mx="6" >
                                    <Link href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-dark-blue">
                                      <div className="flex mt-3 pb-3">
                                            <Col md="1"  className="pt-0 ml-2 ">
                                            <Book
                                            style={{ fontSize:"30px",
                                                      color: "#DC4731"
                  
                                                    }} className="pl-1" />
                                              </Col><Col md="6"  className='fs-5 fw-bold pl-0 ml-4 text-color-dark-blue'>{data.program}</Col> 
                                    </div>
                                    </Link>
                                   </Col>
                               
                               
                               
                                </Row>)
                              })}
              </div></div>}
        >
        <Head title="Moderator Table" />

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
                                    <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { _DATA.currentData().map((data, index)=>{
                                        return(<tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.role}</td>
                                            <td><Link href={`/edit-moderator/${data.id}`}>edit</Link></td>
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