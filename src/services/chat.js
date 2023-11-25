import { httpAuth } from "../utils/http";
import { chatEndpoints } from "../utils/endpoint";

export const createGroupChat = async (roomName, users) => {
  console.log(roomName, users);
  const URL = chatEndpoints.createGroup;
  console.log(URL);
  const response = await httpAuth.post(
    URL,
    JSON.stringify({ roomName, users })
  );
  return response;
};
export const fetchMessages = async (chatId) => {
  const URL = chatEndpoints.fetchMessages + `/${chatId}`;
  const response = await httpAuth.get(URL);
  return response;
};
export const fetchAllMessages = async () => {
  const URL = chatEndpoints.fetchAllMessages;
  console.log(URL, "URL >>>>>>>>>>>>");
  const response = await httpAuth.get(URL);
  return response;
};
export const sendMessage = async (values) => {
  const URL = chatEndpoints.sendMessage;
  const response = await httpAuth.post(URL, values);
  return response;
};
export const fetchChats = async () => {
  const URL = chatEndpoints.chats;
  const response = await httpAuth.get(URL);
  return response;
};
export const startChat = async (userId) => {
  const URL = chatEndpoints.chats + `/${userId}`;
  const response = await httpAuth.post(URL);
  return response;
};
