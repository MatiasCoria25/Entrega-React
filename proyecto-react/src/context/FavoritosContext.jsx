/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const FavoritosContext = createContext();

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarFavorito = (producto) => {
    setFavoritos(prev => {
      if (prev.some(item => item.id === producto.id)) return prev;
      return [...prev, producto];
    });
  };

  const eliminarFavorito = (id) => {
    setFavoritos(prev => prev.filter(item => item.id !== id));
  };

  const cantidadFavoritos = favoritos.length;

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, eliminarFavorito, cantidadFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};