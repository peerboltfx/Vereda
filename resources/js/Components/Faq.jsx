
import { Accordion, Col } from "react-bootstrap";
import React, { useState} from "react";
import { usePage } from "@inertiajs/inertia-react";

export function Faqs(){
    const [accord1, setAccord1] = useState(false);
    const [accord2, setAccord2] = useState(false);
    const[accord3,setAccord3]= useState(false);
    const [accord4,setAccord4]= useState(false);
    const {}=usePage().props;


    
    const HandleAccord1=()=>{
        setAccord1(!accord1);
    }
    const HandleAccord2=()=>{
        setAccord2(!accord2);
    }
    const HandleAccord3=()=>{
        setAccord3(!accord3);
    }
    const HandleAccord4=()=>{
        setAccord4(!accord4);
    }

    return(<>
             <div>
                    <h4 className="pt-4 pb-3">Frequently Asked Questions</h4>    
                        <Accordion
                        defaultActiveKey="0" activeKey="0" flush>
                            <Accordion.Item>
                                <Accordion.Header onClick={HandleAccord1}>What is the learning experience like with Projects?</Accordion.Header>
                            <div className={accord1? "dropAccordion": "dropAccordion show pt-3 pl-2"}>
                                In Projects, you'll complete an activity or scenario by following a set of instructions in an interactive hands-on environment. Project are completed in a local host or real cloud environment and within real intances of various products as opposed to a simulation or demo environment.
                                </div>
                            </Accordion.Item>
                            <Accordion.Item>
                                <Accordion.Header onClick={HandleAccord2}>Benefits of purchasing a Project?</Accordion.Header>
                            <div className={accord2? "dropAccordion show pt-3 pl-2": "dropAccordion"}>
                                By purchasing a project, you'll get everything you need to complete the project including temporary access to any product required to complete the Project.
                            </div>
                            </Accordion.Item>
                            <Accordion.Item onClick={HandleAccord3}>
                                <Accordion.Header>Are Projects available on desktop and mobile?</Accordion.Header>
                                <div className={accord3? "dropAccordion show pt-3 pl-2": "dropAccordion"}>
                                We highly recommend that you complete Projects on a laptop or desktop only.
                                </div>
                            </Accordion.Item>
                            <Accordion.Item>
                                <Accordion.Header  onClick={HandleAccord4}>What is the refund policy?</Accordion.Header>
                                <div className={accord4? "dropAccordion show pt-3 pl-2": "dropAccordion"}>
                                Project are not eligible for refunds.
                                </div>
                            </Accordion.Item>
                        </Accordion>
                    </div>
        </>)
}