import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,usePage } from '@inertiajs/inertia-react';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js';
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../css/main.css";
import { Col, Container, Form } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
import PrimaryButton from "@/Components/PrimaryButton";
import { Alert } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useForm } from "@inertiajs/inertia-react";
import { Person, Book } from "react-bootstrap-icons";

export default function ProfileEdit(props){
    const {auth, programs, flash, profile}=usePage().props;
    const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());
    const [show,setShow] = useState(false);
    const HandleShow=()=>{
        setShow(true);
    }

    const {data, setData, post, progress} = useForm({
    "firstname": profile ? profile.firstname:"",
    "lastname": profile? profile.lastname:"",
    "country": profile ? profile.country : "",
    "gender": profile ?profile.gender:"",
    "birthDate":profile ? profile.birthDate:"",
    "desire":profile ? profile.desire:"",
    "email": auth.user.email || "",
    "phone": auth.user.phone || "",
    "address":profile ? profile.address : "",
    "education": profile ? profile.education: "",
    "avatar":profile ? profile.avatar: ""
});

   const HandleChange=(e)=>{
   const key = e.target.name;
   const value=e.target.value;
   setData(data=>({
        ...data,
        [key]:value
    }))
   }

   const HandleSubmit=(e)=>{
    e.preventDefault();
    Inertia.post("/profile/update",data);
   }

  const countries=["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"];
    
    const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const found = programs.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(data.search)))
   
    return(
        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<>
            <h2 className="font-semibold fs-2 leading-tight">{auth.user.name}</h2>
            <h3 className="fs-4 fw-bold text-color-blue"> Edit Profile
            </h3>

        </>}
          Search={<div className="Search-container"><input  onClick={HandleShow} type="text" name="search" value={data.search} onChange={HandleChange} />
       <div onBlur={()=> setShow(false)} tabIndex="0" style={{height:"400px", overflowY:"scroll"}} className={show?'Searched bg-white active p-2': 'Searched'}>
          <h6 className='fw-bold text-color-dark-blue text-center'>Search Course</h6>
       {found.map((data, index)=>{
              return(
               <div className='bg-white pt-2 mt-1 pb-2 pl-4 shadow-sm sm:rounded-lg'  key={index}>
              <Row>
                  <Col mx="6" >
                  <Link href={`/en/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-dark-blue">
                    <div className="flex pb-3">
                          <Col md="6"  className="pt-0 ">
                          <Book
                          style={{ fontSize:"30px",
                                    color: "#DC4731"

                                  }} className="pl-1" />
                            </Col><Col md="6"  className='fs-5 fw-bold pl-0 ml-4 text-color-dark-blue'>{data.program}</Col> 
                  </div>
                  </Link>
                 </Col>
             
             
             
              </Row>
            </div>
              )
            })}
       </div></div>}
        >
        <Head title="Profile Form" />


        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                                <form onSubmit={HandleSubmit} method="POST" >
                                <div className="row">
                                    <Col md="3">
                                    <label HtmlFor="avatar" className="flex w-100 items-center">
                                       
                                        <Person className="text-color-dark-blue" style={{fontSize:"150px"}}/>
                                    </label>
                                        <DndProvider backend={HTML5Backend}>
                                            <input type="file"
                                            required
                                            name="avatar"
                                            id="avatar"
                                           
                                            className="block"
                                            accept="png/jpg"
                                           onChange={(e)=> setData("avatar",e.target.files[0])}
                                            />
                                        </DndProvider>
                                    </Col>
                                    <Col md="9">
                                        <div className="row">
                                            <Col md="6">
                                <div className="mt-4">
                                    <Form.Label>
                                        First name
                                    </Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="firstname" value={data.firstname} 
                                    onChange={HandleChange}/>
                                </div>
                                </Col>
                                <Col md="6">
                                <div className="mt-4">
                                    <Form.Label>
                                        Last name
                                    </Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="lastname" 
                                    value={data.lastname} 
                                    onChange={HandleChange}/>
                                </div>
                                </Col>
                                </div>
                                <div className="row">
                                
                                    <Col md="6">
                                     <div className="mt-4">
                                     <Form.Label className="fw-bold">
                                        Date of Birth *
                                    </Form.Label>   
                                    <Form.Control 
                                    type="date" 
                                    required 
                                    name="birthDate" 
                                    value={data.birthDate} 
                                    onChange={HandleChange}/>
                                </div>
                                    </Col>
                                    <Col md="6">
                                     <div className="mt-4"> 
                                     <Form.Label className="fw-bold">
                                        Parent Name *
                                    </Form.Label>  
                                    <Form.Control 
                                        type="text" 
                                        required 
                                        name="ParentName"
                                        placeholder="Mana William"
                                        value={data.ParentName} 
                                        onChange={HandleChange}/>
                                </div>
                                    </Col>
                                </div>
                                <div className="row">
                                <Col md="6">
                                 <div className="mt-4">
                                 <Form.Label className="fw-bold">
                                    Phone Number *
                                </Form.Label>   
                                <Form.Control 
                                type="text" 
                                required 
                                name="phone" 
                                placeholder="+123456798"
                                value={data.phone} 
                                onChange={HandleChange}/>
                            </div>
                                </Col>
                                <Col md="6">
                                 <div className="mt-4"> 
                                 <Form.Label className="fw-bold">
                                    Email Address *
                                </Form.Label>  
                                <Form.Control 
                                    type="text" 
                                    required 
                                    name="email"
                                    placeholder="william@gmail.com"
                                    value={data.email} 
                                    onChange={HandleChange}/>
                            </div>
                                </Col>
                            </div>
                            <div className="row">
                                <Col md="6">
                                <div className="mt-4">
                                    <Form.Label>
                                        Country
                                    </Form.Label>
                                        <Form.Select 
                                        value={data.country}
                                         required 
                                         name="country" 
                                         onChange={HandleChange}>
                                          <option>select country</option>
                                           {countries.map((info,index)=>{
                                            return(<option key={index} value={info}>{info}</option>)
                                           })}
                                        </Form.Select>
                                </div>
                                </Col>
                                <Col md="6">
                                 <div className="mt-4"> 
                                 <Form.Label className="fw-bold">
                                    Highest Education *
                                </Form.Label>  
                                <Form.Control 
                                    type="text" 
                                    required 
                                    name="education"
                                    placeholder="BSc Computer Science"
                                    value={data.education} 
                                    onChange={HandleChange}/>
                            </div>
                              
                                </Col>
                                </div>
                               <div className="row">
                               <Col md="6">
                                <div className="mt-4">
                                    <Form.Label  className="fw-bold">
                                        Address *
                                    </Form.Label>
                                    <Form.Control 
                                    name="address"  
                                    as="textarea"  
                                    value={data.address} 
                                    onChange={HandleChange}/>
                                </div>
                                </Col>
                                <Col md="6">
                                <div className="mt-4">
                                    <Form.Label className="fw-bold">
                                        discuss your desire
                                    </Form.Label>
                                    <Form.Control 
                                    name="desire"  
                                    as="textarea" 
                                    required 
                                    value={data.desire} 
                                    onChange={HandleChange}/>
                                </div>
                                </Col>
                                </div>
                                <div className="w-40 mt-5 float-right rounded-full"><PrimaryButton  className="float-right rounded-full">save</PrimaryButton></div>
                                </Col>
                                </div>
                               
                                </form>
                                {flash.message && (<Alert  variant="success"> Successfully Updated.</Alert>)}
                           </div>
                    </div>

                  
                </div>
            </div>
</AuthenticatedLayout>
    )
}