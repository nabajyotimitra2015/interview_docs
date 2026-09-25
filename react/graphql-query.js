// 1. GraphQL server Schema:
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  users: [User!]!
}

// Resolver
const users = [
  { id: "1", name: "John", email: "john@test.com" },
  { id: "2", name: "David", email: "david@test.com" }
];

const resolvers = {
  Query: {
    users: () => users
  }
};

// 2. Install Apollo Client
npm install @apollo/client graphql

// 3. Create Apollo Client -> appolo.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

export default client;

// 4. Provide Apollo Client to React -> main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import client from "./apollo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// 5. Write a GraphQL query
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

// 6. Use useQuery
function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data.users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;

