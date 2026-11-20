import Nav from "./Nav";
import Newsletter from "../Newsletter";
import Contacto from "../../pages/Contacto";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Nav/>
            <main>
                <Outlet/>
                <Contacto />
                <Newsletter />
            </main>
        </div>
    );
};

export default Layout;