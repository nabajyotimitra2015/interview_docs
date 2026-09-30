/*
Denormalization in MongoDB means intentionally duplicating data across documents to optimize read performance and reduce the need for joins or multiple queries. I use it when the duplicated data is frequently read together with the parent and doesn't change frequently. The trade-off is additional storage and the need to keep duplicated data consistent when the source data changes.

Advantages:
 - Faster reads
 - Fewer queries / $lookup operations
 - Data needed together can be retrieved together
 - Can simplify application logic

 1. Data is frequently read together
 2. Read-heavy applications
 3. Avoiding expensive $lookup
 4. Historical/snapshot data - This is a very common real-world use case. Suppose a product costs ₹1,000 today but ₹1,200 next month. An order should preserve the price at the time of purchase.
 5. Frequently accessed computed/aggregated data - Instead of calculating totals every time for each of the orders from the history of the orders. We can preserve the order amount for the each documents for the orders.

Disadvantages:
 - Data duplication
 - More storage
 - Updates become more complicated
 - Risk of inconsistent duplicated data
*/
