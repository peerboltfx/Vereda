import React, {useState} from "react";
import Logo from '../assets/Images/logo.png';
import Nav from 'react-bootstrap/Nav';
import { Link, usePage } from '@inertiajs/inertia-react';
import { ArrowRight, CaretRight,DoorOpen, ChatLeft, PencilSquare, People, PersonBadge, PersonCheck, PlusCircle,Calendar2Event, Speedometer, Tools, Book, QuestionCircle, Table, CardChecklist, TicketFill, QuestionCircleFill, PeopleFill } from 'react-bootstrap-icons';
import Dropdown from "./Dropdown";
import { Divider } from "@mui/material";
import NavLink from "./NavLink";
import { FileEarmarkMedical, JournalAlbum,  Paypal, Pencil, Power,  Recycle,  Person, Grid} from 'react-bootstrap-icons';


export function ModeratorLinks({Programs}){
    const [navbar, setNavbar]= useState(false);
    const HandleClose =()=>{
        setNavbar(false);
    }

    return(
        <>
                    <ul  className='ml-0 pt-4 pl-0' style={{
                        
                    }}>
                                            <li className='ml-0 left-navbar'> <NavLink className="InertiaLink" active={route().current('dashboard')} href="/dashboard"><span><Grid className={"InertiaLink-icon"} /></span>Dashboard</NavLink></li>
                    <li className='ml-0 left-navbar'><NavLink href="/profile" active={route().current('Profile')}><span><PersonBadge  className="InertiaLink-icon"/></span>Profile</NavLink></li>
                    <li className='ml-0 left-navbar'> <NavLink className="InertiaLink" href="/profile/profile-edit" active={route().current('EditProfile')}><span><Tools className="InertiaLink-icon"/></span>Edit Profile</NavLink></li>

                    <Divider />
                    <li><Link  className="text-color-gray InertiaLink" href={route('ModeratorsStudents')} ><span><PeopleFill/></span> Students</Link></li>
                        <li><Link  className="text-color-gray InertiaLink" href={route('dailyScheduler')} ><span><Calendar2Event/></span> Schedule Plan</Link></li>
                        <li><Link className="text-color-gray InertiaLink" href={route('DailyPlanView')}  ><span><Table/></span>Plan Table</Link></li>
                        {/* <li><Link className="text-color-gray InertiaLink" href={route('CreateProgramme')}  ><span><CardChecklist/></span>Uploaded studies</Link></li> */}
                        <li><Link className="text-color-gray InertiaLink" href={route("createdQuiz")}><span><Speedometer/></span>quiz created</Link></li>
                        <li><Link className="text-color-gray InertiaLink" href="/moderator/view-assignments" ><span><QuestionCircleFill/></span>Assignments</Link></li>
                        <li className='ml-0 left-navbar'><Dropdown.Link  href={route('logout')} method="post" as="button">
                                 <span><Power className="InertiaLink-icon"/></span> Log Out 
                        </Dropdown.Link></li>
                    </ul>
                   
                  
                  </>
    )
}