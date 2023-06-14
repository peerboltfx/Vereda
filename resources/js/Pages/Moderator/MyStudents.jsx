import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import "../../../css/style.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { CloseButton, Col } from "react-bootstrap";


export default function MyStudent(props){

    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {students}=usePage().props;
    const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour12:true
       
       })
       const longEnUsFormatTime=new Intl.DateTimeFormat('en-GB',{
        hour12: true,
       })
       console.log(students)
     
    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Moderator Page / Class</h2>
                <h3 className="fs-4 text-color-blue">My CLass</h3>
            </>}
             childs={<>
               
                </>}
        >
        <Head title="Full Stack Developement" />

        <div className="">
                <div className=" mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden ">
                    <div className="row mb-4 ">

                        {students.map((student, index)=>{
                            return(
                                <Col  className="flex shadow-sm rounded-sm bg-white  items-center flex-col" md="3" lg="4" sm="12" key={index}>
                                <div className="pt-3 pb-3">
                                  <Avatar
                                  sx={{width:100,height:100}}
                                  alt={student.user.name} src={`../../../storage/jpg/${student.user.avatar}`} />
                                </div>
                                    <h3 className="fw-bold fs-4 text-color-dark-blue capitalize  mb-2">{student.user.name}</h3> 
                                    <Divider />
                               <div>
                                   <h6>{student.program}</h6> 
                                   <p className="text-center">started on -- <b className="text-color-dark-blue">{" "+ new Date(`${ student.created_at}`).toLocaleDateString()}</b></p>
                                </div>
                              </Col>                                
                            )
                        })}
         
    </div>
                   
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
        </>
    )
}