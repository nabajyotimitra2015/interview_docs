const users = [
  { id: 1, name: "Amit" },
  { id: 2, name: "Sumit" },
  { id: 1, name: "Amit" },
  { id: 3, name: "Rahul" },
  { id: 2, name: "Sumit" },
];

const uniqueUsers = users.filter(
  (user, index, array) =>
    index === array.findIndex((item) => item.id === user.id),
);
console.log(uniqueUsers);

// using Set
const uniqueUsersSet = [];
const seen = new Set();
for (const user of users) {
  if (!seen.has(user.id)) {
    seen.add(user.id);
    uniqueUsersSet.push(user);
  }
}
console.log(uniqueUsersSet);

// using reduce
const uniqueUsersReduce = users.reduce((acc, user) => {
  if (!acc.some((item) => item.id === user.id)) {
    acc.push(user);
  }
  return acc;
}, []);

console.log(uniqueUsersReduce);
