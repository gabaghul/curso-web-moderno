import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <Link to={props.link}>
        <i className={`fa fa-${props.icon}`}><span> {props.label}</span></i>
    </Link>