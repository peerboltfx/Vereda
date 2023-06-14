import React,{useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { Row, Tab, Tabs } from 'react-bootstrap';
import "../../css/style.css";
import { DisplayPlan } from '@/Components/SecuredComp/displayPlans';
import { CalenderPart } from '@/Components/SecuredComp/Calender';
import { SubjectView } from '@/Components/SecuredComp/SubjectView';
import { Book, PlayBtnFill, StopwatchFill } from 'react-bootstrap-icons';
import DOMPurify from "dompurify";
import  Typography  from '@material-ui/core/Typography';
import ListItemIcon from "@mui/material/ListItemIcon";
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'react-bootstrap/Modal';
import { Inertia } from '@inertiajs/inertia';



const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));



export default function FullStackSession(props) {
    const [key, setKey] = useState('home');
    const {name, plans, program, progress, expires, subscription, order} = usePage().props;
    const { child1, child2, child3 } = props;
    const classes = useStyles();//classes for notification menu
    const [anchorEl1, setAnchorEl1] = React.useState(null);//Handles Notification menu
    const [selectedIndex, setSelectedIndex] = React.useState(1);//index of notification menu
    const [view, setView] = useState(expires == "true" ? true : false);

  
  
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

    const [values, setValues] = useState({
        "search":"",
    });
      const [show,setShow] = useState(false);
      const HandleShow=()=>{
          setShow(true);
      }
      const HandleChange=(e)=>{
         const key = e.target.name;
         const value = e.target.value;
         setValues(values=>({
          ...values,
          [key]:value,
         }))
      }
      
      const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
      }

      const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
        year: 'numeric',
        month: 'long',
        day:'numeric',
       });
  
       
      const found = plans.filter(obj => Object.values(obj).some(val => typeof val == "string" && val.includes(values.search)))
   
      function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

      async function handleSubscribe(){
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
      
        if (order == null){
        
          Inertia.post("/checkorder",
          {
            data_amount: subscription.amount,
            data_recursive:1,
            data_method: "monthly subscription",
            data_describe:subscription.program,
            data_price : subscription.amount,
            data_discount: values.discount,
        });
        }
       
        
    
        const options = {
            key: order.razorpayId, // Enter the Key ID generated from the Dashboard
            amount: subscription.amount,
            currency: 'INR',
            name: subscription.program,
           image:'https://vereda.co.in/Images/logo.png',
            description: order.receipt,
            order_id: order.orderId,
            prefill: {
                name: `${props.auth.user.name}`,
                email: `${props.auth.user.email}`,
                contact: "",
            },
            theme: {
                color: "white",
            },
            handler: function(response){
              var values ={
                  razorpay_signature: response.razorpay_signature,
                  razorpay_order_id: response.razorpay_order_id,
                  transactionid:response.razorpay_payment_id,
                  transactionamount: subscription.amount,
              }
              Inertia.post("/razorpaypaymentUpdate",
          {
              orderId:order.orderId,
              amount: subscription.amount,
              razorpay_order_id:values.razorpay_order_id,
              razorpay_payment_id:values.transactionid,
              describe:subscription.program,
              recursive:subscription.recure,
              price : subscription.amount,
              data_method:subscription.method,
              batchid : subscription.batch,
          }
        )
      }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    
     } 
       
      return (
        <AuthenticatedLayout
            auth={props.auth}
            plans={props.plans}
            errors={props.errors}
            Programs={program.map((data,index)=>{
                return (<li key={index}><Link href={`/admin/edit-program/${data.program.split(' ').join('-')}/session/${data.random}`} className="text-color-white">{data.program}</Link></li>)
               })}
            header={<>
            <h3 className="font-semibold fs-3 text-color-blue leading-tight">{name}</h3>
            <h3 className="fs-4 ">(6 Months Program)</h3>
            <h6>Progress <b>{progress} / 26</b></h6>
            <div style={{
              width:"115px",
              borderRadius:"10px",
              border:"solid 1px gray",
              height:"6px",
              overflow:"hidden",
            }}>
              <div style={{
                height:"30px",
                position:"relative",
                bottom:"10px",
                width:progress * 5,
                background:"white"
              }}></div>
            </div>
            </>}
       
       
       
       Search={<div className="Search-container"><input  onClick={handleClickListItem} type="text" name="search" value={values.search} onChange={HandleChange} />
      
      <Menu
        id="lock-menu"
        anchorEl={anchorEl1}
        keepMounted
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
      >
        {found.map((data, index) => (
          <MenuItem
            key={index}
           
           
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <ListItemIcon>
            {data.sessiontype == "book" && (<Book
                           style={{ fontSize:"30px",
                           color: "#DC4731"

                         }}
                          />) || data.sessiontype == "video" && (
                          <PlayBtnFill
                          style={{ fontSize:"30px",
                                    color: "#DC4731"

                                  }} className="pl-1" />
                            ) ||  data.sessiontype == "test" && (<StopwatchFill style={{ fontSize:"30px",
                            color: "#DC4731",
                          
                            }}/>) }
            </ListItemIcon>
            <Typography><Link  href={`/student/en/study/${data.program_code}/${data.topic.split(" ").join("-")}/${data.id}`}>{data.topic}</Link></Typography>
          </MenuItem>
        ))}
      </Menu>
       </div>}

       >
            <Head title={`${name} - Courses and Sessions`} />
            <div className="py-12">
                <div className="col">
                    <div className="overflow-hidden ">
                        <div className="p-6 border-b border-gray-200">
                      <Row>
                        <Tabs
                            id="justify-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 bg-white shadow-sm sm:rounded-lg pt-2 pb-2" 
                            justify
                            >
                          <Tab eventKey="home"  title="Daily Plan">
                          <DisplayPlan/>
                            </Tab>
                            <Tab eventKey="Subject" title="Subject View">
                            <SubjectView />
                            </Tab>
                           
                        </Tabs>
                      </Row>
                       {/* Menu Item For Notification  */}
                            
                <Modal
                  show={view}
          
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  centered
                  >
                <Modal.Header>
                  <Modal.Title><h5>Payment Alert </h5></Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                            <div className='flex items-center flex-col w-100'>
                              <p>Your Subscription expired on <span className='fw-bold underline'>{subscription.expires_at}</span></p>
                              <p>to continue your studies click on the button to proceed to payment.</p>
                              
                              <button className="rounded-full bg-primaries text-white pt-2 pb-2 pr-4 pl-4" onClick={handleSubscribe}> {order? "Pay now" : "Subscribe"}</button>
                            </div>
              </Modal.Body>
              </Modal>
                        </div>
                    </div>
                </div>
            </div>

</AuthenticatedLayout>
    )}