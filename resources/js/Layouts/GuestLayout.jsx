import React from 'react';

export default function Guest({ children }) {
    return (
        
        <div className='flex header-block' style={{width:'100%'}}>
                {children}
        </div>
    );
}
