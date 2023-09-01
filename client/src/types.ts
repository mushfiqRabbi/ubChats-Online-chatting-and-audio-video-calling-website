export interface InboxWithOverViewType {
  inboxId: string;
  lastMessage: string;
  lastMessageDate: string;
  userEmail: string;
  userDisplayName: string;
}

export interface MessageType {
  data: string;
  message: string;
  sender: string;
  _id: string;
}
