/*
Stale State Problem in React -
Stale state in React occurs when a callback, timer, event handler, or async function captures an older value of state due to JavaScript closures. I usually handle it by using functional state updates when the new state depends on the previous state, adding the correct dependencies to useEffect, or using useRef when a long-lived callback needs access to the latest value without recreating the callback.

A common example is when updating state multiple times:
*/
const [count, setCount] = useState(0);

const handleClick1 = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
/*
You might expect count to increase by 3, but it only increases by 1 because all three updates use the same captured count value.

✅ Solution: Functional State Update
*/
const handleClick2 = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
};
/*
Another common case: useEffect
*/
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // may print an old value
  }, 1000);

  return () => clearInterval(timer);
}, []);
/*
Because the dependency array is empty, the callback captures the initial count.

You can fix it with dependencies:
*/
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(timer);
}, [count]);
/*
Or, when you need the latest value inside a long-lived callback, a ref can be useful:
*/
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count;
}, [count]);

setInterval(() => {
  console.log(countRef.current);
}, 1000);
