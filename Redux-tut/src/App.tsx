import React from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { increment, decrement } from "./redux/slices/counter";
import { addToCart, removeFromCart, clearCart } from "./redux/slices/cart";
import { toggleTheme } from "./redux/slices/theme";
import "./App.css";

interface Product {
  id: number;
  name: string;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mobile", price: 499 },
  { id: 3, name: "Tablet", price: 299 },
];

const ProductButton = ({
  product,
  onAdd,
  className,
}: {
  product: Product;
  onAdd: (p: Product) => void;
  className?: string;
}) => (
  <button
    className={className ?? "productButton"}
    onClick={() => onAdd(product)}
  >
    {`Add ${product.name}`}
  </button>
);

const CartItem = ({
  item,
  onRemove,
}: {
  item: Product;
  onRemove: (id: number) => void;
}) => (
  <li className="cartItem" key={item.id}>
    <span>
      {item.name} (${item.price})
    </span>
    <button className="removeButton" onClick={() => onRemove(item.id)}>
      Remove
    </button>
  </li>
);

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter);
  const cart = useAppSelector((state) => state.cart);
  const theme = useAppSelector((state) => state.theme);

  const handleAddProduct = React.useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return (
    <div className={`container ${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="heading">Theme: {theme}</h1>
      <button className="toggleButton" onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>

      <hr className="divider" />

      <h1 className="heading">Count is {count}</h1>
      <div className="counterButtons">
        <button className="actionButton" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button className="actionButton" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>

      <hr className="divider" />

      <h2 className="heading">Cart</h2>
      <div className="productButtonsContainer">
        {PRODUCTS.map((product) => (
          <ProductButton
            key={product.id}
            product={product}
            onAdd={handleAddProduct}
          />
        ))}
        <button
          className="productButton clearCartButton"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="emptyCartText">No items in cart</p>
      ) : (
        <ul className="cartList">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={(id) => dispatch(removeFromCart(id))}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
