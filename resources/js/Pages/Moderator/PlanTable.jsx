import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Alert, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import { CheckCircleFill, MarkdownFill, PencilSquare, Repeat, Trash } from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import { useState } from "react";
import Pagination from '@mui/material/Pagination';
import usePagination from "@/Components/pagination";
export default function Plantable(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {plans, flash}=usePage().props;
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
        
    const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour12:true
       
       })
     
     
       //get current Page

       const count = Math.ceil(plans.length / PER_PAGE);
  const _DATA = usePagination(plans, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Admin Page / Moderator</h2>
                <h3 className="fs-4 text-color-blue">Moderator Table</h3>
            </>}
             childs={<>
               
                </>}
        >
        <Head title="Full Stack Developement" />

        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                       {flash.message && <div className="p-3"><Alert className="mt-5 text-center p-3" variant="success">{flash.message}</Alert></div>}

                        <div  className="p-6 plan-table border-b border-gray-200">
                            <Table striped bordered hover >
                                <thead>
                                    <tr>                                   
                                    <th>#</th>
                                    <th>Topic</th>
                                    <th>Batch</th>
                                    <th>Date</th>
                                    <th>time</th>
                                    <td>session type</td>
                                    <th>program</th>
                                    <th>action</th>
        
                                    </tr>
                                </thead>
                                <tbody>
                                    { _DATA.currentData().map((data, index)=>{
                                        return(<tr key={index}>
                                            <td>{index}</td>
                                            <td>{data.topic.split(" ").splice(0,3).join(" ")+"..."}</td>
                                            <td>batch {data.batch}</td>
                                            <td>{longEnUsFormatter.format(new Date(`${data.date}`))}</td>
                                            <td></td>
                                            <td>{data.sessiontype}</td>
                                            <td>{data.program}</td>

                                            <td className="flex">
                                                {data.action == "pending" && (<Link href={`/moderator/create-course/${data.program_code}/en/${data.id}`}><PencilSquare/> </Link>) || data.action == "created" && (<CheckCircleFill style={{color:"green"}} />)}
                                            <Link className="ml-4" href={`/moderator/delete-course/${data.id}`}><Trash /></Link>
                                            <Link className="ml-4" href={`/moderator/reupload-course/${data.id}`}><Repeat /></Link>
                                             </td>
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