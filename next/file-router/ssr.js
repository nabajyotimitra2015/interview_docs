export async function getServerSideProps(context) {
  const { req } = context;

  const token = req.cookies.authToken;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await fetch("https://api.example.com/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await response.json();

  return {
    props: {
      user,
    },
  };
}

export default function Profile({ user }) {
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

/*
SSR vs SSG vs ISR in Pages Router

| Strategy        | Pages Router API                                       | When data is generated          |
| --------------- | ------------------------------------------------------ | ------------------------------- |
| **CSR**         | `useEffect()` / SWR                                    | Browser                         |
| **SSR**         | `getServerSideProps()`                                 | Every request                   |
| **SSG**         | `getStaticProps()`                                     | Build time                      |
| **ISR**         | `getStaticProps()` + `revalidate`                      | Build time + regeneration       |
| **Dynamic ISR** | `getStaticProps()` + `getStaticPaths()` + `revalidate` | Static + on-demand regeneration |


*/
