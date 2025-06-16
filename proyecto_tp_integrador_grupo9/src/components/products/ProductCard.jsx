import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/productsSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => state.products.favorites.includes(product.id));

  return (
    <div style={{
      border: '1px solid #ccc',
      margin: '1rem',
      padding: '1rem',
      width: '200px',
    }}>
      <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <label>
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={() => dispatch(toggleFavorite(product.id))}
        />
        Favorito
      </label>
    </div>
  );
}

export default ProductCard;