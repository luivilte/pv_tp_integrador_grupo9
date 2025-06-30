import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Paper, Alert
} from '@mui/material';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { email, password, confirmPassword } = form;

    // Validaciones
    if (!email.includes('@')) return setError('Correo inválido');
    if (password.length < 6) return setError('Contraseña muy corta');
    if (password !== confirmPassword) return setError('Las contraseñas no coinciden');

    // Guardar usuario en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
      return setError('Ese correo ya está registrado');
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess(true);

    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Registro de Usuario
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>¡Registrado con éxito! Redirigiendo...</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Registrarse
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;