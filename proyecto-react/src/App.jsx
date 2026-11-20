import { Routes, Route } from 'react-router-dom';
import Nav from './components/layouts/Nav';
import Footer from './components/layouts/Footer';
import Layout from './components/layouts/Layout';
import LayoutContacto from './components/layouts/LayoutContacto';
import DetalleProducto from './pages/DetalleProducto';
import LayoutCarrito from './components/layouts/LayoutCarrito';
import Favoritos from './pages/Favoritos';
import Productos from './components/products/Productos';
import Categorias from './pages/Categorias';
import Panel from './pages/Panel';
import Login from './pages/Login';
import Registro from './pages/Registro';
import RutaProtegida from './components/products/RutaProtegida';
import MerchListContainer from './components/products/MerchListContainer';
import DetalleMerch from './pages/DetalleMerch';
import './App.css';

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/productos" element={<MerchListContainer />} />
        <Route path="/productos/:id" element={<DetalleMerch />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/contacto" element={<LayoutContacto />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/juegos" element={<Productos />} />
        <Route path="/carrito" element={<LayoutCarrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/favoritos" element={<Favoritos />} />

        <Route
          path="/panel"
          element={
            <RutaProtegida rolesPermitidos={['admin']}>
              <Panel />
            </RutaProtegida>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;