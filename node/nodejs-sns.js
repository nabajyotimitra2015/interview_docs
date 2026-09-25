// npm install @aws-sdk/client-sns

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
});

async function publishOrderCreated(order) {
  try {
    const command = new PublishCommand({
      TopicArn: process.env.SNS_TOPIC_ARN,

      Subject: "Order Created",

      Message: JSON.stringify({
        event: "ORDER_CREATED",
        timestamp: new Date().toISOString(),
        data: order,
      }),
    });

    const response = await snsClient.send(command);

    console.log("SNS Message ID:", response.MessageId);

    return response;
  } catch (error) {
    console.error("SNS publish failed:", error);
    throw error;
  }
}

// Example
publishOrderCreated({
  orderId: "ORD-123",
  userId: "USER-456",
  amount: 5000,
});
