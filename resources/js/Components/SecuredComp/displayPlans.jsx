import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { usePage, Link } from '@inertiajs/inertia-react';
import {  } from "draft-convert";
import DOMPurify from "dompurify";
import "../../../css/style.css";
import { Book, BookFill, EyeFill, PlayBtnFill, StopwatchFill } from 'react-bootstrap-icons';
import {Editor , convertFromRaw} from  "draft-js";
import { CloseButton, Pagination } from 'react-bootstrap';
import { Button } from "react-bootstrap";

export function DisplayPlan(props){
  const {plans} = usePage().props;
  const check=2;
  let items = [plans];

  for(let number=1; number <= 3; number++){
    items.push(<Pagination.Item key={number} >
        {number}
    </Pagination.Item> )
  }
  

  const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
  year: 'numeric',
  month: 'long',
  day:'numeric',
 });

 const createMarkup = (html) =>{
  return {
      __html: DOMPurify.sanitize(html)
  }
}

const [lists, setList] = useState(false);
const Handlelist =()=>{
  setList(!lists);
}
    return(
        <>
         <Tab.Container  id="left-tabs-example" defaultactivekey="0">   
      <Row>
        <div className='triggerList p-2 ml-1' onClick={Handlelist}>{lists?<CloseButton />: <EyeFill />}</div>
        <Col className="DashboardScroll" sm={4}>
        <div className={lists? "setTablist bg-white navigation-tab shadow-sm sm:rounded-lg":"tabList"}> 
          <Nav variant="pills" className="flex-column">
          {plans ? plans.map((data, index)=>{
            return(
              <Nav.Item key={index}>
              <Nav.Link
              className="ts-6"
               eventKey={index}
               >{longEnUsFormatter.format(new Date(`${data.date}`))} {longEnUsFormatter.format(new Date(`${data.date}`)) ==longEnUsFormatter.format(new Date()) && (<Button className="ml-4" variant="danger">Today</Button>)}</Nav.Link>
            </Nav.Item>
           )
          }) : "" }
          
          </Nav>
          </div>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            {plans? plans.map((data, index)=>{
              return(
               <Tab.Pane key={index} eventKey={index}>
                  <div className='bg-white pt-5 pb-5 pl-4  sm:rounded-lg'>
                  <Link href={`/study/${data.program_code}-${data.id}`}>
                    <div className="flex pb-2">
                          <Col sm={2} lg="1" md="3" className="pt-2">{data.sessiontype == "book" && (<Book
                          style={{ fontSize:"30px",
                          color: "#DC4731",
                         

                         }}
                          />) || data.sessiontype == "video" && (
                          <PlayBtnFill
                          style={{ fontSize:"30px",
                          color: "#DC4731",
                         
                          }}/>
                            ) ||  data.sessiontype == "test" && (<StopwatchFill style={{ fontSize:"30px",
                            color: "#DC4731",
                          
                            }}/> )}</Col><Col className='fs-2 fw-bold pl-3 text-color-dark-blue'>{data.topic}</Col> 
                  </div>
                  </Link>
              <h6 className='pt-2 text-color-baby-blue'>{new Date(`${data.date}`).toLocaleTimeString()}</h6>
                 </div>
             
               
              <div className='pt-5 pb-5 mt-2 pl-4 bg-white sm:rounded-lg'>
              <h4 className='mt-2 mb-3 fw-bold'>What you will learn</h4>

              <div className="preview" dangerouslySetInnerHTML={createMarkup( data.decription)}>
              </div>
              </div>
              {data.assignment?  <>
              <div className='bg-white pt-5 pb-5 pl-4 shadow-sm sm:rounded-lg'>
              <div className="preview">
                <h4 className='mt-2 mb-3 fw-bold'>Assignment</h4>
                {data.assignment}</div>
              </div></> : ""}
             

            </Tab.Pane>
              )
            }) : "Check"}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        </>
    )
}