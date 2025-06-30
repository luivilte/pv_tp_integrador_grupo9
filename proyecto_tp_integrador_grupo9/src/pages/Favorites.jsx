import React from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../components/ProductList';
import { Typography, Box } from '@mui/material';

const Favorites = () => {
  const allProducts = useSelector(state => state.products.products);
  const favorites = useSelector(state => state.favorites.favorites);

  const favoriteProducts = allProducts.filter(product => favorites.includes(product.id));

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Favoritos
      </Typography>

      {favoriteProducts.length > 0 ? (
        <ProductList products={favoriteProducts} />
      ) : (
        <Typography variant="body1" color="text.secondary">
          No hay productos marcados como favoritos.
        </Typography>
      )}
    </Box>
  );
};

export default Favorites;