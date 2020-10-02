import React from 'react'

function Header() {
    return(
        <header>
            <div className = "header-left">
                <img src='tes.png' className="header-logo"/>
                <p className='slogan'>28-square</p>
            </div>
            <nav className="header-right">
                <a className="active" href="home">Home</a>
                <a href="about">About</a>
            </nav>
        </header>
    )
}

export default Header