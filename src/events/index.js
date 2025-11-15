const { emailSubscriber } = require("./subscribers/email-subscriber");

async function initializeEventSubscribers() {
  await emailSubscriber();
}

module.exports = { initializeEventSubscribers };
