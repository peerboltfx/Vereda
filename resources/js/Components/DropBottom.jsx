import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const {title, children} = props;

  return (
    <>
     
       
      <Offcanvas {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}