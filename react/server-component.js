/*
What is SSR in React?
SSR means Server-Side Rendering.
 - The React app is rendered on the server into HTML before it is sent to the browser.
 - The browser receives a fully formed HTML page instead of an empty div and JS bundle only.
 - This improves:
    - initial load performance
    - SEO
How it works
 - Server fetches data
 - Server renders React components using ReactDOMServer.renderToString()
 - Server sends HTML to the client
 - Client JavaScript later hydrates that HTML into a live React app

React Server Components are React components that execute on the server instead of the browser.

The main benefit is that I can fetch data directly on the server, access server-side resources, and avoid sending unnecessary JavaScript and dependencies to the browser.

In an React Server Components application, components are Server Components by default. I use a Client Component only when I need browser-side interactivity such as useState, useEffect, event handlers, or browser APIs. I mark that component with "use client".

For example, I could have a server component that fetches products directly from a database:
*/

// ProductList.jsx
import db from "./db";
import AddToCart from "./AddToCart";

export default async function ProductList() {
  const products = await db.products.getAll();
  return (
    <div>
      {" "}
      {products.map((product) => (
        <div key={product.id}>
          {" "}
          <h3>{product.name}</h3> <p>${product.price}</p>{" "}
          <AddToCart productId={product.id} />{" "}
        </div>
      ))}{" "}
    </div>
  );
}

/*
Here, ProductList is a Server Component. It can be asynchronous and fetch data directly on the server.

If I need interactivity, I move only that part into a Client Component:
*/

"use client"; 

import { useState } from "react"; 

export default function AddToCart({ productId }) { 
  const [loading, setLoading] = useState(false); 

  const handleClick = async () => { 
    setLoading(true); 
    
    // call API / Server Function 
    console.log("Adding product:", productId); 
    setLoading(false); 
  }; 

  return ( 
    <button onClick={handleClick} disabled={loading}> {loading ? "Adding..." : "Add to Cart"} </button> 
  ); 
}
