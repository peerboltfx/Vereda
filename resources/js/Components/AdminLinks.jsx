import React, {useState} from "react";
import Logo from '../assets/Images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link, usePage } from '@inertiajs/inertia-react';
import { ArrowRight, CaretRight, ChatLeft,DoorOpen, PencilSquare, People, PersonBadge, PersonCheck, PlusCircle,Calendar2Event, Tools , Speedometer, TelephoneInbound, Book, QuestionCircle, Table, CardChecklist, PenFill } from 'react-bootstrap-icons';
import { CloseButton } from 'react-bootstrap';
import NavLink from "./NavLink";
import Dropdown from "./Dropdown";
import { FileEarmarkMedical, JournalAlbum,  Paypal, Pencil, Power,  Recycle,  Person, Grid} from 'react-bootstrap-icons';



export function AdminLinks(){
    const [navbar, setNavbar]= useState(false);
    const {programs}=usePage().props;
    const HandleClose =()=>{
        setNavbar(false);
    }

    return(
        <>
        <div>
        <ul className='ml-0 pt-4 pl-0'>
              <li className='ml-0 left-navbar'><NavLink href="/profile" active={route().current('Profile')}><span><Person  className="InertiaLink-icon"/></span> Profile</NavLink></li>
              <li className='ml-0 left-navbar'> <NavLink className="InertiaLink" active={route().current('dashboard')} href="/dashboard"><span><Grid className={"InertiaLink-icon"} /></span>Dashboard</NavLink></li>
              <li className='ml-0 left-navbar'> <NavLink className="InertiaLink" href="/profile/profile-edit" active={route().current('EditProfile')}><span><Tools className="InertiaLink-icon"/></span>Edit Profile</NavLink></li>
        
                          <li><Link className="text-color-gray InertiaLink"  href={route('AdminStudents')} >
                          <span><PersonBadge /></span> 
                         Students
                          </Link>
                          </li>
                          <li><Link className="text-color-gray InertiaLink" href={route('Moderators')}>
                          <span><PersonCheck /></span>
                          Moderators
                          </Link>
                          </li>
                          <li>
                          <Link className="text-color-gray InertiaLink" href={route('Users')}>
                          <span><People /></span>
                              Users
                          </Link>
                          </li>
                            <li>
                                <Link className="text-color-gray InertiaLink" href={route('OrderItems')}>
                                <span><Paypal /></span>
                                    Payment Order
                                </Link>
                            </li>
                            <li>
                                <Link className="text-color-gray InertiaLink"    href={route('PaidUser')}>
                                <span><People /></span>
                                    Subscirbers 
                                </Link>
                            </li>
                   
                        {/* <li><Link className="text-color-gray InertiaLink" href=""><span><TelephoneInbound /></span>Requested calls</Link></li> */}
                        <li><Link className="text-color-gray InertiaLink" href="/admin/create-discount"><span><ChatLeft/></span>generate code</Link></li>
                        <li><Link className="text-color-gray InertiaLink"  href={route('createProgram')}><span><PlusCircle  /></span>  Create Batch</Link></li>
                        {/* <li><Link className="text-color-gray InertiaLink" href="/en/courses"><span><Book/></span>Courses</Link></li> */}
                        <li><Link className="text-color-gray InertiaLink" href="/admin/create-course"><span><PenFill/></span>Create Courses</Link></li>
                        <li onClick={()=>setNavbar(true)}  className="text-color-gray InertiaLink" ><span><PencilSquare /></span> Edit Program
                         </li>
                         <ul tabIndex={0} onBlur={()=> setNavbar(false)} className={navbar? 'Unordered active':'Unordered'}>
                        <h6 className='text-right mb-1 mr-1 p-1'><CloseButton  onClick={HandleClose} /></h6>
                        {programs.map((data,index)=>{
                            return (<li key={index}><Link href={`/admin/edit-program/${data.random}`} className="InertiaLink">{data.program}</Link></li>)
                        })}
                        </ul>
                        <li className='ml-0 left-navbar'><Dropdown.Link  href={route('logout')} method="post" as="button">
            <span><Power className="InertiaLink-icon"/></span> Log Out 
                                        </Dropdown.Link></li>
                    </ul>
                    </div>
        </>
    )
}