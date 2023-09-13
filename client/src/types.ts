// export interface InboxWithOverViewType {
//   userEmail: string;
//   userDisplayName: string;
// }

export interface MessageType {
  data: string | number;
  message: string;
  sender: string;
  _id: string;
}

export interface NonConnectedInboxWithOverviewType {
  userEmail: string;
  userDisplayName: string;
}

export interface ConnectedInboxWithOverview
  extends NonConnectedInboxWithOverviewType {
  inboxId: string;
  lastMessage: string;
  lastMessageDate: string;
  status?: boolean;
}
