import { QueryFunctionContext } from "react-query";
import axios from "axios";
import { MessageType } from "../types";

const baseUrl = "http://127.0.0.1:3000";

export const getInboxListWithOverView = async ({
  queryKey,
}: QueryFunctionContext) => {
  const response = await axios.get(
    `${baseUrl}/${queryKey[0]}/${queryKey[1]}/${queryKey[2]}`
  );
  return response.data;
};

export const getMessages = async ({ queryKey }: QueryFunctionContext) => {
  const response = await axios.get(
    `${baseUrl}/${queryKey[0]}/${queryKey[1]}/${queryKey[2]}`
  );

  return response.data;
};

export const sendMessage = async ({
  _id,
  sender,
  message,
  data,
}: MessageType) => {
  const response = await axios.post(`${baseUrl}/api/messages/message`, {
    _id,
    sender,
    message,
    data,
  });
  return response.data;
};
