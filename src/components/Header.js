import React from 'react'

function Header() {
    return(
        <header>
            <div className = "header-left">
                <img src='tes.png' className="header-logo"/>
                <p><font className='slogan'>Turning ideas into insights</font></p>
            </div>
            <nav className="header-right">
                <a className="active" href="home">Home</a>
                <a href="about">About</a>
            </nav>
        </header>
    )
}

export default Header