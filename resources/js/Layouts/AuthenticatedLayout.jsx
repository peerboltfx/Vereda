import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Bell, Gear, List, Search as Searching, Person, Pencil, Power  } from 'react-bootstrap-icons';
import {  Col } from 'react-bootstrap';
import { CloseButton } from 'reactstrap';
import { AdminLinks } from '@/Components/AdminLinks';
import { ModeratorLinks } from '@/Components/ModeratorLinks';
import { StudentsLinks } from '@/Components/StudentsLink';
import Logo from "@/assets/Images/logo.png";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import  Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import "../../css/style.css";



const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function Authenticated({ auth, header, children, childs, Search, Programs, ChartWeeklyProgress, childmobile }) {

    const { programs, moderators, notification } = usePage().props;
    const [notify, setNotify] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [dropNav, setDropbar] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();//classes for notification menu
    const [anchorEl1, setAnchorEl1] = React.useState(null);//Handles Notification menu
    const [selectedIndex, setSelectedIndex] = React.useState(1);//index of notification menu
  
   /**
    * 
    *  HandleClickListItem event 
    * will Handle Notification Menu
    */
    const handleClickListItem = (event) => {
      setAnchorEl1(event.currentTarget);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl1(null);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
      };


    /**
     * Handles User Menu Profile Shortcut
     */
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const HandleHide = () => {
        if (window.scrollY >= 200) {
            setDropbar(true);
        }
        else {
            setNavbar(false)
        }
    }

    window.addEventListener("scroll", HandleHide);

    const HandleNavbar = () => {
        setNavbar(true);
    }

    const HandleCloseNav = () => {
        setNavbar(false);
    }

    if (!notify) {
        window.Echo.channel('update_channel')
            .listen('update', (update) => {
                console.log('update')
                if (update) {
                    setNotify(true);
                }
            })
    }


    return (
        <div className="min-h-screen flex bg-gray-100">
            <Col md="3"  sm="0" lg="2" className="bg-white mobile-hide tab-hide overflow-hidden">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-2xl mx-auto">
                        <div className=" justify-between h-16">
                            <div className="block">
                                <div className="shrink-0 w-100 mt-6 w-auto flex flex-column-center items-center">
                                    <Link className="text-center  mr-auto ml-auto" href="/">
                                        <ApplicationLogo className=" h-9 w-auto text-gray-500" />
                                    </Link>
                                </div>
                                <div className='dashboardList ml-0 pl-0 block'>
                                    {childs}
                                    <div className="dashnavbar ">
                                        {auth.user.role == "admin" && <>
                                            <AdminLinks />

                                        </>}
                                        {auth.user.role == "moderator" && <>
                                            <ModeratorLinks /></>}
                                        {auth.user.role == "student" && <StudentsLinks />}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </nav>
            </Col>
            <Col md="9" lg="10" className="main-page" style={{height:"100vh",overflowY:"scroll"}}>
                <div style={{ zIndex: "99" }} className={dropNav ? 'w-100 h-20 bg-white p-3  pt-4 fixed shadow closebutton-hide' : "w-100 h-20  p-3  pt-4 fixed  closebutton-hide"}>

                     <Badge badgeContent={auth.user.notifications.length} className='float-right mr-2' overlap="rectangular" color="error">
<List  onClick={HandleNavbar} /></Badge>


                    <img src={Logo} onClick={() => { location.href = "/" }} width="90px" className='pb-3' />

                    <nav className={navbar ? "menuNavbar active bg-primaries h-100 w-100 left-0" : "menuNavbar bg-color-dark-blue w-0 left-0"}>
                        <div className="text-white p-3">
                             <CloseButton className='text-white' style={{fontSize:"13px",color:'#fff',float:"right"}}  onClick={HandleCloseNav} />
                             <Badge badgeContent={auth.user.notifications.length} overlap="rectangular" color="error">
                             <Bell  onClick={handleClickListItem} className='fs-5 text-white ' /> 
                             </Badge>
                             </div>
                        <div className='p-3'><div className='search-display  rounded-full w-90 flex flex-column-center items-center bg-white'><div className='search-icon ml-2 text-color-gray'><Searching /></div> {Search}</div>
                        </div>
                        <div className='dashboardList ml-0 pl-0 block' >
                            {childmobile}
                        
                            <div className="dashnavbar " >
                                {auth.user.role == "admin" && <>
                                    <AdminLinks />

                                </>}
                                {auth.user.role == "moderator" && <>
                                    <ModeratorLinks /></>}
                                {auth.user.role == "student" && <StudentsLinks />}

                            </div>
                        </div>
                    </nav>
                </div>


                <div className="">
                    {header && (
                        <header className="pt-3  w-100 block">
                            <div className='flex'>
                                <Col lg="5" md="3" className="mx-auto py-6 dashboard-header text-color-dark-black px-4 sm:px-6 lg:px-8">
                                    {header}
                                </Col>
                                <Col lg="4" md="4" className='p-2 tab-hide mobile-hide mt-3'><div className='search-display rounded-full flex flex-column-center items-center bg-white'>
                                    <Searching  className="ml-2 text-color-gray"/>
                                    {Search}</div></Col>
                                
                                <Col lg="3" md="5" className='p-2 tab-hide mobile-hide mt-3 flex col-md-3'>
                                        <Badge badgeContent={auth.user.notifications.length} overlap="rectangular" color="error">                                                 
                                         <Tooltip title="Read notifications" aria-label="Read notifications">
                                            <div  onClick={handleClickListItem} className='bg-white rounded-full ml-2 w-10 h-10 flex flex-column-center items-center'>
                                                <Bell className='fs-5 text-gray-500 ml-auto mr-auto' />
                                            </div>
                                            </Tooltip>

                                         </Badge>
                                    <Tooltip title="Profile Settings" aria-label="Read notifications">
                                    <div className='bg-white rounded-full ml-2 w-10 h-10 flex flex-column-center items-center'><Link className="text-center fs-5 fw-bold text-white ml-auto mt-auto mb-auto mr-auto" href="/profile/profile-edit"><Gear className='fs-5 text-gray-500 ml-auto mr-auto' /></Link> </div>
                                    </Tooltip>
                                    <div style={{width:"40%"}} className=' ml-2 h-10 flex flex-column-center mt-1 items-center'><h6 style={{ fontSize: "18px", textTransform:"capitalize" }} className="fw-bold">{auth.user.name}</h6></div>
                                    <Tooltip title="shortcut" aria-label="Read notifications">
                                    <div  onClick={handleClick} className=' w-10 ml-2 h-10 bg-color-blue rounded-full flex flex-column-center items-center'><div className="text-center fs-5 fw-bold text-white ml-auto mt-auto mb-auto mr-auto">{auth.avatar ? <img src={`../../../../storage/jpg/${auth.avatar}`} className="rounded-full" /> : auth.user.name.charAt(0).toUpperCase()}</div></div>
                                    </Tooltip>
                                </Col>
                            </div>

                        </header>
                    )}

                    <div className='p-0'>
                        <Col md="12"  sm="12">
                            <main className='' style={{ width: "100%" }}>{children}</main>
                        </Col>
                    </div>
                </div>
                <div className="bg-white pt-5 pb-4 flex items-center">
                    <div className="container">
                        <div className="section-wrapper w-full">
                            <p width="10%" className='ml-auto mr-auto text-center'><Link className='' href="/">Vereda Digital Learning</Link>&copy; 2023 </p>
                        </div>
                    </div>
                </div>
            </Col>
            <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={handleClose}><ListItemIcon><Person /> </ListItemIcon> <Typography ant="inherit"><Link href='/profile'>Profile</Link></Typography></MenuItem>
        <MenuItem onClick={handleClose}><ListItemIcon><Pencil /> </ListItemIcon><Link href='/profile/edit-profile'> My account</Link></MenuItem>
        <MenuItem onClick={handleClose}><ListItemIcon><Power /> </ListItemIcon><Link  href={route('logout')} method="post" >Logout</Link> </MenuItem>
        
      </Menu>
    {/* Menu Item For Notification  */}
      <Menu
        id="lock-menu"
        anchorEl={anchorEl1}
        keepMounted
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
      >
        {auth.user.notifications.map((option, index) => (
          <MenuItem
            key={index}
           
           
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.data.notifiable_id}
          </MenuItem>
        ))}
        <div className='pt-2 pb-2 m-2 text-white bg-primaries text-center rounded-full'>mark all as read</div>
      </Menu>
        </div>
    );
}
