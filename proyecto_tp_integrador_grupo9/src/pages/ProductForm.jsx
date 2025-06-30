import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from '../redux/ProductsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditing = Boolean(id);

  const productToEdit = useSelector(state =>
    state.products.products.find(p => p.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    if (isEditing && productToEdit) {
      setFormData({
        title: productToEdit.title,
        price: productToEdit.price,
        description: productToEdit.description,
        category: productToEdit.category,
        image: productToEdit.image
      });
    }
  }, [isEditing, productToEdit]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isEditing) {
      dispatch(editProduct({ id: parseInt(id), ...formData }));
    } else {
      const newId = Date.now(); // id temporal único
      dispatch(addProduct({ id: newId, ...formData }));
    }

    navigate('/');
  };

  return (
    <Box maxWidth={500} mx="auto">
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Editar Producto' : 'Crear Producto'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Precio"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <TextField
          label="Descripción"
          name="description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Categoría"
          name="category"
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <TextField
          label="URL de Imagen"
          name="image"
          fullWidth
          margin="normal"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Guardar Cambios' : 'Crear'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;