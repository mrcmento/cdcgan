import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from 'react-loader-spinner';

function CarouselComponent(props){
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    return ( 
        <div>
            {props.loading ?  <Loader style = {style} type="Grid" color="#2BAD60" height="100" width="100" /> : 
                <div className="shoecarousel">
                    <Carousel onChange={(selectedItem) => {props.handleClick(selectedItem); }}
                            showArrows={true} showStatus={false}
                            showThumbs={true}
                            showIndicators={false}
                            selectedItem={2}
                            swipeable={true}>
                        {props.content.map((d) => <div key={d}> <img src={d} /></div>)}    
                    </Carousel>
                    <h2>Swipe through the endless gallery<br/>Every shoe is unique<br/>Guaranteed!</h2>
                </div>}
        </div>
    );
}

export default CarouselComponent


