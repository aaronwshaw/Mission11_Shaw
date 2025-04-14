import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      quantity,
      price: Number(price),
      subtotal: quantity * Number(price), // Calculate subtotal
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>{title}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter the Quantity"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyPage;
