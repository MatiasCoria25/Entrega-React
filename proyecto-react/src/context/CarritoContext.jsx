/* eslint-disable react-refresh/only-export-components */
/* cspell:disable */

import { useState, useContext, createContext } from 'react';

export const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarACarrito = ({ producto, cantidad = 1 }) => {
    setCarrito(carritoPrevio => {
      const itemEnCarrito = carritoPrevio.find(item => item.id === producto.id);

      if (itemEnCarrito) {
        return carritoPrevio.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...carritoPrevio, { ...producto, cantidad }];
      }
    });
  };

  
  const eliminarDelCarrito = (id) => {
    setCarrito(carritoPrevio => carritoPrevio.filter(item => item.id !== id));
  };

  
  const incrementarCantidad = (id) => {
    setCarrito(carritoPrevio =>
      carritoPrevio.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  
  const decrementarCantidad = (id) => {
    setCarrito(carritoPrevio =>
      carritoPrevio
        .map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const itemsEnCarrito = () => {
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  };

  const cobroTotal = () => {
    return carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);
  };

  return (
    <CarritoContext.Provider value={{ 
      carrito, 
      agregarACarrito, 
      eliminarDelCarrito,
      incrementarCantidad,
      decrementarCantidad,
      vaciarCarrito,
      itemsEnCarrito, 
      cobroTotal 
    }}>
      {children}
    </CarritoContext.Provider>
  );
};