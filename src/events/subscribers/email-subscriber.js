const { getChannel } = require("../broker/channel");
const { queue } = require("../constants/queue");
const { EmailService } = require("../../services");

async function emailSubscriber() {
  try {
    const channel = await getChannel();

    // Keep the queues durable to survive broker restarts
    await channel.assertQueue(queue.BOOKING_CREATED, { durable: true });
    await channel.assertQueue(queue.USER_REGISTER, { durable: true });
    
    channel.consume(queue.BOOKING_CREATED, async (data) => {
      const parsedData = JSON.parse(Buffer.from(data.content).toString());
      const result = await EmailService.sendBookingConfirmationMail(parsedData);
      if (result) {
        channel.ack(data);
      }
    });
  } catch (error) {
    console.log("Error in email subscriber:", error);
  }
}

module.exports = { emailSubscriber };
