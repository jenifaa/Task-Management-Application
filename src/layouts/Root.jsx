import { Outlet } from "react-router";


const Root = () => {
    return (
        <div>
            <h2>Rooot</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;