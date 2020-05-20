import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
    return (
        <nav className="header">
            <ul>
                <Link to="/page1">
                    <li>Page1</li>
                </Link>
                <Link to="/page2">
                    <li>Page2</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;