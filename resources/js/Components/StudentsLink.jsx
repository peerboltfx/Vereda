import React, {useState} from "react";

import { Link, usePage } from '@inertiajs/inertia-react';
import { ArrowRight, CaretRight, ChatLeft, PencilSquare, People, PersonBadge,  Book } from 'react-bootstrap-icons';
import "../../css/style.css";
import NavLink from "./NavLink";
import Dropdown from '@/Components/Dropdown';
import { FileEarmarkMedical, JournalAlbum,  Paypal, Pencil, Power,  Recycle,  Person, Grid} from 'react-bootstrap-icons';




export function StudentsLinks({Programs}){
    const [navbar, setNavbar]= useState(false);
    const {auth, verified}=usePage().props;
    const HandleClose =()=>{
        setNavbar(false);
    }

    return (
        <>
            <ul className='ml-0 pt-4 pl-0'>
                <li className='ml-0 left-navbar'> <NavLink className="InertiaLink" active={route().current('dashboard')} href="/dashboard"><span><Grid/></span>Dashboard</NavLink></li>
                <li className='ml-0 left-navbar'><NavLink href="/profile" active={route().current('Profile')}><span><Person/></span> User Profile</NavLink></li>
                <li className='ml-0 left-navbar'> <NavLink className="InertiaLink" href="/profile/profile-edit" active={route().current('EditProfile')}><span><Pencil className="InertiaLink-icon" /></span>Edit Profile</NavLink></li>
                {verified.length >= 1 && <>
                    <li className='ml-0 left-navbar'><NavLink className="InertiaLink" href="/student/my-assignments" active={route().current('Assignment')}><span><JournalAlbum className="InertiaLink-icon" /></span> Assignment report</NavLink></li>
                    <li className='ml-0 left-navbar'><NavLink className="InertiaLink" href={route('StudentReportTable')} active={route().current('StudentReportTable')}><span><FileEarmarkMedical className="InertiaLink-icon" /></span>Student Result</NavLink></li>
                </>}
                <li className='ml-0 left-navbar'><NavLink className="InertiaLink" href="/account/referral" active={route().current('ReferralPage')}><span><Recycle className="InertiaLink-icon" /></span> Referral Program</NavLink></li>
                <li className='ml-0 left-navbar'><NavLink className="InertiaLink" href="/account/transactions" active={route().current('Transaction')}><span><Paypal className="InertiaLink-icon" /></span> Transactions</NavLink></li>
                <li className='ml-0 left-navbar'><Dropdown.Link href={route('logout')} method="post" as="button">
                    <span><Power className="InertiaLink-icon" /></span> Log Out
                </Dropdown.Link></li>
            </ul>
        </>
    )
}