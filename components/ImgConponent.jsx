import React from 'react';

const ImagesComponent = ({ turn }) => {
  // Determinar qué imagen mostrar según el valor de turn (TURNS.X o TURNS.O)
  const imageName = turn === 'X' ? 'x' : 'o';

  const imagePath = `/src/assets/${imageName}.png`;

  return <img src={imagePath} style={{ width: 50, height:50 }} alt={`Imagen ${turn}`} />;
};

export default ImagesComponent;
