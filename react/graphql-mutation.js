// Mutation example

// GraphQL schema SERVER:
type Mutation {
  createUser(name: String!, email: String!): User!
}

// Client mutation:
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Component code
import { useMutation } from "@apollo/client";

function CreateUser() {
  const [createUser, { loading }] = useMutation(CREATE_USER);

  const handleCreate = async () => {
    const result = await createUser({
      variables: {
        name: "John",
        email: "john@test.com"
      }
    });

    console.log(result.data.createUser);
  };

  return (
    <button onClick={handleCreate} disabled={loading}>
      Create User
    </button>
  );
}