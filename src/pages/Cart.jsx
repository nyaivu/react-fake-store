import { useShallow } from "zustand/shallow";
import { useCartStore } from "../stores/useCartStore";
import { formatCurrency } from "../utils/formatCurrency";

export default function Cart() {
  // Mengambil cart, updateQty, removeFromCart dari context useCart
  const { count, cart, addCart, removeCart } = useCartStore(
    useShallow((state) => ({
      count: state.count,
      cart: state.cart,
      addCart: state.addCart,
      removeCart: state.removeCart,
    }))
  );

  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // manually calculate total items
  const totalItems = count;
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <div className="p-6 text-center text-gray-600">Cart is empty</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {/* Menampilkan item di cart */}
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-md"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  {formatCurrency(item.price, "USD", "us-US")}
                </p>
              </div>
            </div>
            <div className="flex gap-x-2">
              <button onClick={() => removeCart(item.id)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => addCart(item)}>+</button>
            </div>
            <p> {formatCurrency(item.price * item.quantity, "USD", "us-US")}</p>
          </div>
        ))}
      </div>
      <div className="text-lg text-neutral-900 font-medium flex justify-between border-t border-dashed border-neutral-400 pt-2">
        <p>Total Items:</p>
        <p>{totalItems}</p>
      </div>
      <div className="text-lg text-neutral-900 font-medium flex justify-between">
        <p>Total Price:</p>
        <p> {formatCurrency(totalPrice, "USD", "us-US")}</p>
      </div>
    </div>
  );
}
