
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { Favorite, FavoriteBorder, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.includes(product.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          <IconButton onClick={handleToggleFavorite} color="secondary">
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Button
            size="small"
            component={Link}
            to={/producto/${product.id}}
          >
            Ver más
          </Button>
        </Box>

        <Button
          size="small"
          variant="outlined"
          startIcon={<Edit />}
          component={Link}
          to={/editar/${product.id}}
        >
          Editar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;