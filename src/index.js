const express = require("express");

const { ServerConfig, MQ } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use("/health", (req, res) => {
  res.send("OK");
});

app.listen(ServerConfig.PORT, () => {
  console.log(
    `Successfully started the flight-notification-service on PORT: ${ServerConfig.PORT}`
  );
  MQ.connectToRabbitMQ();
});
