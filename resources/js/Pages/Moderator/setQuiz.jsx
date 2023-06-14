import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Form, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Alert } from "react-bootstrap";
import { Button } from "bootstrap";
import { CheckCircle } from "react-bootstrap-icons";

export default function setQuiz(props){

    const {program, code, all_batch, flash}=usePage().props;
    const {data, setData, post, progress} = useForm({
        'question':"",
        "option1":"",
        "option2":"",
        "option3":"",
        "option4":"",
        "answer":"",


    });

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
   


    const HandleSubmit=(e)=>{
        e.preventDefault();

        const method={
            _method: "post"
        }
        Inertia.post(`/moderator/set-questions/${program.topic.split(" ").join("-")}/${program.id}`,
         
         {
            "data": data,
            "batchInfo":{
                "id":program.batch,
                "trainer":all_batch[0].trainerid,
                "course":program.id
            },
            method
         }
         )
    }
return(
        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<>
            <h2 className="font-semibold ts-1 leading-tight">Moderator Page</h2>
            <h3 className="fs-4 text-color-blue"> Update {program.topic} for {program.program}</h3>
        </>}
    >
    <Head title={"Create Course"} />

    <div className="py-12">
                <div className="max-w-12xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                        <form method="POST" onSubmit={HandleSubmit}  className="mt-5  max-w-3xl mx-auto sm:px-6 lg:px-8">
                                     <h1>Quiz Page</h1>          
                                                   <Row>
                                                    <Col>
                                               <div className="mt-3">
                                                <Form.Label htmlFor="file">Question</Form.Label>
                                                <Form.Control
                                                as="textarea"
                                                name="question"
                                                value={data.question}
                                                onChange={HandleChange}
                                                
                                                required
                                               />
                                                </div>
                                                <div className="mt-3">
                                                <Form.Label htmlFor="file">Option A</Form.Label>
                                                <Form.Control
                                                type="text"
                                                name="option1"
                                                value={data.option1}
                                                onChange={HandleChange}
                                                
                                                required
                                               />
                                                </div>
                                                <div className="mt-3">
                                                <Form.Label htmlFor="file">Option B</Form.Label>
                                                <Form.Control
                                                type="text"
                                                name="option2"
                                                value={data.option2}
                                                onChange={HandleChange}
                                                required
                                               />
                                                </div>
                                                <div className="mt-3">
                                                <Form.Label htmlFor="file">Option C</Form.Label>
                                                <Form.Control
                                                type="text"
                                                name="option3"
                                                value={data.option3}
                                                onChange={HandleChange}
                                                
                                                required
                                               />
                                                </div>
                                                <div className="mt-3">
                                                <Form.Label htmlFor="file">Option D</Form.Label>
                                                <Form.Control
                                                type="text"
                                                name="option4"
                                                value={data.option4}
                                                onChange={HandleChange}
                                                
                                                required
                                               />
                                                </div>
                                                <div className="mt-4">
                                                <Form.Label htmlFor="file">The Answer</Form.Label>
                                                <Form.Select
                                                as="textarea"
                                                name="answer"
                                                value={data.answer}
                                                onChange={HandleChange}
                                                variant="success"
                                                required
                                               >
                                                <option value="">select </option>
                                                <option value="option1">option A </option>
                                                <option value="option2">option B </option>
                                                <option value="option3">option C </option>
                                                <option value="option4">option D </option>

                                               </Form.Select>
                                                </div>  
                                            <PrimaryButton className="mt-4">Submit</PrimaryButton> 
                                          </Col>
                                           </Row>
                                        </form>
                                       
                                        {flash.message && (<Alert  variant="success">{flash.message}</Alert>)}                            </div>
                                    {program.action == "pending" ?
                                    <div className="p-2">
                                    <Link className="flex" style={{width:"100%"}} href={`/moderator/ready-quesiton/${program.id}`}>click if ready <span className="mt-1 ml-2"><CheckCircle /></span></Link>
                                </div>
                                :
                                <span className="mt-1 pl-2 p-2 ml-2"><CheckCircle style={{ color: "green"}}/></span>
                                }
                                   
                        </div>
                    </div>
                </div>
</AuthenticatedLayout>
    )

}