import React from "react";
import {Link} from "react-router-dom";

function NavBar () {
    return (
        <center>
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Department">Department tables</Link></li>
                <li><Link to="/Employee">Employee tables</Link></li>
            </ul>
        </center>
    );
};

export default NavBar;