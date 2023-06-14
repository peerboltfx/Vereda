import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Alert, Card, Col, Container, Form, Row, Table,CloseButton } from 'react-bootstrap';
import "../../../css/style.css";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js';
import { convertToHTML } from "draft-convert";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DOMPurify from "dompurify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Program(props){
   
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {programs, flash, batch, moderator} = usePage().props;
    const [values, setValue] = useState({
        'price':"",
        'decription':"",
        "program":"",
        "period":"",
        "inrprice":"",
        "name":"",
        "starts":"",
        "ends":"",
        "trainer":""
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

        Inertia.post('/admin/create-new-program',{"first": values, "second" : convertedContent})
    }

    const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
      }

    return(
        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<>
            <h2 className="font-semibold ts-1 leading-tight">Admin Page</h2>
            <h3 className="fs-4 text-color-blue"> Programs / Create New Program</h3>
        </>}
        childs={<>
        <div className="dashnavbar p-2">
            <h3 className="text-center fs-6 fw-bold">Programs</h3>
            <ul>
                <li onClick={()=>setShow(true)}>Create Program</li>
                <li  onClick={()=>setShow1(true)}>Create Batch</li>
            </ul>
            <hr/>
        </div>
        </>}
    >

    <Head title="Program Page" />
    
    <div className="py-12  row header-block">
    <div className="col">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                        {flash.message && (<>  <Alert show={show} variant="success">
                                <Alert.Heading>Successful <span style={{
                                    float:"right",
                                    fontSize:"15px"
                            }}><CloseButton/></span></Alert.Heading>
                                <p>
                                {flash.message}
                                </p>
                            
                            </Alert></>)}
                                <Card>
                                    <Card.Header> <h1 className="ts-5 text-center tw-bold" >Batch</h1></Card.Header>
                                    <Card.Body>
                                    {batch.map((data, index)=>{
                                        return (
                                                <div key={data.id} className="overflow-hidden mt-3 shadow-sm sm:rounded-lg">
                                                    <p className=" pl-5 pt-4 text-color-blue">Batch {data.id}</p>
                                                    <h5 className="fs-5 text-color-dark-blue  pl-5">{data.name}</h5>
                                                    <hr  className="mt-4  text-color-white"/>
                                                    <Container className=" ">
                                                    <Row>
                                                        
                                                   <div className="p-1 col"> <PrimaryButton className=" success-size-btn p-3"><Link className="text-color-white" onSubmit={(e)=>{e.preventDefault()}} href={`/admin/update/batch/${data.id}`} method="post">{data.options == "open"? ("close ?"):("open ?")}</Link></PrimaryButton></div>
                                                   <div className="p-1 col">  <PrimaryButton  className="col p-2"><Link className="text-color-white" onSubmit={(e)=>{e.preventDefault()}}  href={`/admin/delete/batch/${data.id}`} method="post">delete</Link></PrimaryButton> </div>
                                                    </Row>    
                                                    </Container>
                                        </div>
                                       )})}
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>

                <div className="col ">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                                <Card>
                                    <Card.Header> <h1 className="ts-3 text-center tw-bold" >Programs</h1></Card.Header>
                                    <Card.Body>
                                       {programs.map((data, index)=>{
                                        return (
                                                <div key={index} className="overflow-hidden mt-3 shadow-sm sm:rounded-lg">
                                                    <p className=" pl-5 pt-4 text-color-blue">program name</p>
                                                    <h1 className="fs-4 fw-bold text-color-dark-blue pl-5">{data.program}</h1>
                                                    <hr className=" text-color-dark-blue"/>
                                                    <p className=" pl-5 pt-4 text-color-blue">program Price</p>
                                                    <h5 className="fs-6 text-color-dark-blue  pl-5">{data.price.toString("fi-FI").replace(/\B(?=(\d{3})+(?!\d))/g,",")}</h5>
                                                    <hr className=" text-color-white"/>
                                                    <p className=" pl-5 pt-4 text-color-dark-blue ">program Period</p>
                                                    <h5 className="fs-6 text-color-dark-blue pl-5">{data.period} Months</h5>
                                                    <p className=" pl-5 pt-4 text-color-dark-blue ">program Period</p>
                                                    <div className="fs-6 text-color-dark-blue  pl-5" dangerouslySetInnerHTML={createMarkup( data.description)}></div>
                                                   <Row> 
                                                    <Col  className=" m-3">
                                                       <Link href={`/admin/edit-program/${data.random}`}><PrimaryButton  className=" success-size-btn p-3">Edit</PrimaryButton></Link>
                                                    </Col>
                                                    <Col className=" m-3">
                                                       <Link href={`/admin/delete-program/${data.random}`}><PrimaryButton>delete</PrimaryButton></Link>
                                                    </Col>
                                                    </Row>
                                                   
                                                    

     
    
                                          </div>
                                       )
                                       })}
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
     
                    </div>
                    <Modal
show={show1}
onHide={handleClose1}
backdrop="static"
keyboard={false}
size="lg"
centered
>
<Modal.Header  closeButton>
  <Modal.Title>Create Batch</Modal.Title>
</Modal.Header>
    <Modal.Body>
    <form method="POST" onSubmit={(e)=>{
                                        e.preventDefault();
                                        Inertia.post('/admin/create-batch',{"name":values['name'],"ends":values['ends'],"starts":values['starts'],"trainer":values['trainer']});
                                    }} className="mt-5">
                                                <div className="mt-3">
                                                    <Form.Label>Start-Date</Form.Label>
                                                        <Form.Control 
                                                            type="Date"
                                                            value={values.starts}
                                                            onChange={HandleChange}
                                                            name="starts"
                                                        />
                                                </div>  
                                                <div className="mt-3">
                                                    <Form.Label>End-Date</Form.Label>
                                                        <Form.Control 
                                                            type="Date"
                                                            value={values.ends}
                                                            onChange={HandleChange}
                                                            name="ends"
                                                        />
                                                </div>  
                                               <div className="mt-3">
                                               <Form.Label>Batch</Form.Label>
                                               <Form.Select 
                                               value={values.name}
                                                onChange={HandleChange}
                                                name="name"
                                               >
                                                <option>Select</option>
                                                {programs.map(($data)=>{
                                                    return(<option key={$data.id} value={$data.program}>{$data.program}</option>)
                                                })

                                                }
                                               </Form.Select>
                                                </div>  
                                                <div className="mt-3">
                                                    <Form.Label>Assign Moderator to Batch</Form.Label>
                                                    <Form.Select 
                                                        name="trainer"
                                                        onChange={HandleChange}
                                                        value={values.trainer}
                                                    >
                                                        <option>select Moderator / Trainer</option>
                                                        {moderator.map((data,index)=>{
                                                            return (<option key={index} value={data.id}>{data.name}</option>)
                                                        })}
                                                    </Form.Select>
                                                </div>  
                                               <div className="mt-3 col-3">
                                               
                                                <PrimaryButton className="success-size-btn "> Create Batch</PrimaryButton></div>
                                               </form>
                                               
    </Modal.Body>
    <Modal.Footer>
        <div>
        <Button variant="secondary" onClick={handleClose1}>
            Close
        </Button>
        </div>
  
 
</Modal.Footer>
</Modal>
<Modal
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}
size="lg"
centered
>
<Modal.Header  closeButton>
  <Modal.Title>Create Program</Modal.Title>
</Modal.Header>
<Modal.Body>
<form method="POST" onSubmit={HandleSubmit} className="mt-5">
                                               
                                                   
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
                                                <Form.Label htmlFor="price">Full Price </Form.Label>
                                                <Form.Control 
                                                type="number"
                                                value={values.price}
                                                onChange={HandleChange}
                                                name="price"
                                                required
                                                />
                                               </div>
                                               <div className="mt-3">
                                                <Form.Label htmlFor="price">INR Price </Form.Label>
                                                <Form.Control 
                                                type="number"
                                                value={values.inrprice}
                                                onChange={HandleChange}
                                                name="inrprice"
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
                                                        value={values.content}
                                                        name="description"
                                                        />
                                               </div>
                                            <Col>
                                            <PrimaryButton className="mt-4">Submit</PrimaryButton></Col> 
                                           

                                        </form>
                                        {flash.message && (<>  <Alert show={show} variant="success">
    <Alert.Heading>Successful <span style={{
        float:"right",
        fontSize:"15px"
}}><CloseButton  onClick={()=>{ setShow(false)}}/></span></Alert.Heading>
    <p>
     {flash.message}
    </p>
   
  </Alert></>)}
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary">Understood</Button>
</Modal.Footer>
</Modal>


                   

                 
                </div>
</AuthenticatedLayout>
    )

}