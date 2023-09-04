export interface InboxWithOverViewType {
  inboxId: string;
  lastMessage?: string;
  lastMessageDate?: string;
  userEmail: string;
  userDisplayName: string;
  status: boolean;
}

export interface MessageType {
  data: string;
  message: string;
  sender: string;
  _id: string;
}

export interface NonConnectedUserType {
  userEmail: string;
  userDisplayName: string;
}
