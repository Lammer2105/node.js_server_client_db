const net = require("net");
const client = net.createConnection({
  port: 20202,
});

client.on("data", (data) => {
  console.log(`Message recieved from the server ${data}`);
});
client.on("end", (callback) => {
  console.log("disconnected from server");
});
