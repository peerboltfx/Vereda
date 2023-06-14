import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Alert, Card, Col, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import { CheckCircleFill, MarkdownFill, PencilSquare, QuestionCircle, QuestionCircleFill, Repeat, Trash } from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import { useState } from "react";

export default function Plantable(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {assignments, flash}=usePage().props;
    const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour12:true
       
       })
       const longEnUsFormatTime=new Intl.DateTimeFormat('en-GB',{
        hour12: true,
       })
       console.log(assignments)
     
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
                    <div className="overflow-hidden p-2 shadow-sm ">
                    {assignments.map((data, index)=>{
                        return(
                        <Col md="6" sm="12" lg="5"  key={index}>
                        <Card className="sm:rounded-lg bg-white">
                               <Card.Title className="p-2 capitalize"> {data.topic}</Card.Title>
                              <Card.Header className="flex" ><span><QuestionCircleFill className="text-color-dark-blue mt-1 mr-2"/></span> {data.assignment}</Card.Header> 
                            <Card.Footer><Link href={`/moderator/assignment-${data.id}`}><Button className="bg-primaries w-full">View Progress</Button></Link></Card.Footer>
                        </Card>
                    </Col>)
                    })}
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
        </>
    )
}