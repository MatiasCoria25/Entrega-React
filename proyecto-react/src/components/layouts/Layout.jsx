import Header from "./Header";
import ItemListContainer from "../products/ItemListContainer";
import Genero from "../Genero";
import Reseñas from "../Reseñas";
import Newsletter from "../Newsletter";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Header/>
            <main>
                <Outlet/>
                <h1 class="h1">Arcadia</h1>
                <h3 class="h3">Donde las leyendas nunca pasan de nivel</h3>
                <ItemListContainer />
                <Genero />
                <Reseñas />
                <Newsletter />
            </main>
        </div>
    );
};

export default Layout;