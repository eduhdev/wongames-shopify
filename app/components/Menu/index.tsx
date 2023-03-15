import {type EnhancedMenu} from '~/lib/utils';
import {Suspense, useState} from 'react';
import {Await, useMatches} from '@remix-run/react';

import {RiMenuFill} from 'react-icons/ri';
import {Logo, Link, CartIcon, useDrawer, Drawer, Cart} from '~/components';
import {RiAccountCircleLine} from 'react-icons/ri';

type MenuProps = {
  menu: EnhancedMenu;
};

type MenuListProps = {
  mob?: boolean;
} & MenuProps;

const MenuList = ({menu, mob}: MenuListProps) => (
  <ul
    className={`flex ${
      mob ? 'flex-col gap-4 items-center justify-center' : 'gap-6'
    }`}
  >
    {(menu?.items || []).map((item) => (
      <li key={item.id}>
        <Link
          to={item.to}
          target={item.target}
          prefetch="intent"
          className={({isActive}) => (isActive ? 'text-gray-500' : '')}
        >
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);

export const Menu = ({menu}: MenuProps) => {
  const [root] = useMatches();
  const {openDrawer: openCart, isOpen, closeDrawer: closeCart} = useDrawer();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <menu className="border-b py-4 px-4 md:px-6 flex items-center justify-between">
        <div className="md:hidden">
          <RiMenuFill
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
            size={24}
          />
        </div>
        <div className="">
          <a href="/">
            <Logo />
          </a>
        </div>

        <nav className="hidden md:flex">
          <MenuList menu={menu} />
        </nav>

        <div className="flex items-center gap-2 md:gap-5">
          <Suspense fallback={<CartIcon quantity={0} openCart={openCart} />}>
            <Await resolve={root.data?.cart}>
              {(cart) => (
                <CartIcon
                  quantity={cart?.totalQuantity || 0}
                  openCart={openCart}
                />
              )}
            </Await>
          </Suspense>
          <Link to="/account">
            <button className="hidden md:block">Sign In</button>
            <RiAccountCircleLine size={24} className="md:hidden" />
          </Link>
        </div>

        <Drawer
          open={isOpen}
          onClose={closeCart}
          heading="Cart"
          openFrom="right"
        >
          <div className="grid">
            <Suspense fallback={<p>Loading...</p>}>
              <Await resolve={root.data?.cart}>
                {(cart) => (
                  <Cart layout="drawer" onClose={closeCart} cart={cart} />
                )}
              </Await>
            </Suspense>
          </div>
        </Drawer>
      </menu>

      <Drawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        heading="Menu"
        openFrom="left"
      >
        <nav className="flex h-full justify-center">
          <MenuList menu={menu} mob />
        </nav>
      </Drawer>
    </header>
  );
};
