import React,{ useState} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { usePage, Link } from '@inertiajs/inertia-react';
import DOMPurify from "dompurify";

import "../../../css/style.css";
import { Book, PlayBtnFill } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import usePagination from "@/Components/pagination";

export function SubjectView(props){
  const {plans} = usePage().props;
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  
  const count = Math.ceil(plans.length / PER_PAGE);
  const _DATA = usePagination(plans, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const check=2;
  let items = [plans];

  for(let number=1; number <= 3; number++){
    items.push(<Pagination.Item key={number}>
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

    return(
        <>
         <Container  id="left-tabs-example" defaultactivekey="first">
      <Row>
        <Col max={12}>
        
            {plans? _DATA.currentData().map((data, index)=>{
              return(
               <div className='bg-white pt-5 mt-2 pb-5 pl-4 shadow-sm sm:rounded-lg'  key={data.id}>
              <Row className='header-block'>
                  <Col mx="6" >
                  <Link href={`/student/en/study/${data.program_code}/${data.topic.split(" ").join("-")}/${data.id}`}>
                    <div className="row pb-3">
                          <Col sm={1}  className="pt-2">{data.sessiontype == "book" && (<Book
                           style={{ fontSize:"30px",
                           color: "#DC4731"

                         }}
                          />) || data.sessiontype == "video" && (
                          <PlayBtnFill
                          style={{ fontSize:"30px",
                                    color: "#DC4731"

                                  }}/>
                            )}</Col><Col className='fs-2 fw-bold pl-0 text-color-dark-blue'>{data.topic}</Col> 
                  </div>
                  </Link>
              <h6 className='pt-2 text-color-baby-blue'>{longEnUsFormatter.format(new Date(`${data.date}`))}</h6>
                 </Col>
             
             
              <Col mx="6" >
              <div className="preview" dangerouslySetInnerHTML={createMarkup( data.decription)}></div>
 
              </Col>
              </Row>
            </div>
              )
            }) : "Check"}
         
        </Col>
        <div className="flex items-center mt-4 flex-col sm:justify-center">
                             <Pagination
                              count={count}
                              size="large"
                              page={page}
                              variant="outlined"
                              shape="circular"
                              onChange={handleChange}
                            />
                             </div>
      </Row>
    </Container>
        </>
    )
}