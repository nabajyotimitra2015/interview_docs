/*
1. Rendering
   → memoization
   → avoid unnecessary renders

2. State
   → local vs global state
   → optimized selectors

3. Lists
   → virtualization

4. Bundle
   → lazy loading
   → code splitting
   → tree shaking

5. Network
   → caching
   → pagination
   → debounce
   → cancellation

6. Assets
   → WebP/AVIF
   → lazy loading
   → CDN

7. Measurement
   → React Profiler
   → Lighthouse
   → production metrics  
*/

/*
Scroll lag improvement techniques:
For a large dataset, I would first identify whether the bottleneck is DOM rendering, React re-renders, expensive row components, or data processing. If there are thousands of rows, I would use virtualization so that only the rows visible in the viewport are rendered. Libraries like react-window or TanStack Virtual can help with this. I would also memoize row components, avoid unnecessary state updates during scrolling, use stable keys, and move expensive calculations outside the render cycle. For very large datasets, I would combine virtualization with server-side pagination or infinite scrolling.
*/
