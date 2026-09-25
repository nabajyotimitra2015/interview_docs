// pages/products/[id].jsx

export async function getStaticProps({ params }) {
  const response = await fetch(`https://api.example.com/products/${params.id}`);

  const product = await response.json();

  return {
    props: {
      product,
    },
    revalidate: 3600, // 1 hour
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "101" } }, { params: { id: "102" } }],
    fallback: "blocking",
    // fallback: "blocking" - This is especially useful when you have thousands or millions of dynamic pages.
    // fallback: "false" - This is useful when you have a small number of dynamic pages and you want to pre-render all of them at build time.
  };
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
