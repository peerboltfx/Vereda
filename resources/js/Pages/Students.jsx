import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Form, Row, Table, } from 'react-bootstrap';
import "../../css/style.css";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Modal from 'react-bootstrap/Modal';

const ElementMaker=(props)=>{

    return(
        <span>
          {props.showInput  ? (<Form.Control style={{width:"100px"}} type="text" 
          value={props.value}
           onChange={props.handleChange} 
           onBlur={props.handleBlur}
           name={props.HandleName}
        autoFocus />) : 
           (<span
           onDoubleClick={props.HandleDoubleClick}
          
           >
            {props.Handlevalue}
           </span>)}
        </span>
    )
}

export default function Students(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {students}=usePage().props;
    const [showInput , setShowInput] = useState(true);
    const [values, setValues] = useState({
        "batch": "",
    });


    const HandleChange=(e)=>{
        const key = e.target.name;
        const value = e.target.value;
        setValues(values=>({
                ...values,
                [key]:value,
        } ))
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
        >
        <Head title="Students Table" />

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
                                    <th>Batch</th>
                                    <th>Program</th>
                                    <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((data, index)=>{
                                        return(<tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.phone}</td>
                                            <td>{data.role}</td>
                                            <td>
                                               
                                                <ElementMaker
                                                Handlevalue={data.batch? data.batch: "Null"}
                                                value={values.batch}
                                                HandleDoubleClick={() =>setShowInput(true)}
                                                handleBlur={()=>setShowInput(false)}
                                                showInput ={showInput}
                                                handleChange={HandleChange}
                                                HandleName="batch"
                                                
                                                />
                                               
                                            </td>
                                            <td>{data.program}</td>
                                            <td><Link href={`/edit-moderator/${data.id}`}>edit</Link></td>
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