import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Form, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js';
import { convertToHTML } from "draft-convert";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { CheckCircle } from "react-bootstrap-icons";

export default function CreateCourse(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {program, code, all_batch, flash}=usePage().props;
   
   const {data, setData, post, progress} = useForm({
        'price':"",
        "filing":"",
        "batch":"",
        "Link":"",
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
   
    const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());

    const [convertedContent, setConvertedContent]=useState(null);
    const HandleEditorChange= (state)=>{
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () =>{
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }


    const HandleSubmit=(e)=>{
        e.preventDefault();
        const method={
            _method: "put"
        }
        Inertia.post(`/moderator/edit-create-program/${program.topic.split(" ").join("-")}/${program.id}`,
        {"first": data,
        "type":program.sessiontype,
         "second" : convertedContent,
         method})
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
                        <form method="POST" onSubmit={HandleSubmit}  className="mt-5">
                                     <h1>Create Course</h1>          
                                                   <Row>
                                                    <Col>
                                               <div className="mt-3">
                                                <Form.Label htmlFor="file">Upload {program.sessiontype=="video" && "VIdeo" ||
                                                                     program.sessiontype=="book" && "Studies pdf file" ||
                                                                     program.sessiontype=="test" && "quiz"
                                                                     }</Form.Label>
                                                <Form.Control
                                                type="file"
                                                name="filing"
                                                value={data.file}
                                                onChange={(e)=> setData("filing",e.target.files[0])}
                                                accept={program.sessiontype =="video" && "video/*"||
                                                program.sessiontype=="book" && "application/pdf"}
                                            
                                               />
                                                </div>
                                                <div className="mt-3">
                                                <Form.Label htmlFor="price">For Batch</Form.Label>
                                                <Form.Select 
                                                value={data.batch}
                                                onChange={HandleChange}
                                                name="batch"
                                                required
                                                >
                                                  <option>select</option>
                                                  <option value={program.batch}>Batch {program.batch}</option>
                                                </Form.Select>
                                               </div>
                                               {program.sessiontype=="video" && <div className="mt-3">
                                                <Form.Label>Google meet Link</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="Link"
                                                    placeholder="meet.google.com/example"
                                                    onChange={HandleChange}
                                                    value={data.Link}
                                                    required
                                                />
                                                </div>}
                                               </Col>
                                               <Col md="12" lg="6">
                                               <div>
                                 
                                               <Form.Label>
                                                    Describe Content.
                                                    </Form.Label>
                                                    <Editor 
                                                        
                                                        editorState={editorState}
                                                        onEditorStateChange={HandleEditorChange}
                                                        toolbarClassName="toolbar-class"
                                                        wrapperClassName="wrapper-class"
                                                        editorClassName="editor-class"
                                                       
                                                        name="description"
                                                        />
                                               </div>
                                               </Col>
                                               <Col lg="6" md="6">
                                            
                                            <PrimaryButton className="mt-4">Submit</PrimaryButton></Col> 
                             
                                            </Row>
                                       </form>
                                     {flash.success && <p>{flash.success}</p>}
                            </div>
                            {program.action == "pending" ?
                                    <div className="p-2">
                                    <Link className="flex" style={{width:"100%"}} href={`/moderator/ready-quesiton/${program.id}`}>click if ready <span className="mt-1 ml-2"><CheckCircle /></span></Link>
                                </div>
                                :
                                <div className="p-2">
                                <span className=" pl-2 ml-2"><CheckCircle style={{ color: "green"}}/></span>
                                </div>
                                }
                        </div>
                    </div>
                </div>
</AuthenticatedLayout>
    )

}