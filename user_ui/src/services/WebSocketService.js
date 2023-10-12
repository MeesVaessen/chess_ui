import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7019/game")
  .build();

connection.start().then(() => {
  console.log("SignalR connection established :)");
}).catch(err => {
  console.error(`SignalR connection error: ${err}`);
});

export default connection;