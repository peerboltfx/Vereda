import React,{useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Row, Tab, Tabs, Form, Col, CloseButton } from 'react-bootstrap';
import "../../../css/style.css";
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import { usePage } from '@inertiajs/inertia-react';
import Alert from 'react-bootstrap/Alert';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js';
import { convertToHTML } from "draft-convert";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function FullStackSession(props) {

    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {flash, batch, program}=usePage().props;
    const [show, setShow] = useState(true);
    const [values, setValues]=useState({
                     'date': "",
                     'topic':"",
                     "sessiontype":"",
                     "batch":"",
                     "programs_code":"",
                     "assignment":"",
                     "about":"",
                     "links":"",
                     
                         });
  


    const HandleChange=(e)=>{
        const key=e.target.name;
        const value = e.target.value;
        setValues(values => ({
         ...values,
         [key]:value,
        }))
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
        Inertia.post('/create/schedule-daily-plan',{"first":values,"second":convertedContent});
     }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
            <h2 className="font-semibold ts-1 leading-tight">Moderator Page</h2>
            <h3 className="fs-4 text-color-blue">Daily Plan Scheduling</h3>
            </>}
        >
            <Head title="Moderator / Scheduler" />
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <form onSubmit={HandleSubmit} method="POST">
                                <Row className='header-block'>
                                <Col>
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
                                        <div className="mt-2">
                                        <Form.Label>
                                    Assignment.
                                    </Form.Label>
                                    <Form.Control
                                     as="textarea"
                                     name="assignment"
                                     value={values.assignment}
                                     onChange={HandleChange}
                                        />
                                        </div>
                                        <div className='mt-2'>
                                    <Form.Label>
                                    Google Meet Link
                                    </Form.Label>
                                    <Form.Control 
                                    type="text"
                                     placeholder="Normal text"
                                     name="links"
                                     onChange={HandleChange}
                                     value={values.links}
                                     />   
                            
                                </div>
                                </Col>
                                    <Col>
                             
                                <div className='mt-2'>
                                    <Form.Label>
                                    Topic
                                    </Form.Label>
                                    <Form.Control 
                                    type="text"
                                     placeholder="Normal text"
                                     name="topic"
                                     onChange={HandleChange}
                                     value={values.topic}
                                     required
                                     />   
                                     
                                </div>
                                
                              
                                <div className='mt-2 row'>
                                    <Col>
                                    <Form.Label>
                                    Schedule Date and Time
                                    </Form.Label>
                                    <Form.Control 
                                    type="datetime-local" 
                                    onChange={HandleChange}
                                    value={values.date}
                                    name="date"
                                    required
                                    /> 
                                    </Col>
                                   
                                </div>
                              

                                <div className='mt-2 row'>
                                    <Col>
                                        <Form.Label>
                                            Session type 
                                        </Form.Label>
                                        <Form.Select
                                            value={values.sessiontype} 
                                            size="sm"
                                            required
                                            onChange={HandleChange}
                                            name="sessiontype">
                                            <option value="">Select session type</option>
                                            <option value="video">Live Video session</option>
                                            <option value="book">Study session</option>
                                            <option value="test">Practice / test</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Label>
                                            Batch ?
                                        </Form.Label>
                                        <Form.Select 
                                            value={values.batch}
                                            size="sm"
                                            required
                                            name="batch"
                                            onChange={HandleChange}>
                                            <option>select batch</option>
                                           {batch.map((data, index)=>{
                                            return(<option key={index} value={data.id}>Batch {data.id} </option>)
                                           })}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Label>
                                            Program ?
                                        </Form.Label>
                                        <Form.Select 
                                            value={values.programs_code}
                                            size="sm"
                                            required
                                            name="programs_code"
                                            onChange={HandleChange}>
                                                <option>select program</option>
                                           {program.map((data)=>{
                                            return(<option value={data.random} key={data.id}>{data.program}</option>)
                                           })}

                                        </Form.Select>
                                    </Col>
                                </div>
                            </Col>
                               
                                </Row>
                                <div className="pt-12 col-6">
                                        <PrimaryButton>save</PrimaryButton>
                                        </div>
                            
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

                        </div>
                    </div>
                </div>
            </div>

</AuthenticatedLayout>
    )}
    