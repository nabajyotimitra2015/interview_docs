/*
CIRCUIT BREAKER:

A circuit breaker is a resilience pattern used in distributed systems to prevent repeated calls to a failing or unavailable service. It monitors failures and moves through three states: Closed, Open, and Half-Open. In the Closed state requests flow normally. When failures cross a configured threshold, the circuit opens and subsequent requests fail fast or use a fallback instead of calling the unhealthy service. After a timeout, it enters Half-Open and allows limited requests to test whether the service has recovered. If successful, it closes; otherwise, it opens again. This helps prevent cascading failures and protects system resources.

3 states of Circuit Breaker

1. CLOSED — Normal operation

Request → Circuit Breaker → Payment API → Success ✅
The breaker monitors failures.
For example: Failure threshold = 5 failures within 10 seconds
If failures exceed the threshold → OPEN.

2. OPEN — Stop calling the service

Once the failure threshold is reached:

Request
   ↓
Circuit Breaker
   ↓
OPEN
   ↓
Fail immediately

It doesn't call the Payment API.

3. HALF-OPEN — Test recovery

After a configured time, say 30 seconds, the breaker allows a small number of requests through.

OPEN
 ↓
30 seconds
 ↓
HALF-OPEN
 ↓
Test request

If successful:
Payment API ✅
      ↓
Circuit CLOSED

If it fails again:

Payment API ❌
      ↓
Circuit OPEN

Exponential Backoff

Exponential backoff is a retry strategy where, after each failed request, you wait for an increasingly longer period before retrying.

Exponential backoff is a retry mechanism where the delay between retries increases exponentially after each failure. For example, retries might happen after 1, 2, 4, and 8 seconds. It prevents overwhelming a temporarily unavailable downstream service. In production, I would typically combine exponential backoff with jitter, a maximum retry count, and request timeouts.

How do we manage an external api call inside a node js app?

I treat external APIs as unreliable dependencies. I use an HTTP client with a proper timeout, handle errors gracefully, and retry only transient failures using exponential backoff. For repeated failures, I use a circuit breaker to avoid continuously calling an unhealthy service. I also handle rate limiting, especially 429(TOO MANY RETRIES) responses. For non-critical or long-running operations, I prefer asynchronous processing using SQS/SNS rather than making the client wait. For critical operations like payments, I use idempotency keys to prevent duplicate processing during retries. Credentials are stored securely using services such as AWS Secrets Manager, and I monitor the integration using logs, metrics and tracing.
*/
