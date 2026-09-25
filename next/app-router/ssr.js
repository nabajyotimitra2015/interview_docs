/*
app/
└── users/
    └── page.jsx


In the Next.js App Router, Server Components are the default, so for SSR I don't need "use client". 
I can make the component async and fetch the required data on the server. 
If the data must be fresh on every request, I can use cache: "no-store" or dynamic = "force-dynamic". 
Next.js then generates the initial HTML on the server and sends it to the browser. 
This is useful for SEO-sensitive pages and request-specific or frequently changing data.
*/

export default async function UsersPage() {
  const response = await fetch("https://api.example.com/users", {
    cache: "no-store",
  });

  const users = await response.json();

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
