import React from 'react'

function Background() {
    return(
        <div>
            <div className="waveWrapper waveAnimation">
            <div className="waveWrapperInner bgTop">
                <div className="wave waveTop" style={{backgroundImage: 'url(wave-top.png)'}}></div>
            </div>
            <div className="waveWrapperInner bgMiddle">
                <div className="wave waveMiddle" style={{backgroundImage: 'url(wave-mid.png)'}}></div>
            </div>
            <div className="waveWrapperInner bgBottom">
                <div className="wave waveBottom" style={{backgroundImage : 'url(wave-bot.png)'}}></div>
            </div>
            </div>
        </div>
    )
}

export default Background