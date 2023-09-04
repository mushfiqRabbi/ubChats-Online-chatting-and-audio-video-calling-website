import { useRef, useLayoutEffect } from "react";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { getMessages } from "../../controllers/query_controllers/inboxController";
import { selectedInboxAtom } from "../../jotai_atoms";
import { InboxWithOverViewType, MessageType } from "../../types";
import { useAuthUser } from "@react-query-firebase/auth";
import auth from "../../firebase/firebaseConfig";

export function InboxMessages() {
  const { data: user } = useAuthUser(["user"], auth);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const [selectedInbox] = useAtom(selectedInboxAtom);
  const { data: messages } = useQuery({
    queryKey: [
      "api",
      "messages",
      selectedInbox?.inboxId && selectedInbox?.inboxId,
    ],
    queryFn: getMessages,
    enabled: !!selectedInbox.inboxId,
  });

  useLayoutEffect(() => {
    if (chatMessagesRef.current) {
      if (chatMessagesRef.current.scrollHeight) {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      }
    }
  });
  return (
    <div className="flex-grow-1 overflow-hidden">
      <div
        className="p-4 chat-messages"
        style={{
          height: "100%",
          overflowY: "auto",
        }}
        ref={chatMessagesRef}
      >
        <div>
          {messages &&
            messages.map((message: MessageType, index: number) => {
              return (
                <div
                  className={`pb-4 ${
                    message.sender === user?.email
                      ? "chat-message-right"
                      : "chat-message-left"
                  }`}
                  key={index}
                >
                  <div>
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      className="mr-1 rounded-circle"
                      alt="Chris Wood"
                      width={40}
                      height={40}
                    />
                    <div className="mt-2 text-muted small text-nowrap">
                      2:33 am
                    </div>
                  </div>
                  <div className="px-3 py-2 mr-3 rounded flex-shrink-1 bg-light">
                    <div className="mb-1 font-weight-bold">
                      {message.sender === user?.email
                        ? "You"
                        : selectedInbox?.userDisplayName}
                    </div>
                    {message.message}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
