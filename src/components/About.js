import React from 'react'
import ReactPlayer from 'react-player'

function About() {
    return(
        <div> 
            <h1>cDCGAN training on 50k pictures of shoes</h1>
            <div className='player-wrapper'>
                <ReactPlayer className='react-player'
                    url="https://youtu.be/LEE3OhAR818"
                    playing
                    loop
                    muted
                    controls
                    width='100%'
                    height='100%'
                />
            </div>
            <div>
                <a style = {{paddingTop: "1.25rem"}}href="http://vision.cs.utexas.edu/projects/finegrained/utzap50k/" rel="noopener noreferrer" target="_blank" >Dataset provided by UT Zappos</a>
                <p className='description' >
                A Generative Adversarial Network boils down to two opponents trying to outsmart each other.
                One opponent tries to generate an authentic looking image and the other tries to tell if it is fake or real.
                The counterfeiter in this game learns what works and what doesn't while the inspector becomes better at detecting fakes. 
                In the beginning the fakes do not look convincing at all. The opponents improve over time.
                After training you can use the "forger" to generate new pictures. </p>
            </div>
        </div>
    )
}

export default About