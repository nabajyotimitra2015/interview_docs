/*
generateStaticParams() in Next.js

generateStaticParams() is a Next.js App Router function used with dynamic routes to pre-generate static pages at build time.

It is mainly used for SSG (Static Site Generation) with dynamic routes.
-----------------------------------------------------------------------

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <h1>Product {id}</h1>;
}

Real-world example

Imagine an e-commerce application with:
/products/iphone-17
/products/macbook-pro
/products/airpods

We can fetch the product IDs:

export async function generateStaticParams() {
  const products = await fetch(
    "https://api.example.com/products"
  ).then((res) => res.json());

  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
}

generateStaticParams() vs getStaticPaths()

| Pages Router              | App Router                   |
| ------------------------- | ---------------------------- |
| `getStaticPaths()`        | `generateStaticParams()`     |
| `getStaticProps()`        | Server Component / `fetch()` |
| `pages/products/[id].tsx` | `app/products/[id]/page.tsx` |


generateStaticParams() with ISR - We can also use generateStaticParams() with ISR (Incremental Static Regeneration) by returning a revalidate property in the returned object.

export async function generateStaticParams() {
  const products = await fetch(
    "https://api.example.com/products"
  ).then((res) => res.json());

  return products.map((product: { id: string }) => ({
    id: product.id,
    revalidate: 60, // Revalidate every 60 seconds
  }));
}

INTERVIEW READY ANSWER:
generateStaticParams() is a Next.js App Router function used with dynamic routes to generate static pages at build time. For example, for /products/[id], it can return product IDs like {id: "1"} and {id: "2"}, allowing Next.js to pre-render those pages. It is basically the App Router equivalent of getStaticPaths() from the Pages Router.

*/
