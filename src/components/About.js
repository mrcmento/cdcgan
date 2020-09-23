import React from 'react'
import ReactPlayer from "react-player"

function About() {
    return(
        <div className="box">
            <div className="youtubevid">    
                <h1>cDCGAN training on 50k pictures of shoes</h1>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=WIUlsgZSRCY&feature=youtu.be&ab_channel=MrCmento"
                    playing
                    loop
                    muted
                    controls
                />
                <a href="http://vision.cs.utexas.edu/projects/finegrained/utzap50k/" rel="noopener noreferrer" target="_blank" >Dataset provided by UT Zappos</a>
            </div>
            <p className='description' >A Generative Adversarial Network boils down to two opponents trying to outsmart each other. One tries to generate an authentic looking image and the other network tries to tell if it is fake or real.
            The counterfeiter in this game learns what works and what doesn't and the discriminator also becomes better and better at detecting fakes.
            In the beginning the fakes do not look convincing at all. The nets improve over time. At the end you can use the "forger" to create new pictures. </p>
        </div>
    )
}

export default About