/*
TypeScript interface vs type

Both interface and type can define the shape of objects, but they have some important differences.

1. Basic example

Interface:

interface User {
  id: number;
  name: string;
  email: string;
}

Type:

type User = {
  id: number;
  name: string;
  email: string;
};

For a simple object, both work almost the same way.
------------------------------------------------------------------
2. interface supports declaration merging

This is a major difference.

interface User {
  id: number;
}

interface User {
  name: string;
}

TypeScript combines them:

const user: User = {
  id: 1,
  name: "John",
};

With type, this doesn't work:

type User = {
  id: number;
};

// ❌ Duplicate identifier
type User = {
  name: string;
};
------------------------------------------------------------------
3. Extending interfaces
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}

Now:

const admin: Admin = {
  id: 1,
  name: "John",
  permissions: ["read", "write"],
};

With type, we normally use intersection:

type User = {
  id: number;
  name: string;
};

type Admin = User & {
  permissions: string[];
};
------------------------------------------------------------------
4. type supports union types

This is where type is more flexible.

type Status = "loading" | "success" | "error";

You can also do:

type ID = string | number;

An interface cannot directly represent this kind of union:

// ❌ Not valid
interface Status = "loading" | "success";
------------------------------------------------------------------
*/

/*
T[] represents an array of the generic type T. If T is string, then T[] becomes string[]; if T is User, it becomes User[]. It allows us to write reusable functions or components that work with different types while maintaining type safety.

*/
