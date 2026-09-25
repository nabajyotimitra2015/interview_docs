/*
A stale closure occurs when a callback captures an outdated state or prop value from a previous render. It's commonly seen with setTimeout, setInterval, event listeners, and useEffect. I handle it by using functional state updates when the next state depends on the previous state, correctly specifying effect dependencies, or using a ref when I need to access the latest value without recreating a subscription.
*/
