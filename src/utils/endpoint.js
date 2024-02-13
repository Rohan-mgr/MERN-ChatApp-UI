import { config } from "../../axios-config";

export const userEndpoints = {
  users: config.baseURL + "/api/user",
  signup: config.baseURL + "/api/user/signup",
  updateProfile: config.baseURL + "/api/user/updateProfile",
  login: config.baseURL + "/api/user/login",
  search: config.baseURL + "/api/user/search",
  chats: config.baseURL + "/api/chat",
};

export const chatEndpoints = {
  chats: config.baseURL + "/api/chat",
  sendMessage: config.baseURL + "/api/message",
  fetchMessages: config.baseURL + "/api/message",
  fetchAllMessages: config.baseURL + "/api/message/allMessages",
  createGroup: config.baseURL + "/api/chat/group-chat",
};
