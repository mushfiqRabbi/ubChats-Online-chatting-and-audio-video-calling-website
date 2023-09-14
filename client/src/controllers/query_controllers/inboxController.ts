import { QueryFunctionContext } from "react-query";
import axios from "axios";
import { MessageType } from "../../types";

const baseUrl = import.meta.env.PROD ? "/" : "http://127.0.0.1:3000/";

export const getInboxListWithOverView = async ({
  queryKey,
}: QueryFunctionContext) => {
  const response = await axios.get(
    `${baseUrl}${queryKey[0]}/${queryKey[1]}/${queryKey[2]}`
  );
  return response.data;
};

export const getMessages = async ({ queryKey }: QueryFunctionContext) => {
  const response = await axios.get(
    `${baseUrl}${queryKey[0]}/${queryKey[1]}/${queryKey[2]}`
  );

  return response.data;
};

export const sendMessage = async ({
  _id,
  sender,
  message,
  data,
}: MessageType) => {
  const response = await axios.post(`${baseUrl}api/messages/message`, {
    _id,
    sender,
    message,
    data,
  });
  return response.data;
};

export const getNonConnectedUsers = async ({
  queryKey,
}: QueryFunctionContext) => {
  const response = await axios.get(
    `${baseUrl}${queryKey[0]}/${queryKey[1]}/${queryKey[2]}/${queryKey[3]}`
  );
  return response.data;
};

export const createInbox = async ({
  sender,
  receiver,
  receiverDisplayName,
}: {
  sender: string;
  receiver: string;
  receiverDisplayName: string;
}) => {
  const response = await axios.post(`${baseUrl}api/inboxes/inbox`, {
    sender,
    receiver,
    receiverDisplayName,
  });
  // console.log(response);
  return response.data;
};
