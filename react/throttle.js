// Throttle: execute at most once within a specified time interval.
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
const handleScroll = throttle(() => {
  console.log("Scroll event");
}, 1000);

/* Why apply(this, args)?

It preserves:

1. The original this context.
2. All arguments passed to the throttled function.

*/

// Pagination & Throttling & Infinite scroll

import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 10;

function UsersInfiniteScroll() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const throttleRef = useRef(false);

  // Fetch one page
  const fetchUsers = useCallback(async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${pageNumber}&_limit=${PAGE_SIZE}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // If API returns fewer records, we reached the last page
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }

      setUsers((previousUsers) => [...previousUsers, ...data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial API call
  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  // Load next page
  const loadNextPage = useCallback(() => {
    if (loading || !hasMore) {
      return;
    }

    setPage((previousPage) => {
      const nextPage = previousPage + 1;

      fetchUsers(nextPage);

      return nextPage;
    });
  }, [loading, hasMore, fetchUsers]);

  // Throttled scroll handler
  useEffect(() => {
    const handleScroll = () => {
      // Ignore events during throttle period
      if (throttleRef.current) {
        return;
      }

      throttleRef.current = true;

      setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // User is within 300px of bottom
        if (scrollTop + windowHeight >= documentHeight - 300) {
          loadNextPage();
        }

        throttleRef.current = false;
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadNextPage]);

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
        </div>
      ))}

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!hasMore && <p>No more users</p>}
    </div>
  );
}

export default UsersInfiniteScroll;
