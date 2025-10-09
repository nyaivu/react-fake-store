import { Link } from "react-router";
import ProductItem from "../components/ProductItem";
import { productsData } from "../data";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./../api/fakeStoreApi";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
