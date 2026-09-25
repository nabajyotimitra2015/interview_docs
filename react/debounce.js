// Debounce: execute only after the event has stopped happening for a specified time.

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const searchUsers = debounce((query) => {
  console.log("API call:", query);
}, 500);

/* Why apply(this, args)?

It preserves:

1. The original this context.
2. All arguments passed to the debounced function.

*/

import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. API call
  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  // 2. Debouncing search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 3. Local filtering
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;







// FETCH WITH RETRY AND EXPONENTIAL BACKOFFS

import { useEffect, useState } from "react";

const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        // Retry only for transient server errors
        if (response.status >= 500) {
          throw new Error(`Server error: ${response.status}`);
        }

        // 4xx errors generally shouldn't be retried
        throw new Error(`Request failed: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      // Don't retry if request was cancelled
      if (error.name === "AbortError") {
        throw error;
      }

      if (attempt === retries) {
        throw error;
      }

      // 1s → 2s → 4s
      const delay = BASE_DELAY * Math.pow(2, attempt);

      console.log(
        `Retry ${attempt + 1}/${retries} after ${delay}ms`
      );

      await sleep(delay);

      attempt++;
    }
  }
}

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API call + retry
  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchWithRetry(
          "https://jsonplaceholder.typicode.com/users",
          {
            signal: controller.signal,
          }
        );

        setUsers(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();

    return () => {
      controller.abort();
    };
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // Local search
  const filteredUsers = users.filter((user) =>
    user.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
