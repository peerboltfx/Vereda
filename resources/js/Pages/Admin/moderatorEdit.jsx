import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Form, Row, Table, } from 'react-bootstrap';
import "../../../css/style.css";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function moderatorEdit(props){
    const {moderator}=usePage().props;
    const [values, setValue] = useState({
        'roles':"",
        "amount" : ""
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

    const HamdleSubmit=(e)=>{
        e.preventDefault();
        Inertia.post(`/admin/edit/moderator/${moderator[0].id}`,values);
    }
    return(
        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<>
            <h2 className="font-semibold ts-1 leading-tight">Admin Page</h2>
            <h3 className="fs-4 text-color-blue"> Edit User Role</h3>
        </>}
    >
    <Head title={"Edit - "+moderator[0].name} />

    <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                                <Card>
                                    <Card.Header> <h1 className="ts-3 text-center tw-bold" >{moderator[0].name}</h1></Card.Header>
                                    <Card.Body>
                                        <ul style={{listStyle:"none"}}>
                                        <li className="mt-3 "><b className="mr-5 ">Email - : - </b>{moderator[0].email}</li>
                                        <li className="mt-3"><b className="mr-5 ">Phone - : - </b>{moderator[0].phone}</li>
                                            <form method="POST" className="mt-5" onSubmit={HamdleSubmit}>
                                                <Row  className="mt-2 header-block">
                                                   <Col>
                                                    <Form.Label htmlFor="roles">Roles</Form.Label>
                                                   </Col>
                                                    <Col>
                                            
                                                    <Form.Select 
                                                    value={values.roles}
                                                    onChange={HandleChange}
                                                    name="roles"
                                                    >
                                                        <option value={moderator[0].role}>{moderator[0].role}</option>
                                                        <option value="admin">admin</option>
                                                        <option value="moderator">moderator</option>
                                                        <option value="student">student</option>
                                                                            </Form.Select>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-4 header-block">
                                                   <Col>
                                                    <Form.Label htmlFor="roles">Send Discount</Form.Label>
                                                   </Col>
                                                    <Col>
                                            
                                                    <Form.Control
                                                    type="number"
                                                    value={values.amount}
                                                    onChange={HandleChange}
                                                    name="amount"
                                                   />
                                                      
                                                  
                                                    </Col>
                                                </Row>
                                                <Col md="3">
                                                <PrimaryButton className="mt-4">Submit</PrimaryButton></Col> 
                                            </form>
                                            
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
</AuthenticatedLayout>
    )

}