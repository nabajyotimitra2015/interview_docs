/*
How do we call a third-party external API in Next.js with example?

For a third-party API in Next.js, I prefer making the call from the server when authentication or API keys are involved. I keep the key in a server-only environment variable and call the third-party API from a Server Component, server utility, or Route Handler. If a Client Component needs the data, I expose a Next.js Route Handler as a BFF and let the client call my /api endpoint. This keeps secrets out of the browser and also gives me a place to handle authentication, caching, rate limiting, error handling, and response transformation.

Example: Calling a third-party API from a Next.js Route Handler
// app/api/external-data/route.ts
*/
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.THIRD_PARTY_API_KEY; // Keep the key in a server-only environment variable
  const response = await fetch("https://api.thirdparty.com/data", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
/*
In this example, I call a third-party API from a Next.js Route Handler. The API key is kept in an environment variable and never exposed to the client. If a Client Component needs this data, it can call my /api/external-data endpoint, which acts as a BFF (Backend for Frontend).

Now use it inside the Client Component like this:
// app/components/ExternalDataComponent.tsx
*/

("use client");

import { useEffect, useState } from "react";

export default function ExternalDataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/external-data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching external data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>External Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

/*
NOW POST CALL

*/
import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.THIRD_PARTY_API_KEY; // Keep the key in a server-only environment variable
  const response = await fetch("https://api.thirdparty.com/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ key: "value" }), // Replace with your actual request body
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to post data" },
      { status: 500 },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

/*
NOW INSIDE THE CLIENT COMPONENT LIKE THIS:
*/
"use client";

import { useState } from "react";

export default function PostDataComponent() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePostData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/external-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "value" }), // Replace with your actual request body
      });

      if (!res.ok) {
        throw new Error("Failed to post data");
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error posting external data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Post Data to External API</h1>
      <button onClick={handlePostData} disabled={loading}>
        {loading ? "Posting..." : "Post Data"}
      </button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}