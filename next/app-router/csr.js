/* 
In Next.js App Router, components are Server Components by default. 

For CSR, I use a Client Component with "use client" and fetch data from the browser, commonly using useEffect, React Query, or SWR. 
I prefer keeping the page as a Server Component and moving only the interactive or client-side data-fetching portion into a Client Component. 
This reduces the client JavaScript bundle while still allowing CSR where it is actually needed.
*/

"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
