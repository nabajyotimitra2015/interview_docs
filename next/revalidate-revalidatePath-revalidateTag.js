/*
REVALIDATION STRATEGIES -

revalidate is time-based revalidation, revalidatePath invalidates a specific route, and revalidateTag invalidates cached data identified by a tag. I use revalidate for periodic freshness, revalidatePath when a particular page changes, and revalidateTag when the same data is shared across multiple pages.

1. revalidate - Used to define how often a page/data should be regenerated or refreshed. We generally use it for time-based cache revalidation in ISR.

export const revalidate = 60;

OR

const res = await fetch("/api/products", {
  next: {
    revalidate: 60,
  },
});

2. revalidatePath - Used when we want to manually invalidate the cache for a specific route/path.

import { revalidatePath } from "next/cache";

await updateProduct();

revalidatePath("/products");

OR

import { revalidatePath } from "next/cache";

// get productId from query or params
const productId = searchParams.get("id");

await updateProduct();

revalidatePath(`/products/${productId}`);

3. revalidateTag - Used when you want to invalidate cached data based on a specific tag. This is useful when the same data is shared across multiple pages, and you want to ensure that all pages using that data are updated when the data changes.

import { revalidateTag } from "next/cache";

await updateProduct();

revalidateTag("products");

OR

import { revalidateTag } from "next/cache";

// get productId from query or params
const productId = searchParams.get("id");

await updateProduct();

revalidateTag(`product-${productId}`);
*/
