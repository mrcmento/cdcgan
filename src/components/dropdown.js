import React from 'react'
import config from '../config'

function DropDown(props) {
    return (
        <div>
            <select defaultValue={props.currentClass} onChange={(event) => props.handleChange(parseInt(event.target.value))}>
                {config.modelMapping.map((d) => <option key={d.id} value={d.id} >{d.name}</option>)}
            </select>
        </div>
    );
}

export default DropDown;