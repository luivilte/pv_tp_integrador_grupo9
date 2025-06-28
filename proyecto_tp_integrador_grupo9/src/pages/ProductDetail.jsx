import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, IconButton, CardMedia, Button, CircularProgress } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toggleFavorite } from '../redux/favoritesSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const status = useSelector(state => state.products.status);
  const product = useSelector(state =>
    state.products.products.find(p => p.id === parseInt(id))
  );
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.includes(parseInt(id));

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(parseInt(id)));
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography color="error" mt={4} textAlign="center">
        Producto no encontrado.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ maxWidth: 300, objectFit: 'contain', border: '1px solid #ddd' }}
        />

        <Box>
          <Typography variant="h6" gutterBottom>
            Categoría: {product.category}
          </Typography>
          <Typography variant="h6" color="primary">
            Precio: ${product.price}
          </Typography>
          <Typography variant="body1" my={2}>
            {product.description}
          </Typography>

          <IconButton onClick={handleToggleFavorite} color="secondary">
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            href="/"
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
