import { Link } from "react-router";
import { productsData } from "../data";
import { useCartStore } from "../stores/useCartStore";
import { formatCurrency } from "./../utils/formatCurrency";

const ProductItem = ({ product }) => {
  // add this
  const addCart = useCartStore((state) => state.addCart);
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="flex flex-col items-start gap-2 border rounded-lg p-4 shadow hover:shadow-lg transition-all">
      <Link to={`/product/${product.id}`} state={product}>
        <img
          src={product.image}
          className="w-auto h-48 justify-self-center"
          width={200}
          height={200}
        />
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-gray-600">{product.category_name}</p>
        <p className="text-gray-600">
          {formatCurrency(product.price, "USD", "us-US")}
        </p>
      </Link>
      <button
        onClick={() =>
          addCart({
            ...product,
            price: product.price,
            quantity: 1,
          })
        }
        className="bg-blue-600 rounded-md text-white px-2 py-1 hover:underline mt-2 block"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
