import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const { items, favorites } = useSelector(state => state.products);
  const favProducts = items.filter(p => favorites.includes(p.id));

  return (
    <div>
      <h2>Favoritos</h2>
      {favProducts.length === 0 ? <p>No hay favoritos.</p> :
        favProducts.map(p => <ProductCard key={p.id} product={p} />)
      }
    </div>
  );
}

export default Favorites;
