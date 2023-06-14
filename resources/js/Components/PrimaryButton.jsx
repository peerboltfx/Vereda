
import React from 'react';
import "../../css/style.css";
import { Button } from 'react-bootstrap';

export default function PrimaryButton({ type = 'submit',value, className = '', processing, children,style }) {
    return (

        <button
            type={type}
            value={value}
            style={style}
            className={
                `bg-primaries mb-5 full-width-btn sm:rounded-full pt-2 pb-2 text-color-white tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
