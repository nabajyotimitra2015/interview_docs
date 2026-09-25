import React, { useState, useCallback, useMemo } from "react";

const UserList = React.memo(({ users, onSelect }) => {
  console.log("UserList rendered");

  return (
    <div>
      {users.map((user) => (
        <button key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </button>
      ))}
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "David" },
    { id: 3, name: "Alex" },
  ];

  // useMemo: cache expensive calculation
  const filteredUsers = useMemo(() => {
    console.log("Filtering users");

    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  // useCallback: keep same function reference
  const handleSelect = useCallback((user) => {
    console.log("Selected:", user);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users"
      />

      <UserList users={filteredUsers} onSelect={handleSelect} />
    </div>
  );
}

export default App;
