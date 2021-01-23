import React from 'react'
import { Spin } from "antd";

const Loader =()=> {
    return (
        <div className = "loader">
            <Spin className = "spin" size = "large"/>  
        </div>
    )
}
export default Loader;