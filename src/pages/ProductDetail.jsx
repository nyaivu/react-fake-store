import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { getProductByID } from "../api/fakeStoreApi";
import { useQuery } from "@tanstack/react-query";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`product-${id}`],
    queryFn: () => getProductByID(id),
  });
  const location = useLocation();
  // const product = location.state;
  // const product = data;
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  // Handle submit review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    // Membuat objek review baru
    const newReview = {
      id: Date.now(),
      rating,
      review,
    };
    // Menambahkan review baru ke daftar reviews
    setReviews([...reviews, newReview]);
    setRating(0);
    setReview("");
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex gap-6">
      <section className="flex-4 gap-6">
        <div className="border rounded-lg p-4 shadow hover:shadow-lg">
          <button
            className="flex flex-row gap-1 items-center"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Back
          </button>
          <img src={data?.image} width={200} height={200} />
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <p className="mt-4">{formatCurrency(data?.price, "USD", "us-US")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">User Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {/* Menampilkan bintang sesuai rating */}
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                    {[...Array(5 - r.rating)].map((_, i) => (
                      <span key={i} className="text-gray-300">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="border rounded-lg p-4 shadow hover:shadow-lg flex-1">
        <h2 className="text-xl font-semibold mt-6">Reviews</h2>
        {/* Form Rating & Review */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Rating:</label>
            <div className="flex gap-2">
              {/* Menampilkan 5 bintang untuk rating */}
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Review:</label>
            {/* Textarea untuk review */}
            <textarea
              value={review}
              // Menampilkan textarea untuk review
              onChange={(e) => setReview(e.target.value)}
              className="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Tulis pengalaman Anda..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-
blue-600"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProductDetail;
