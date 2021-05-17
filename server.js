const net = require("net");
const server = net.createServer(function (connection) {
  console.log("Client connected");
  connection.on("end", function () {
    console.log("Client disconnected");
    return;
  });
  connection.write("Hello\r\n");
  connection.pipe(connection);
});
server.listen(20202, function () {
  console.log("Server is listening");
});
