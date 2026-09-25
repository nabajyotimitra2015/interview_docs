/*
1. How do you create protected routes?

I create protected routes by validating the user's authentication on the server. I can use Next.js Proxy to perform an early check for protected URL patterns and redirect unauthenticated users to the login page. For actual security, I also validate the session and permissions on the server or API layer, because client-side route protection alone is not secure. For role-based access, I check the user's role or permissions before allowing access.

2. How do you access query-string/search parameters?

I can access query-string/search parameters in Next.js using the `useSearchParams` hook from `next/navigation`. This hook allows me to read the current URL's search parameters and retrieve their values. For example, I can use `const searchParams = useSearchParams();` and then get a specific parameter with `searchParams.get('paramName')`. This is useful for filtering or passing data through the URL.

3. How do we secure a next js app?

To secure a Next.js app, I implement several best practices:
- Use HTTPS to encrypt data in transit.
- Implement authentication and authorization, using libraries like NextAuth.js or custom JWT-based solutions.
- Validate and sanitize user input to prevent XSS and SQL injection attacks.
- Use environment variables for sensitive information and avoid exposing secrets in the client-side code.
- Implement rate limiting and monitoring to protect against brute-force attacks.
- Keep dependencies up to date to patch known vulnerabilities.

4. How do you implement role-based access control (RBAC) in Next.js(point by point)?

- Define roles and permissions for different user types.
- Create a middleware or server-side logic that checks the user's role before granting access to specific routes or components.
- Use a higher-order component (HOC) or a custom hook that checks the user's role and conditionally renders content based on their permissions.
- Store role information in the user's session or JWT token for easy access during requests.

5. How do you use params and searchParams?

With the `use()` hook:
- I can use the `useParams` hook from `next/navigation` to access route parameters. For example, `const params = useParams();` allows me to retrieve dynamic segments of the URL in CSR.
- For search parameters, I can use the `useSearchParams` hook as mentioned earlier.
*/
"use client";

import { use } from "react";

export default function ProductDetails({ params, searchParams }) {
  const { id } = use(params);
  const { category } = use(searchParams);

  return (
    <div>
      <h1>Product ID: {id}</h1>
      <p>Category: {category}</p>
    </div>
  );
}
/*
Without the `use()` hook:
- I can access route parameters and search parameters directly in server-side functions like `getServerSideProps` or `getStaticProps`. The context object passed to these functions contains the `params` and `query` properties, which I can use to retrieve the necessary values.
*/
export default async function ProductPage({ params, searchParams }) {
  const { id } = await params;
  const { category } = await searchParams;

  return (
    <div>
      <h1>Product ID: {id}</h1>
      <p>Category: {category}</p>
    </div>
  );
}
/*

*/
