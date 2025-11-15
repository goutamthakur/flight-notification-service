const amqplib = require("amqplib");
const { MQ_URL } = require("../../config/server-config");

let connection = null;

// Function to get or create a RabbitMQ connection
async function getRabbitMQConnection() {
  try {
    if (!connection) {
      connection = await amqplib.connect(MQ_URL);
    }
    return connection;
  } catch (error) {
    console.log("Error connecting RabbitMQ:", error);
    throw error;
  }
}

module.exports = {
  getRabbitMQConnection,
};
