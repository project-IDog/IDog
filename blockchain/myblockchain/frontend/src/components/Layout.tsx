import React from "react";
import { Link } from "react-router-dom";

const Layout = ({children} : any) => {
    console.log(children);
    return (
        <div>
            <div>
                <Link to="/">
                    <button>Main</button>
                </Link>
                <Link to="my-animal">
                    <button>My-Animal</button>
                </Link>
            </div>
            <div>-----------------------------------------------------------------------------------</div>
            <div>{children}</div>
        </div>
    )
};

export default Layout;