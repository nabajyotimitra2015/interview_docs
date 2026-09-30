/*
I design MongoDB schemas based on how the application will access and modify the data rather than trying to normalize the data like a relational database. I first identify the entities, relationships, and most common query patterns. Then I decide whether related data should be embedded or referenced.

I embed data when it is tightly related, relatively small, and usually accessed together with the parent document. I use references when the related data is large, independently accessed or updated, shared across multiple documents, or has an unbounded growth pattern.

I also consider document size, indexing requirements, cardinality, read/write frequency, data growth, and transaction requirements. Finally, I validate the schema against real query patterns and use explain() to optimize important queries.
*/

/*
References/Relationship -
I choose references when embedding could cause unbounded document growth, when the child data has an independent lifecycle, is shared across multiple entities, or is frequently accessed and updated independently. I also consider the application's query patterns—if the related data is almost always read together and remains small, embedding may be better. So the decision is primarily driven by access patterns, cardinality, data growth, and update requirements rather than simply trying to normalize the database.
*/

/*
How do you decide between embedding and referencing?
I decide between embedding and referencing based primarily on how the application reads and writes the data, rather than applying relational-database normalization rules. I look at the relationship cardinality, data growth, update frequency, and whether the data is usually accessed together.

I prefer embedding when the related data is small, bounded, tightly coupled, and typically retrieved with the parent document. I prefer referencing when the related data is large or unbounded, independently updated or queried, shared by multiple documents, or has its own lifecycle.

I also consider consistency and duplication. Embedding can provide simpler atomic updates and faster reads, while referencing reduces duplication but may require additional queries or $lookup.
*/
