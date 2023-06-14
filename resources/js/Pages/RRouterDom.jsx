import React from "react";
import "../../css/style.css";
import { Link } from '@inertiajs/inertia-react';



export function RouterDom(props){

    const {children}=(props);
    return(
        <div>    
        <div>
           {children}
        </div>
        </div>
    )
}