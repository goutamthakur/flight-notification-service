const amqplib = require("amqplib");

const { MQ_URL } = require("./server-config");
const { EmailService } = require("../services");

const queue = "email.notification";

async function connectToRabbitMQ() {
  try {
    const connection = await amqplib.connect(MQ_URL);

    const channel = await connection.createChannel();

    channel.assertQueue(queue);

    channel.consume(queue, async(data) => {
      const parsedData = JSON.parse(Buffer.from(data.content).toString());
      const result = await EmailService.sendBookingConfirmationMail(parsedData);
      if (result) {
        channel.ack(data);
      }
    });
  } catch (error) {
    console.log(`Error connecting to RabbitMQ:`, error);
  }
}

module.exports = {
  connectToRabbitMQ,
};
