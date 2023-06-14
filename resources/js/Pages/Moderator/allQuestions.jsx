import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Alert, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import { CheckCircleFill, MarkdownFill, PencilSquare, Repeat, Trash, TrashFill } from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import { useState } from "react";

export default function Plantable(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {questions,origin, flash}=usePage().props;
    const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour12:true
       
       })
       const longEnUsFormatTime=new Intl.DateTimeFormat('en-GB',{
        hour12: true,
       })
     
    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Moderator / questions</h2>
                <h3 className="fs-4 text-color-blue">Questions Table</h3>
            </>}
             childs={<>
               
                </>}
        >
        <Head title={origin.topic} />

        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                       {flash.message && <div className="p-3"><Alert className="mt-5 text-center p-3" variant="success">{flash.message}</Alert></div>}

                        <div  className="p-6 plan-table border-b border-gray-200">
                            <Table striped bordered hover >
                                <thead>
                                    <tr>                                   
                                    <th>#</th>
                                    <th width="90%">Topic</th>
                                    <th>delete</th>     
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.map((data, index)=>{
                                        return(<tr key={index}>
                                            <td>{index}</td>
                                            <td>{data.question}</td>
                                            <td className="flex">
                                            <Link className="ml-4" href={route("deleteQuestion",data.id)} method="POST"><Trash /></Link>
                                             </td>
                                        </tr>)
                                    })}
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