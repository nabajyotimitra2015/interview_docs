// pages/products/[id].tsx

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`https://api.example.com/products/${params.id}`);

  const product = await response.json();

  return {
    props: {
      product,
    },
  };
}

export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
}
