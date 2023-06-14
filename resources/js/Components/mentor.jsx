
import React, { useState } from "react";
import mentorweb from "@/assets/Team/mentor-community-companies.png";
import mentorMobile from "@/assets/Team/mentor-community-mobile.png";
import Logo from '../assets/Images/logo.png';
import { Container } from "react-bootstrap";
import { usePage } from "@inertiajs/inertia-react";
import { OffCanvasExample } from "./DropBottom";
import Form from "react-bootstrap/Form";
import PrimaryButton from '@/Components/PrimaryButton';
import { Inertia } from "@inertiajs/inertia";

export function Mentor(){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
   const {flash}=usePage().props;

    const [values, setValue] = useState({
        'name':"",
        "email":"",
        "phone":"",
        "country":"",
        "state":"",
        "occupation":"",
        "studies":"",
        "language":""
    })
    const HandleChange=(e)=>{
       const key=e.target.id;
       const value = e.target.value;
       setValue(values => ({
        ...values,
        [key]:value,
       }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        Inertia.post('/request/call',values);
    }

    const handleClose = () => setShow(false);
  
    return(
        <section className="section-9">
        <div className="container mt-5">
        <div className="section-header text-center">
                    <span className="subtitle">Our mentor associates</span>
                    <h2 className="title">Mentor Community</h2>
                </div>
            <div className="recognition  bg-color-light-gray">
                <img className="alumni-web" src={mentorweb} alt={mentorweb}/>
                <img className="alumni-mobile" src={mentorMobile} alt={mentorMobile}/>
            </div>
        </div>
        <div className="call mt-4 mb-4"> <button onClick={handleShow}  className="full-size-btn capitalize full-width-btn">request call back</button></div>
     
        <OffCanvasExample 
                 show={show}
                 onHide={handleClose}
                 title={<>
                 <div className='block'>
                             <h4><a href="/" className="logo-anchor item-center"><img src={Logo} width="100px" alt={Logo} srcSet="" /></a></h4>
                             <h3 className='fw-bold'>Talk to Our Expert</h3>
                             </div>
                         </>}
                 children={<>
             <Container>
                 <form onSubmit={handleSubmit}>
                    
                     <Form.Control
                     type="text"
                     onChange={HandleChange}
                     value={values.name}
                     id="name"
                     required
                     placeholder="Name"
                     className="mt-2"
                     />
                   
                     <Form.Control
                     type="email"
                     onChange={HandleChange}
                     value={values.email}
                     id="email"
                     required
                     placeholder="abcd@example.com "
                     className="mt-2"
                     />
                     <Form.Control
                     type="number"
                     id="phone"
                     value={values.phone}
                     onChange={HandleChange}
                     required
                     placeholder="+9 9123 567 98"
                     className="mt-2"
                     />
                     <Form.Control
                     type="text"
                     value={values.country}
                     id="country"
                     onChange={HandleChange}
                     required
                     placeholder="Country"
                     className="mt-2"
                     />
                     <Form.Control
                     type="text"
                     id="occupation"
                     value={values.occupation}
                     onChange={HandleChange}
                     required
                     placeholder="Occupation"
                     className="mt-2"
                     />
                   
                     <Form.Control
                     type="text"
                     id="state"
                     value={values.state}
                     onChange={HandleChange}
                     required
                     placeholder="State"
                     className="mt-2"
                     />
                     <Form.Select 
                     onChange={HandleChange}
                     vlaue={values.language}
                     id="language"
                     required
                     className="mt-2"
                     >
                         <option>select Language</option>
                         <option value='English'>English</option>
                
                         <option value='Hindi'>Hindi</option>
                         
                     </Form.Select>
                     <PrimaryButton className='mt-5'>submit</PrimaryButton>
                 {flash.message && (<div className='alert alert-success' >Request sent successfully</div>)}
                 </form>
             </Container>
              </>}
      />
     </section>
    )
}