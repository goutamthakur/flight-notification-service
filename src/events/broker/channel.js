const { getRabbitMQConnection } = require("../broker/connection");

let channel = null;

// Function to use the connection to create or get a channel
async function getChannel() {
  try {
    if (!channel) {
      const connection = await getRabbitMQConnection();
      channel = await connection.createChannel();
      console.log("RabbitMQ connection established and channel created");
    }
    return channel;
  } catch (error) {
    console.log("Error creating RabbitMQ channel:", error);
    throw error;
  }
}

module.exports = {
  getChannel,
};
