import {Link} from '~/components';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {RiShoppingCart2Line} from 'react-icons/ri';

type CartIconProps = {
  quantity: number;
  openCart: () => void;
};

export const CartIcon = ({quantity, openCart}: CartIconProps) => {
  const isHydrated = useIsHydrated();

  return (
    <div>
      {quantity > 0 && <span aria-label="Cart Items">{quantity}</span>}
      {isHydrated ? (
        <button onClick={openCart}>
          <RiShoppingCart2Line size={24} aria-label="Shopping Cart" />
        </button>
      ) : (
        <Link to="/cart">
          <RiShoppingCart2Line size={24} aria-label="Shopping Cart" />
        </Link>
      )}
    </div>
  );
};
