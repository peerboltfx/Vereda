import React, { useState } from "react";
import recogn1 from "@/assets/Team/livehindustan.svg";
import "../../css/style.css";
import recogn2 from "@/assets/Team/Dainik_Bhaskar_Logo.png";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";


const Featured = () => {
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
  
    return (
    <section className="section-7">
  <div className="section-header text-center">
                    <span className="subtitle">Featured</span>
                    <h2 className="title">Our Featured Program</h2>
                </div>                <div className="container">
                <div className="recognition row header-block ">
                <div className='col mt-0 p-2'><img  className="" src={recogn2} alt={recogn2} /></div>
                    <div className="col mt-5 p-2"> <img className="" src={recogn1} alt={recogn1} /></div>
                   
                </div>
                </div>
        
        </section>
  );
};

export default Featured;
