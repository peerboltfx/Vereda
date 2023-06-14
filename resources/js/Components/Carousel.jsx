import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
 
export function ControlledCarousel(props) {
    const {Item1, item2, item3} = props;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className='flex'>
       {Item1}     
      </Carousel.Item>
      <Carousel.Item  className='flex'>
       {item2}
      </Carousel.Item>
      
    </Carousel>
  );
}