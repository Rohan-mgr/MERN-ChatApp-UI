export const SocketHandlers = (setData) => ({
  "save-messsage": function (data) {
    setData("message", data);
  },
  "active:users": function (data) {
    console.log(data, "active users data");
    setData("activeUsers", data);
  },
});

export class SocketEmitters {
  constructor(socket) {
    this.socket = socket;
  }
}
