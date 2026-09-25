/* ISR with dynamic route */

// app/products/[id]/page.jsx

export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  const response = await fetch("https://api.example.com/products");

  const products = await response.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  const response = await fetch(`https://api.example.com/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();

  return (
    <div>
      <h1>{product.name}</h1>

      <p>Price: ₹{product.price}</p>

      <p>{product.description}</p>
    </div>
  );
}
