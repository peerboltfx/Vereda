import React from 'react';
import { usePage, Link } from '@inertiajs/inertia-react';
import Calendar from 'reactjs-availability-calendar';


import "../../../css/style.css";
import "../../../css/main.css";


export function CalenderPart(props){
  const {plans, batch} = usePage().props;
  const bookings = [
    {
      from: new Date(`${batch.starts}`),
      to: new Date(`${batch.ends}`),
    }
  ]
 
    return(
        <>
          <Calendar
           bookings={bookings}/>
        </>
    )
}