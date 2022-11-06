import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { Footer, Name, Price, ProductCartContainer } from './product-card.styles'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}€</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  )
}

export default ProductCard