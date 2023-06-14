import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,usePage } from '@inertiajs/inertia-react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../css/main.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CreateApplication(props){
/**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {auth, programs}=usePage().props;
const [values, setValue] =useState({
    "firstname": "",
    "lastname":"",
    "country":"",
    "gender":"",
    "birthDate":"",
    "program":"",
    "desire":"",
    "address":"",
    "parentName":"",
    "state":"",
});


   const HandleChange=(e)=>{
   const key = e.target.name;
   const value=e.target.value;
    setValue(values=>({
        ...values,
        [key]:value
    }))
   }

   const HandleSubmit=(e)=>{
    e.preventDefault();
    Inertia.post("/profile/application-submit",values);
   }

  const countries=["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"];
    
    const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return(
        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<>
            <h2 className="font-semibold leading-tight">Welcome {auth.user.name}</h2>
            <h3 className="fs-6 pt-5 text-dark ">Congratulations !,<br/> You have successfully registered your account. Before getting started, we assume you have made neccessary research about<b>{" "}Vereda.co.in</b>, who we are, what we offer and benefits of Learning from us. <br/><br/>
            Before you continue we would like you to properly introduce yourself formally to us, and give us a brief discussion of what you would desire to achieve with us as you are about to advance to the training session.<br/><br/><br/>
            <b>Fill in the form below to continue</b> 
            
            </h3>

        </>}      >
        <Head title="Profile Form" />


        <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                                <form onSubmit={HandleSubmit}>

                                <div className="mt-4">
                                    <Form.Label className="fw-bold">
                                        First name *
                                    </Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="firstname" value={values.firstname} 
                                    onChange={HandleChange}/>
                                </div>
                                <div className="mt-4">
                                    <Form.Label  className="fw-bold">
                                        Last name *
                                    </Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="lastname" 
                                    value={values.lastname} 
                                    onChange={HandleChange}/>
                                </div>
                                <div className="mt-4">
                                    <Form.Label className="fw-bold">
                                        Country *
                                    </Form.Label>
                                        <Form.Select 
                                        value={values.country}
                                         required 
                                         name="country" 
                                         onChange={HandleChange}>
                                          <option>select country</option>
                                           {countries.map((info,index)=>{
                                            return(<option key={index} value={info}>{info}</option>)
                                           })}
                                        </Form.Select>
                                </div>
                                <div className="mt-4">
                                    <Form.Label className="fw-bold">
                                        Address *
                                    </Form.Label>
                                    <Form.Control 
                                    name="address"  
                                    as="textarea" 
                                    required 
                                    value={values.address} 
                                    onChange={HandleChange}/>
                                </div>
                                <div className="mt-4">
                                    <Form.Label className="fw-bold">
                                        Gender *
                                    </Form.Label>
                                    <Form.Select 
                                    value={values.gender} 
                                    required 
                                    name="gender" 
                                    onChange={HandleChange}>
                                           <option>Select Gender</option>
                                            <option value={"male"}>Male</option>
                                            <option value={"female"}>Female</option>
                                    </Form.Select>
                                </div>
                                <div className="mt-4">
                                    <Form.Label className="fw-bold">
                                        Intended program *
                                    </Form.Label>
                                    <Form.Select 
                                    required 
                                    value={values.program} 
                                    name="program" 
                                    onChange={HandleChange}>
                                        <option>select program</option>
                                        {programs.map((data,index)=>{
                                            return(<option key={index} value={data.program}>{data.program}</option>)
                                        })}

                                    </Form.Select>
                                  
                                </div>
                                <Row>
                                <Col md="6" sm="6" lg="6" className="mt-4">
                                    <Form.Label className="fw-bold">
                                        Date of birth *
                                    </Form.Label>
                                    <Form.Control 
                                    type="date" 
                                    required 
                                    name="birthDate" 
                                    value={values.birthDate} 
                                    onChange={HandleChange}/>
                                </Col>
                               <Col  md="6" sm="6" lg="6"  className="mt-4">
                                    <Form.Label className="fw-bold">
                                        Parent Name *
                                    </Form.Label>
                                    <Form.Control
                                          type="text" 
                                          required 
                                          name="parentName" 
                                          value={values.parentName} 
                                          onChange={HandleChange}
                                    />
                               </Col>
                                </Row>
                                <div className="mt-4">
                                    <Form.Label className="fw-bold">
                                        discuss your desire *
                                    </Form.Label>
                                    <Form.Control 
                                    name="desire"  
                                    as="textarea" 
                                    required 
                                    value={values.desire} 
                                    onChange={HandleChange}/>
                                </div>
                               
                                <hr className="mt-5"/>
                                <div className="mt-5 ">
                        <Container>
                        <p>
                            Thank you for all this valuable information that we keep confidential.<br/><br/>
                            Your personal data are processed by Vereda.co.in acts as data controller,
                            to enable the processing of your application. In the event that you would be eligible to Vereda.co.in, these data will be used for educational and adminstrative follow up.<br/><br/>
                            You have the right to access, Modify, delete and oppose your personal data. To excercise these rights, please send your request to Vereda Management digital training or <a  href="mailto:Support@vereda.co.in">support@vereda.co.in</a>.<br/><br/>
                            To learn more about how we handle your personal data, please visit our Privacy Policy.<br/><br/>

                        </p>
                        </Container>
                    </div>
                                   <Col mx="6"><PrimaryButton>Continue</PrimaryButton></Col>
                                </form>
                           </div>
                    </div>

                  
                </div>
            </div>
</AuthenticatedLayout>
    )
}