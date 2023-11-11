export const SocketHandlers = (setData) => ({
  "save-messsage": function (data) {
    setData("message", data);
  },
});

export class SocketEmitters {
  constructor(socket) {
    this.socket = socket;
  }
}
