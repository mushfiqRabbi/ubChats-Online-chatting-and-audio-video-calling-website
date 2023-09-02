import { useAtom } from "jotai";
import { messageAtom } from "../../jotai_atoms";
import React from "react";
import { useMutation } from "react-query";
import { sendMessage } from "../../query_controllers/inboxController";
import { selectedInboxAtom } from "../../jotai_atoms";
import { useAuthUser } from "@react-query-firebase/auth";
import auth from "../../firebase/firebaseConfig";
import { useQueryClient } from "react-query";

export function InboxFooter() {
  const { data: user } = useAuthUser(["user"], auth);
  const queryClient = useQueryClient();
  const [message, setMessage] = useAtom(messageAtom);
  const [selectedInbox] = useAtom(selectedInboxAtom);
  const messagesMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: (message) => {
      queryClient.setQueryData(
        ["api", "messages", selectedInbox?.inboxId],
        (messages: any) => {
          if (messages) {
            return [...messages, message];
          }
        }
      );
    },
  });

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (selectedInbox && user?.email && message !== "") {
      messagesMutation.mutate({
        _id: selectedInbox?.inboxId,
        sender: user?.email,
        message: message,
        data: Date.now().toString(),
      });

      setMessage("");
    }
  };
  return (
    <div className="flex-grow-0 px-4 py-3 border-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message"
          value={message}
          onChange={handleMessageChange}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
