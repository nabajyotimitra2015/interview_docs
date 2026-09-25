/*
app/
├── page.tsx
├── about/
│   └── page.tsx
├── users/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── layout.tsx
├── loading.tsx
└── error.tsx

*/
// app/users/page.tsx

export default async function Users() {
  const res = await fetch("https://api.example.com/users");
  const users = await res.json();

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
