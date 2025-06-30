import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/ProductsSlice';
import ProductList from '../components/ProductList';
import { Typography, CircularProgress, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  } else if (status === 'succeeded') {
    content = <ProductList products={products} />;
  } else if (status === 'failed') {
    content = <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <Typography variant="h4">Listado de Productos</Typography>
        
      </Box>
      {content}
    </Box>
  );
};

export default Home;