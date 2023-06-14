import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Form, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js';
import { convertToHTML } from "draft-convert";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Book } from "react-bootstrap-icons"; 

export default function editProgram(props){
    const {program,programs}=usePage().props;
   
   const [values, setValue] = useState({
        'price':program.price || "",
        "program":program.program||"",
        "period":program.period||"",
        "inrprice":program.inrprice ||"",
        "discount":program.discount || ""
    });

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
    const [searchvalues, setValues] = useState({
        "search":"",
    });
      const [show,setShow] = useState(false);
      const HandleShow=()=>{
          setShow(true);
      }
   
    const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());

    const [convertedContent, setConvertedContent]=useState(program.descriptiom || null);
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

        Inertia.post(`/admin/edit-post-program/${program.random}`,{"first": values, "second" : convertedContent})
    }
    const found = programs.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(searchvalues.search)))

return(
        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<>
            <h2 className="font-semibold ts-1 leading-tight">Admin Page</h2>
            <h3 className="fs-4 text-color-blue"> Edit Moderator Role</h3>
        </>}
          Search={<div className="Search-container"><input onBlur={()=> setShow(false)} onClick={HandleShow} type="text" name="search" value={searchvalues.search} onChange={HandleChange} />
          <div tabIndex="0" className={show?'Searched active': 'Searched'}>
             
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
    <Head title={"Edit - "+program.program} />

    <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                        <form method="POST" onSubmit={HandleSubmit} className="mt-5">
                                     <h1>Edit{" "+ program.program}</h1>          
                                                   
                                               <div className="mt-3">
                                                <Form.Label>Program/Service Name</Form.Label>
                                                <Form.Control
                                                type="text"
                                                value={values.program}
                                                onChange={HandleChange}
                                                name="program"
                                                required
                                               />
                                                </div>
                                                <div className="mt-3">
                                                <Form.Label htmlFor="price">Price in Indian Rupee</Form.Label>
                                                <Form.Control 
                                                type="number"
                                                value={values.price}
                                                onChange={HandleChange}
                                                name="price"
                                                required
                                                />
                                               </div>
                                              
                                               <div className="mt-3">
                                                <Form.Label htmlFor="period">Period </Form.Label>
                                                <Form.Control 
                                                type="number"
                                                value={values.period}
                                                onChange={HandleChange}
                                                name="period"
                                                required/>
                                               </div>
                                               <div className="mt-3">
                                                <Form.Label htmlFor="price">Discount</Form.Label>
                                                <Form.Control 
                                                type="number"
                                                value={values.discount}
                                                onChange={HandleChange}
                                                name="discount"
                                               
                                                />
                                               </div>
                                               <div>
                                               <Form.Label>
                                                    Description Content.
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
                                            <Col>
                                            <PrimaryButton className="mt-4">Submit</PrimaryButton></Col> 
                                           

                                        </form>
                                     
                            </div>
                        </div>
                    </div>
                </div>
</AuthenticatedLayout>
    )

}