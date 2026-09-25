// CSR with Dynamic Route
// pages/products/[id].jsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();

  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    async function fetchProduct() {
      const response = await fetch(`/api/products/${id}`);

      const data = await response.json();

      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [router.isReady, id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
