import Nav from "./Nav";
import ItemListContainer from "../products/ItemListContainer";
import Newsletter from "../Newsletter";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Nav/>
            <main>
                <Outlet/>
                <ItemListContainer />
                <Newsletter />
            </main>
        </div>
    );
};

export default Layout;