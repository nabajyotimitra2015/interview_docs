/*
SSR:
SSR (Server-Side Rendering) is a rendering strategy where the React application is rendered on the server into HTML before it is sent to the browser. This improves initial load performance and SEO. The server fetches data, renders React components using ReactDOMServer.renderToString(), and sends the HTML to the client. The client JavaScript later hydrates that HTML into a live React app.

Advantages of SSR:
- Improved initial load performance
- Better SEO
- Can fetch data on the server and send a fully formed HTML page to the client

Disadvantages of SSR:
- Increased server load
- Slower interactivity compared to CSR
- More complex setup and deployment

CSR:
CSR (Client-Side Rendering) is a rendering strategy where the React application is rendered on the client-side in the browser. The initial HTML sent to the browser is usually an empty div and a JavaScript bundle. The browser executes the JavaScript, fetches data, and renders the React components. This approach can reduce server load and improve interactivity but may have slower initial load performance and SEO challenges.

Advantages of CSR:
- Reduced server load
- Improved interactivity and dynamic user experience
- Easier to set up and deploy

Disadvantages of CSR:
- Slower initial load performance
- SEO challenges due to the lack of pre-rendered HTML
- Requires more client-side JavaScript, which can increase bundle size and affect performance

SSG:
SSG (Static Site Generation) is a rendering strategy where pages are pre-rendered at build time into static HTML files. These files can be served by a CDN for better performance. SSG is useful for pages that do not change frequently and can be cached.

Advantages of SSG:
- Improved performance due to pre-rendered static files
- Better SEO as pages are served as static HTML
- Can be served by a CDN for faster delivery

Disadvantages of SSG:
- Not suitable for pages that change frequently
- Requires a build step to generate static files

ISR:
ISR (Incremental Static Regeneration) is a rendering strategy that allows pre-rendered pages to be updated periodically without rebuilding the entire site. It combines the benefits of SSG with the ability to update content as needed, making it suitable for pages that change frequently but still benefit from caching.

Advantages of ISR:
- Combines the benefits of SSG with the ability to update content
- Suitable for pages that change frequently
- Can be served by a CDN for better performance

Disadvantages of ISR:
- More complex setup compared to SSG
- Requires server-side logic to handle regeneration of pages

*/

/*
1. When we choose SSR over CSR?
 - SSR is preferred when we want to improve initial load performance and SEO. It is also useful when we want to fetch data on the server and send a fully formed HTML page to the client.

2. When we choose CSR over SSR?
 - CSR is preferred when we want to reduce server load, improve interactivity, and have a more dynamic user experience. It is also useful when we want to fetch data on the client and update the UI without a full page reload.

3. When we choose SSG over SSR?
 - SSG is preferred when we want to pre-render pages at build time and serve them as static files. It is useful for pages that do not change frequently and can be cached by CDNs for better performance.

4. When we choose ISR over SSG?
 - ISR is preferred when we want to pre-render pages at build time but also want to update them periodically without rebuilding the entire site. It is useful for pages that change frequently but still benefit from caching.

5. When we choose CSR over SSR?
 - CSR is preferred when we want to reduce server load, improve interactivity, and have a more dynamic user experience. It is also useful when we want to fetch data on the client and update the UI without a full page reload.
*/
