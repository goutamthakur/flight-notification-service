const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { initializeEventSubscribers } = require("./events");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use("/health", (req, res) => {
  res.send("OK");
});

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the flight-notification-service on PORT: ${ServerConfig.PORT}`);
  await initializeEventSubscribers();
});
