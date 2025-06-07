import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { increment, decrement } from "./redux/slices/counter";
import { addToCart, removeFromCart, clearCart } from "./redux/slices/cart";
import { toggleTheme } from "./redux/slices/theme";

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter);
  const cart = useAppSelector((state) => state.cart);
  const theme = useAppSelector((state) => state.theme);

  const handleAddProduct = (product: {
    id: number;
    name: string;
    price: number;
  }) => {
    dispatch(addToCart(product));
  };

  return (
    <div
      style={{
        background: theme === "dark" ? "#222" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Theme: {theme}</h1>
      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>

      <hr />

      <h1>Count is {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <hr />

      <h2>Cart</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={() =>
            handleAddProduct({ id: 1, name: "Laptop", price: 999 })
          }
        >
          Add Laptop
        </button>
        <button
          onClick={() =>
            handleAddProduct({ id: 2, name: "Mobile", price: 499 })
          }
        >
          Add Mobile
        </button>
        <button
          onClick={() =>
            handleAddProduct({ id: 3, name: "Tablet", price: 299 })
          }
        >
          Add Tablet
        </button>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={`${item.id}-${Math.random()}`}>
              {item.name} (${item.price}){" "}
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
