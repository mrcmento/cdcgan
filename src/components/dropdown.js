import React from 'react'

function DropDown(props) {
    const classes = [{ name: 'Ankle Boot', id: 0 },
                     { name: 'Boat Shoe', id: 1 },
                     { name: 'Clog / Mule', id: 2 },
                     { name: 'Flat', id: 3 },
                     { name: 'High Heel', id: 4 },
                     { name: 'Knee High Boot', id: 5 },
                     { name: 'Loafer', id: 6 },
                     { name: 'Mid Calf Boot', id: 7 },
                     { name: 'Oxford', id: 8 },
                     { name: 'Sandal', id: 9 }, 
                     { name: 'Slipper', id: 10 },
                     { name: 'Sneaker', id: 11 }]
    return (
        <div>
            <select defaultValue={props.currentClass} onChange={(event) => props.handleChange(parseInt(event.target.value))}>
                {classes.map((d) => <option key={d.id} value={d.id} >{d.name}</option>)}
            </select>
        </div>
    );
}

export default DropDown;