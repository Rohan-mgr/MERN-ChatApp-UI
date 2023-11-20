export const SocketHandlers = (setData) => ({
  "save-messsage": function (data) {
    console.log(data, "datajfsjfsjd")
    setData("message", data);
  },
});

export class SocketEmitters {
  constructor(socket) {
    this.socket = socket;
  }
}
