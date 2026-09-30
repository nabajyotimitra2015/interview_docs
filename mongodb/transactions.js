/*
MongoDB transactions provide ACID guarantees across multiple operations and documents. I use them when a business operation requires multiple changes to succeed or fail together, such as transferring money or updating inventory and order state. However, I don't use transactions by default; I first consider whether the data can be modeled within a single document because MongoDB provides atomicity at the document level, which is generally simpler and more efficient.

When should you use transactions?
Use them when:
 - Multiple documents must be updated atomically.
 - Data consistency across collections is critical.
 - A business operation requires all-or-nothing behavior.
 - Examples: payments, money transfers, inventory + order creation, financial operations.

When should you avoid Transactions?
I avoid transactions when single-document atomicity is sufficient, when eventual consistency is acceptable, or when operations are independent and don't need all-or-nothing behavior. I also avoid long-running transactions because they can increase resource usage and contention. My preference is to first design the MongoDB schema so that related data that requires atomic updates can live in the same document, and use multi-document transactions only when the business requirement genuinely needs cross-document ACID consistency.
*/
