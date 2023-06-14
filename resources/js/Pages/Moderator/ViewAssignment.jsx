import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Alert, Card, Col, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import { CheckCircleFill, Markdown, MarkdownFill, PencilSquare, QuestionCircle, QuestionCircleFill, Repeat, Trash } from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import { useState } from "react";
import {Inertia} from "@inertiajs/inertia";
import Pagination from "react-bootstrap/Pagination";

export default function Plantable(props){
    let active = 1;

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
       const [values, setValues]=useState({
        "score":"",
        "identity":"",
       })
       
       const HandleChange=(e)=>{
        const key=e.target.name;
        const value=e.target.value;
        setValues(values=>({
            ...values,
            [key]:value,
        }))
       }
       const HandleSubmit=(e)=>{
        e.preventDefault();
        Inertia.post("/Moderator/assignment-update",values)
       }

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
                           
                        <Col md="6"  key={index} sm="12" lg="12">
                        <Card className="sm:rounded-lg bg-white">
                               <Card.Title className="p-2 capitalize"> {data.topic}</Card.Title>
                              <Card.Header className="flex" ><span><QuestionCircle className="text-color-dark-blue mt-1 mr-2"/></span> {data.question}</Card.Header> 
                              <Card.Body className="flex" >
                                <span>
                                    <CheckCircleFill className="text-color-dark-blue mt-1 mr-2 fw-bold"/>
                                    </span>
                                    <iframe
                               style={{
                                width:"100%",
                               }}
                               height="600"
                              target="_blank" src={`../storage/pdf/${data.answer}`}/></Card.Body> 
                            <Card.Footer><form onSubmit={(e)=>{
                                e.preventDefault();
                                Inertia.post(`/Moderator/assignment-update-${data.id}`,values)}} className="flex"><input type="number" placeholder="score / 10" name="score" onChange={HandleChange}  className="w-full m-2"/><input type="submit" value="submit" name="identity" className="bg-primaries w-full text-white m-2" placeholder="submit"/></form></Card.Footer>
                            {flash.message && <Alert variant="success">{flash.message}</Alert>}
                        </Card>
                    </Col>
                   )
                    })}
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
        </>
    )
}