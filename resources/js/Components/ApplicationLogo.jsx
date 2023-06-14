import React from 'react';
import Logo from "@/assets/Images/logo.png";

export default function ApplicationLogo({ className, width }) {
    return (
        <img src={Logo} width={width} alt={Logo} />
    );
}
