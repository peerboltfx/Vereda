import React,{useState} from "react";
import "../../css/style.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import { Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Inertia } from "@inertiajs/inertia";
import TextInput from '@/Components/TextInput';
import Fullstack from '@/assets/Team/fullstack-2.webp';
import Flutter from '@/assets/Team/Flutter-App-development.webp';
import DOMPurify from "dompurify";
import axios from "axios";

import ApplicationLogo from "@/Components/ApplicationLogo";
import PrimaryButton from "@/Components/PrimaryButton";
export default function Payment(props){
    
      const {orderId,amount,razorpayId, name,batch,receipt, verified, describe, flash, recure, method} = usePage().props;

    const [values, setValue] = useState({
        'first_name': '',
        'last_name':'',
        'discount' : "",
        "recursive": "",
    });

    const HandleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValue(values=>({
            ...values,
            [key]: value,
        }))
    }

    let img;

    if(props.dev == "Full Stack Development Program"){
        img = Fullstack;
    }
    else if(props.dev =="Flutter Development"){
        img =Flutter
    }

    
    const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const time = new Date();

        const styles={
            toInput:{
                width: "100%"
            }
        }
    
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

  async function displayRazorpay() {
      const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
      }
    
      if (orderId == undefined){
        
        Inertia.post("/checkorder",
        {
            data_amount: Math.round((props.price - props.discount.discount)),
            data_recursive:9,
            data_method: "Instant payment",
          data_describe:props.dev,
          data_price : props.price ,
          data_discount: values.discount,
      });
      }
      
      

      const options = {
          key: razorpayId, // Enter the Key ID generated from the Dashboard
          amount: amount,
          currency: 'INR',
          name: props.dev,
         image:'https://vereda.co.in/Images/logo.png',
          description: receipt,
          order_id: orderId,
          prefill: {
              name: `${props.auth.user.email}`,
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
                transactionamount: amount,
            }
            Inertia.post("/razorpaypayment",
        {
            orderId:orderId,
            amount: amount,
            razorpay_order_id:values.razorpay_order_id,
            razorpay_payment_id:values.transactionid,
            describe:props.dev,
            price : amount,
            batchid : batch.id,
            recursive:recure,
            method:method,
        }
      )
    }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

}
    
 async function handleSubscribe(){
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
  
    if (orderId == undefined){
      
      Inertia.post("/checkorder",
      {
        data_amount: Math.round((props.price - props.discount.discount)/6),
        data_recursive:1,
        data_method: "monthly subscription",
        data_describe:props.dev,
        data_price : props.price ,
        data_discount: values.discount,
    });
    }
    
    

    const options = {
        key: razorpayId, // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: 'INR',
        name: props.dev,
       image:'https://vereda.co.in/Images/logo.png',
        description: receipt,
        order_id: orderId,
        prefill: {
            name: `${props.auth.user.email}`,
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
              transactionamount: amount,
          }
          Inertia.post("/razorpaypayment",
      {
          orderId:orderId,
          amount: amount,
          razorpay_order_id:values.razorpay_order_id,
          razorpay_payment_id:values.transactionid,
          describe:props.dev,
          recursive:recure,
          price : amount,
          data_method:method,
          batchid : batch.id,
      }
    )
  }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

 } 

  
    return(
        <>
           <AuthenticatedLayout
        auth={props.auth}
        plans={props.plans}
        errors={props.errors}
    >
        <Head title={ "Checkout - "+props.dev} />
     <div className="checkout">
         <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Join{" "+props.dev+" "} Batch</span>
                    <span className="badge badge-pill bg-primaries">{batch.id}</span>
                    </h4>
                    <ul className="list-group mb-3">
                    <li className="list-group-item d-block justify-content-between lh-condensed">
                        <div className="mb-3">
                        <h6 className="my-0">{props.dev}</h6>
                        <small className="text-muted">Brief description</small>
                        <p className="preview" dangerouslySetInnerHTML={createMarkup(props.describe)}></p>
                        </div>
                        <span className="text-muted w-100">Total Price</span>
                        <span className="text-muted float-right">INR {Math.floor(props.price - props.discount.discount).toLocaleString()}</span>
                    </li> 
                    {!orderId && 
                    <><h3 className="fw-bold fs-6 mt-3 ">Subscription : </h3>

                    <Col lg="12" md="12" sm="12" className="shadow flex-col flex items-center bg-white">
                            
                            <div  className="mt-4 pt-4" ><ApplicationLogo width={120}/></div>
                            <h5 className="fw-bold mt-3 text-color-gray ">Monthly Plan </h5>
                            <h4 className="ts-2 fw-bold">INR {Math.round((props.price - props.discount.discount)/6).toLocaleString()} / month </h4>
                            <p className="text-center p-3 mt-3">Your subscription begins today. if you decide to cancel before end of your subscription, your card wont be charged. We cant issue refunds once your card is charged.</p>
                            <button  className="bg-primaries rounded-full mb-3 text-white pl-4 pr-4 sm:rounded-full pt-2 pb-2" onClick={handleSubscribe} name="recursive" value="2"> Subscribe</button>
                        </Col> </>  }                 
                    {/** 
                    <li className="list-group-item justify-content-between">
                    <div className="mb-3">
                        <h6 className="my-0 fw-bold">No commitment. Cancel anytime</h6>
                        </div>
                        <span>6 Months Subscription</span>
                        <div className="float-right block">
                        <strong className="">7-Day Free Trial</strong> <br/>
                        <small className="text-muted">then INR {props.price}</small>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span></span>
                        
                    </li>*/}
                    </ul>
                  
                </div>

                <div className="col-md-8 order-md-1 flex-col flex items-center">
                    <div className="w-100  ">
                       {props.dev =="Full Stack Development Program" &&  <img src={Fullstack} />} 
                       { props.dev =="Flutter Development Program"  && <img src={Flutter} />}
                    </div>
                    {!orderId ?
                     <>
                    <h3 className="mb-2 mt-4 fs-5 fw-bold"> Discount code</h3>
                    <form className="needs-validation">            
                    <hr className="mb-4" />
                    <FormControl 
                    className="w-full"
                    name="discount"
                    value={values.discount}
                    placeholder="DASU232" 
                    onChange={HandleChange}
                    />
                    <button className="bg-primaries text-white p-2 mt-5 px-4 rounded-pill" value={6} onClick={displayRazorpay} type="button"> Instant Payment</button>
                    </form>
                    </> :  (method == "Instant payment" && 
                    <>
                    <h6 className="mt-4 fw-bold">method - {method}</h6>
                    <button className="bg-primaries text-white mt-2 px-4 p-2 rounded-pill" onClick={displayRazorpay} type="button"> Continue  INR {" "+Math.floor(amount).toLocaleString()}  </button>
                    </>) || (method == "monthly subscription" &&
                    
                    <>
                    <h6 className="mt-2 fw-bold">method - {method}</h6>
                    <button className="bg-primaries text-white mt-2 px-4 p-2 rounded-pill" onClick={handleSubscribe} type="button"> Continue  INR {" "+Math.floor(amount).toLocaleString()}  </button> </>) }
                </div>
                {flash.message && <p className="mt-3 text-center">{flash.message}</p>}
                </div>
            </div>
            </section>
         
        </div>
       
        </AuthenticatedLayout>
        </>
    )
}