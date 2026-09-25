/*
Intercepting Routes in Next.js allow a route to be rendered inside the current
layout while navigating from another route. They are commonly used for modal
experiences such as opening a photo, product, or login form without leaving the
current page.

The route conventions are:
- (.)  Match a route at the same level.
- (..) Match a route one level above.
- (..)(..) Match a route two levels above.
- (...) Match a route from the application root.

Example structure:
- app/
	- feed/
		- page.js
		- (.)photo/
			- [id]/
				- page.js
	- photo/
		- [id]/
			- page.js

When a user clicks a photo from /feed, the intercepted route renders the photo
inside a modal. When the user visits /photo/1 directly, the normal photo page
renders instead.

Why use Intercepting Routes?
1. Better User Experience: Users can view details in a modal without losing the
	context of the current page.
2. Shareable URLs: The modal content still has a real URL that users can copy,
	bookmark, or open directly.
3. Browser Navigation: The Back button can close the modal and return to the
	previous page naturally.
4. Reusable Pages: The same route can render as a modal during client
	navigation and as a full page during a direct visit or page refresh.
*/

// feed/page.js
import Link from "next/link";

export default function FeedPage() {
	return (
		<main>
			<h1>Photo feed</h1>
			<p>Choose a photo to view it without leaving the feed.</p>

			<ul>
				<li>
					<Link href="/photo/1">Open photo 1</Link>
				</li>
				<li>
					<Link href="/photo/2">Open photo 2</Link>
				</li>
			</ul>
		</main>
	);
}

// feed/(.)photo/[id]/page.js
import Link from "next/link";

export default async function PhotoModal({ params }) {
	const { id } = await params;

	return (
		<div role="dialog" aria-modal="true" className="photo-modal">
			<Link href="/feed" aria-label="Close photo">
				Close
			</Link>
			<h2>Photo {id}</h2>
			<p>This photo is rendered in an intercepted modal route.</p>
		</div>
	);
}

// photo/[id]/page.js
export default async function PhotoPage({ params }) {
	const { id } = await params;

	return (
		<main>
			<h1>Photo {id}</h1>
			<p>This is the full photo page rendered for a direct visit.</p>
		</main>
	);
}
