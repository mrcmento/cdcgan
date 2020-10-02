import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselComponent(props){
    return ( 
        <div className="shoecarousel">
            <Carousel onChange={(selectedItem) => {props.handleClick(selectedItem); }}
                    showArrows={true} showStatus={false}
                    showThumbs={true}
                    showIndicators={false}
                    selectedItem={0}
                    swipeable={true}>
                {props.content.map((d) => <div key={d}> <img src={d} /></div>)}    
            </Carousel>
        </div> 
    );
}

export default CarouselComponent


