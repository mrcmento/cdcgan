import React from 'react';

function Footer() {
    const flex = {display: "flex"}
    return (
        <footer style = {{display: "flex", flexDirection: "row"}}>
            <p><a style = {flex} href="https://www.linkedin.com/in/clemens-drauschke-ba98881b3/"
                  rel="noopener noreferrer" target="_blank" >LinkedIn</a> 
            </p>
            <p><a style = {flex} href="impressum">Impressum</a> </p>
        </footer>
    )
}

export default Footer