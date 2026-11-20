import Nav from "./Nav";
import Carrito from "../../pages/Carrito";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Nav/>
            <main>
                <Outlet/>
                <Carrito />
            </main>
        </div>
    );
};

export default Layout;